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


@app.route("/api/sharks/journey/<int:shark_id>")
def get_shark_journey(shark_id: int):
    journey = API.sharks.get_travel_log(shark_id)

    locations = []

    for loc in journey.locations:
        locations.append(loc.__dict__)

    return locations
