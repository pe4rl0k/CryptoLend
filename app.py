from flask import Flask
import os
from dotenv import load_dotenv
import loans

load_dotenv()

app = Flask(__name__)

@app.route('/status', methods=['GET'])
def check_status():
    return {"status": "Server is running!"}

@app.route('/loans', methods=['GET'])
def get_loans():
    return loans.get_loans()

if __name__ == '__main__':
    port = int(os.getenv("PORT", 5000))
    app.run(host='0.0.0.0', port=port)