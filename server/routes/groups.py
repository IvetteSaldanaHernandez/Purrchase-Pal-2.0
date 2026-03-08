from fastapi import APIRouter, HTTPException
from models.schemas import GroupCreate, JoinGroupRequest
from services.db import groups_collection, users_collection
import random
import string

router = APIRouter()

def generate_join_code(length=6):
    return "".join(random.choices(string.ascii_uppercase + string.digits, k=length))

def serialize_group(group):
    return {
        "_id": str(group.get("_id")),
        "name": group.get("name", ""),
        "owner_user_id": group.get("owner_user_id", ""),
        "join_code": group.get("join_code", ""),
    }

@router.post("/groups")
def create_group(group: GroupCreate):
    join_code = generate_join_code()

    group_data = {
        "name": group.name,
        "owner_user_id": group.owner_user_id,
        "join_code": join_code,
    }

    result = groups_collection.insert_one(group_data)
    group_id = str(result.inserted_id)

    users_collection.update_one(
        {"user_id": group.owner_user_id},
        {"$set": {"group_id": group_id}},
        upsert=True
    )

    group_data["_id"] = group_id
    return group_data

@router.post("/groups/join")
def join_group(payload: JoinGroupRequest):
    group = groups_collection.find_one({"join_code": payload.join_code})

    if not group:
        raise HTTPException(status_code=404, detail="Group not found")

    group_id = str(group["_id"])

    users_collection.update_one(
        {"user_id": payload.user_id},
        {"$set": {"group_id": group_id}},
        upsert=True
    )

    return {
        "message": "Joined group successfully",
        "group_id": group_id,
        "group_name": group.get("name", "")
    }