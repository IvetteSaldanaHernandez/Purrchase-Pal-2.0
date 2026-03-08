from fastapi import APIRouter, HTTPException
from bson import ObjectId
from models.schemas import VoteCreate
from services.db import purchases_collection

router = APIRouter()

@router.post("/votes/{purchase_id}")
def vote_on_purchase(purchase_id: str, vote: VoteCreate):
    purchase = purchases_collection.find_one({"_id": ObjectId(purchase_id)})

    if not purchase:
        raise HTTPException(status_code=404, detail="Purchase not found")

    if vote.vote_type == "smart":
        purchases_collection.update_one(
            {"_id": ObjectId(purchase_id)},
            {"$inc": {"smart_votes": 1}}
        )
    elif vote.vote_type == "wasteful":
        purchases_collection.update_one(
            {"_id": ObjectId(purchase_id)},
            {"$inc": {"wasteful_votes": 1}}
        )
    else:
        raise HTTPException(status_code=400, detail="Invalid vote type")

    return {"message": "Vote recorded"}