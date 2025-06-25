from flask import Flask, request
import requests
from dotenv import load_dotenv
import os
from flask_cors import CORS

load_dotenv(dotenv_path="./.env.local")
UNSPLASH_URL = 'https://api.unsplash.com/photos/random/'
UNSPLASH_KEY = os.environ.get("UNSPLASH_API_KEY", "")
DEBUG = bool(os.environ.get("DEBUG", True))

if not UNSPLASH_KEY:
    raise EnvironmentError("Please create .env.local file and ensure you have an UNSPLASH_API_KEY")

app = Flask(__name__)
CORS(app)
app.config["DEBUG"] = DEBUG

@app.route("/new-image")
def new_image():
    # Retrieve query parameters from client request
    word = request.args.get("query")

    headers = {
        "Authorization": "Client-ID " + UNSPLASH_KEY,
        "Accept-Version": "v1"
    }

    params = {
        "query": word
    }

    response = requests.get(url=UNSPLASH_URL, headers=headers, params=params)

    data = response.json()

    return data

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5050)
