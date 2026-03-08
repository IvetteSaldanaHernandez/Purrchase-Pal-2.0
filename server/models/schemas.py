from pydantic import BaseModel
from typing import Optional

class PurchaseCreate(BaseModel):
    user_id: str
    group_id: str
    title: str
    amount: float
    category: str
    description: Optional[str] = ""

class VoteCreate(BaseModel):
    vote_type: str

class GroupCreate(BaseModel):
    name: str
    owner_user_id: str

class JoinGroupRequest(BaseModel):
    user_id: str
    join_code: str

class UserUpsert(BaseModel):
    user_id: str
    email: str
    full_name: Optional[str] = ""
    username: Optional[str] = ""
    avatar_url: Optional[str] = ""
    group_id: Optional[str] = None