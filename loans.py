import os
from dotenv import load_dotenv
import pymongo

load_dotenv()

MONGO_CONNECTION_STRING = os.getenv("MONGO_CONNECTION_STRING")

mongo_client = pymongo.MongoClient(MONGO_CONNECTION_STRING)

crypto_lend_db = mongo_client.cryptoLend

loans_collection = crypto_lend_db.loans

def create_loan_record(loan_record):
    insertion_result = loans_collection.insert_one(loan_record)
    return str(insertion_result.inserted_id)

def retrieve_loan_record(loan_record_id):
    return loans_collection.find_one({"_id": pymongo.ObjectId(loan_record_id)})

def update_loan_record(loan_record_id, update_details):
    update_result = loans_collection.update_one(
        {"_id": pymongo.ObjectId(loan_record_id)},
        {"$set": update_details}
    )
    return update_result.matched_count

def delete_loan_record(loan_record_id):
    deletion_result = loans_collection.delete_one({"_id": pymongo.ObjectId(loan_record_id)})
    return deletion_result.deleted_count

def list_all_loans():
    return list(loans_collection.find({}))