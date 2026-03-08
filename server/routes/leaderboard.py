from fastapi import APIRouter
from services.db import purchases_collection

router = APIRouter()

@router.get("/leaderboard")
def get_leaderboard():
    purchases = list(purchases_collection.find())

    scores = {}

    for purchase in purchases:
        user_id = purchase.get("user_id", "unknown")
        smart_votes = purchase.get("smart_votes", 0)
        wasteful_votes = purchase.get("wasteful_votes", 0)

        score = smart_votes - wasteful_votes

        if user_id not in scores:
            scores[user_id] = 0

        scores[user_id] += score

    leaderboard = [{"name": user_id, "score": score} for user_id, score in scores.items()]
    leaderboard.sort(key=lambda x: x["score"], reverse=True)

    return leaderboard