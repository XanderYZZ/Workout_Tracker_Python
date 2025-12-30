from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    email: EmailStr
    password: str

class CurrentUser(BaseModel):
    user_id: str
    email: str

class Workout(BaseModel):
    