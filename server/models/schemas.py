from pydantic import BaseModel
from typing import Optional

class PurchaseCreate(BaseModel):
    user_id: str
    title: str
    amount: float
    category: str
    description: Optional[str] = ""

class VoteCreate(BaseModel):
    vote_type: str