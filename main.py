from flask import Flask, send_file
import API.sharks

app = Flask(__name__)


@app.route("/")
def index():
    return send_file("static/index.html")


@app.route("/api/sharks")
def get_sharks():
    sharks = API.sharks.get_sharks()
    sharksJSON = []

    for shark in sharks:
        sharksJSON.append(shark.__dict__)

    return sharksJSON
