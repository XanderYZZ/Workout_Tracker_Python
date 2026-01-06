from fastapi import HTTPException, status, APIRouter
import database
import models
import auth_helper

router = APIRouter(tags=["auth"])

@router.post("/signup", status_code=status.HTTP_201_CREATED)
async def SignUp(user : models.UserCreate):
    if database.DoesUserExist(user.email):
        raise HTTPException(status_code=400, detail="That email is already being used.")
    
    hashed_password = auth_helper.GetPasswordHash(user.password)
    user_id = database.CreateUser(user.email, hashed_password)

    return {"token": auth_helper.CreateJWTToken(user_id, user.email)}

@router.post("/login", status_code=status.HTTP_200_OK)
async def Login(user : models.UserCreate):
    if not database.DoesUserExist(user.email):
        raise HTTPException(status_code=400, detail="That email is not being used in any account.")
    
    hashed_password = database.GetUserHashedPasswordInDB(user.email)

    if not auth_helper.VerifyPassword(user.password, hashed_password):
        raise HTTPException(status_code=401, detail="You sent incorrect authentication details.")
    
    user_id = database.GetUserIdByEmail(user.email)  
    
    return {"token": auth_helper.CreateJWTToken(user_id, user.email)}
