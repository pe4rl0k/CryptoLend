import os
from dotenv import load_dotenv
import pymongo

# Load environment variables
load_dotenv()

# Retrieve the MongoDB connection string from environment and establish a connection
DATABASE_CONNECTION_STRING = os.getenv("MONGO_CONNECTION_STRING")
mongo_client = pymongo.MongoClient(DATABASE_CONNECTION_STRING)

# Set up the database and collection references
cryptoLendDatabase = mongo_client.cryptoLend
loansCollection = cryptoLendDatabase.loans

def addLoan(loanDetails):
    """Add a new loan record to the database."""
    insertionResult = loansCollection.insert_one(loanDetails)
    return str(insertionResult.inserted_id)

def getLoanDetails(loanId):
    """Retrieve a specific loan record by its ID."""
    return loansCollection.find_one({"_id": pymongo.ObjectId(loanId)})

def modifyLoanDetails(loanId, updatedDetails):
    """Update details of a specific loan record."""
    updateOutcome = loansCollection.update_one(
        {"_id": pymongo.ObjectId(loanId)},
        {"$set": updatedDetails}
    )
    return updateOutcome.matched_count

def removeLoan(loanId):
    """Delete a loan record from the database."""
    deletionOutcome = loansCollection.delete_one({"_id": pymongo.ObjectId(loanId)})
    return deletionOutcome.deleted_count

def getAllLoans():
    """Get a list of all loan records in the database."""
    return list(loansCollection.find({}))