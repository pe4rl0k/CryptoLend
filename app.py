from flask import Flask
import os
from dotenv import load_dotenv
import loans_module as loans_service

load_dotenv()

app = Flask(__name__)

@app.route('/status', methods=['GET'])
def check_server_status():
    return {"status": "Server is running!"}

@app.route('/loans', methods=['GET'])
def fetch_all_loans():
    return loans_service.get_loans_list()

if __name__ == '__main__':
    server_port = int(os.getenv("PORT", 5000))
    app.run(host='0.0.0.0', port=server_opt)