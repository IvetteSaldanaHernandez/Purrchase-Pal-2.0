from fastapi import APIRouter, HTTPException, Query
from models.schemas import PurchaseCreate
from services.db import purchases_collection
from services.gemini import generate_ai_feedback

router = APIRouter()

def serialize_purchase(purchase):
    return {
        "_id": str(purchase.get("_id")),
        "user_id": purchase.get("user_id", ""),
        "group_id": purchase.get("group_id", ""),
        "title": purchase.get("title", ""),
        "amount": purchase.get("amount", 0),
        "category": purchase.get("category", ""),
        "description": purchase.get("description", ""),
        "ai_feedback": purchase.get("ai_feedback", ""),
        "smart_votes": purchase.get("smart_votes", 0),
        "wasteful_votes": purchase.get("wasteful_votes", 0),
    }

@router.get("/purchases")
def get_purchases(group_id: str = Query(...)):
    purchases = list(
        purchases_collection.find({"group_id": group_id}).sort("_id", -1)
    )
    return [serialize_purchase(p) for p in purchases]

@router.post("/purchases")
def create_purchase(purchase: PurchaseCreate):
    ai_feedback = generate_ai_feedback(
        purchase.title,
        purchase.amount,
        purchase.category,
        purchase.description
    )

    purchase_data = purchase.dict()
    purchase_data["ai_feedback"] = ai_feedback
    purchase_data["smart_votes"] = 0
    purchase_data["wasteful_votes"] = 0

    result = purchases_collection.insert_one(purchase_data)
    purchase_data["_id"] = str(result.inserted_id)

    return purchase_data