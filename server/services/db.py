from pymongo import MongoClient
from config import MONGO_URI, DB_NAME
import certifi

client = MongoClient(MONGO_URI, tlsCAFile=certifi.where())
db = client[DB_NAME]

purchases_collection = db["purchases"]
users_collection = db["users"]
groups_collection = db["groups"]