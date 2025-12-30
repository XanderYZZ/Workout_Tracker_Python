from pymongo import MongoClient
import config

MONGO_URI = config.MONGO_URI
client = MongoClient(MONGO_URI)

def GetDb():
    return client["database"]

def AddExercise(exercise):
    GetDb()["exercises"].update_one({"name": exercise["name"],}, {"$set": exercise}, upsert=True)

def DoesUserExist(email: str) -> bool:
    users = GetDb()["users"]

    return users.find_one({"email": email}) is not None

def CreateUser(email: str, hashed_password: str) -> str:
    if DoesUserExist(email):
        raise ValueError("User already exists") 

    users = GetDb()["users"]
    result = users.insert_one({
        "email": email,
        "password": hashed_password
    })
    
    return str(result.inserted_id)  

def GetUserIdByEmail(email: str) -> str | None:
    users = GetDb()["users"]
    user = users.find_one({"email": email}, {"_id": 1})

    if user:
        return str(user["_id"])
    
    return None

def GetUserHashedPasswordInDB(email: str) -> str:
    user = GetDb()["users"].find_one({"email": email}, {"password": 1})

    if not user:
        raise ValueError("User not found")  
    
    return user["password"]