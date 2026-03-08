from fastapi import APIRouter
from models.schemas import UserUpsert
from services.db import users_collection

router = APIRouter()

def serialize_user(user):
    return {
        "_id": str(user.get("_id")),
        "user_id": user.get("user_id", ""),
        "email": user.get("email", ""),
        "full_name": user.get("full_name", ""),
        "username": user.get("username", ""),
        "avatar_url": user.get("avatar_url", ""),
        "group_id": user.get("group_id"),
    }

@router.post("/users/upsert")
def upsert_user(user: UserUpsert):
    users_collection.update_one(
        {"user_id": user.user_id},
        {
            "$set": {
                "email": user.email,
                "full_name": user.full_name,
                "username": user.username,
                "avatar_url": user.avatar_url,
            }
        },
        upsert=True
    )

    saved_user = users_collection.find_one({"user_id": user.user_id})
    return serialize_user(saved_user)

@router.get("/users/{user_id}")
def get_user(user_id: str):
    user = users_collection.find_one({"user_id": user_id})

    if not user:
        return {
            "user_id": user_id,
            "email": "",
            "full_name": "",
            "username": "",
            "avatar_url": "",
            "group_id": None,
        }

    return serialize_user(user)