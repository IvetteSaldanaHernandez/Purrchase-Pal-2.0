from fastapi import APIRouter
from models.schemas import PurchaseCreate
from services.db import purchases_collection
from services.gemini import generate_ai_feedback

router = APIRouter()

def serialize_purchase(purchase):
    purchase["_id"] = str(purchase["_id"])
    return purchase

@router.get("/purchases")
def get_purchases():
    purchases = list(purchases_collection.find().sort("_id", -1))
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