from fastapi import HTTPException, status, Header
from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError
import database
import models
import jwt 
import datetime
import config

SECRET_KEY = config.SECRET_KEY
ph = PasswordHasher()
ALGORITHM = "HS256"

def GetPasswordHash(password : str) -> str:
    return ph.hash(password)

def VerifyPassword(plain_password: str, hashed_password: str) -> bool:
    try:
        ph.verify(hashed_password, plain_password)
        return True
    except VerifyMismatchError:
        return False
    
def CreateJWTToken(user_id: str, email: str) -> str:
    payload = {
        "sub": user_id,       
        "email": email,       
        "iat": datetime.datetime.now(datetime.timezone.utc),
        "exp": datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=1)
    }

    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

async def GetCurrentUser(authorization : str = Header(...)) -> models.CurrentUser:
    """
    Dependency that extracts and validates the JWT from the Authorization header
    Expected format: "Bearer <token>"
    """
    if not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication scheme"
        )
    
    token = authorization[len("Bearer "):].strip()
    
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        email: str = payload.get("email")
        if user_id is None or email is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token payload"
            )
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has expired"
        )
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )
    
    if not database.DoesUserExist(email):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User no longer exists"
        )
    
    return models.CurrentUser(user_id=user_id, email=email)
