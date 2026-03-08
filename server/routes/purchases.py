from fastapi import APIRouter, HTTPException
from models.schemas import PurchaseCreate
from services.db import purchases_collection
from services.gemini import generate_ai_feedback

router = APIRouter()

def serialize_purchase(purchase):
    purchase["_id"] = str(purchase["_id"])
    return purchase

@router.get("/purchases")
def get_purchases():
    try:
        purchases = list(purchases_collection.find().sort("_id", -1))
        print("PURCHASES FROM DB:", purchases)
        return [serialize_purchase(p) for p in purchases]
    except Exception as e:
        print("ERROR IN GET /purchases:", repr(e))
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/purchases")
def create_purchase(purchase: PurchaseCreate):
    try:
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
    except Exception as e:
        print("ERROR IN POST /purchases:", repr(e))
        raise HTTPException(status_code=500, detail=str(e))