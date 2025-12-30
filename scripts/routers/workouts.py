from fastapi import HTTPException, status, APIRouter
import database
import models
import auth_helper

router = APIRouter(tags=["auth"])

@router.post("/workouts", status_code=status.HTTP_201_CREATED)
async def CreateWorkout():
    