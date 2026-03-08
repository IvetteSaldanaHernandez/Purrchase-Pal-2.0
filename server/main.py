from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.purchases import router as purchases_router
from routes.users import router as users_router
from routes.votes import router as votes_router
from routes.leaderboard import router as leaderboard_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(purchases_router)
app.include_router(users_router)
app.include_router(votes_router)
app.include_router(leaderboard_router)

@app.get("/")
def root():
    return {"message": "Backend is running"}