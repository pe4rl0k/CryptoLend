import os
from dotenv import load_dotenv
import pymongo

load_dotenv()

CONNECTION_STRING = os.getenv("MONGO_CONNECTION_STRING")

client = pymongo.MongoClient(CONNECTION_STRING)

db = client.cryptoLend

loans_collection = db.loans

def create_loan(loan_details):
    result = loans_collection.insert_one(loan_details)
    return str(result.inserted_id)

def get_loan(loan_id):
    return loans_collection.find_one({"_id": pymongo.ObjectId(loan_id)})

def update_loan(loan_id, update_details):
    result = loans_collection.update_one({"_id": pymongo.ObjectId(loan_id)}, {"$set": update_details})
    return result.matched_count

def delete_loan(loan_id):
    result = loans_collection.delete_one({"_id": pymongo.ObjectId(loan_id)})
    return result.deleted_count

def list_loans():
    return list(loans_collection.find({}))