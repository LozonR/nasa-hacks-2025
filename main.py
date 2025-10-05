from flask import Flask, send_file
import requests
import random
from common import Shark, SHARK_CATEGORIES, TravelSpot
from Backend import sharkPredict

app = Flask(__name__)

# API = "https://www.mapotic.com/api/v1/maps/3413/pois.geojson/"
API = "https://www.mapotic.com/api/v1/maps/3413"


@app.route("/")
def index():
    return send_file("static/index.html")


@app.route("/api/sharks")
def get_sharks():
    sharksRaw = requests.get(f"{API}/pois.geojson/")
    sharksRawJSON = sharksRaw.json()

    sharks = []

    for shark in sharksRawJSON["features"]:
        properties = shark["properties"]
        location = shark["geometry"]["coordinates"]

        if properties["species"] in SHARK_CATEGORIES:
            shark = Shark(
                properties["name"],
                properties["id"],
                properties["species"],
                (location[0], location[1])
            )
            # sharkPredict.updateShark(shark)
            sharks.append(shark)

    sharksJSON = []

    for shark in sharks:
        sharksJSON.append(shark.__dict__)

    return sharksJSON


@app.route("/api/sharks/random")
def get_random_shark():
    sharksRaw = requests.get(f"{API}/pois.geojson/")
    sharksRawJSON = sharksRaw.json()

    sharks = []

    for shark in sharksRawJSON["features"]:
        properties = shark["properties"]
        location = shark["geometry"]["coordinates"]

        if properties["species"] in SHARK_CATEGORIES:
            sharks.append(
                Shark(
                    properties["name"],
                    properties["id"],
                    properties["species"],
                    (location[0], location[1])
                ))

    sharksJSON = []

    for shark in sharks:
        sharksJSON.append(shark.__dict__)

    return random.choice(sharksJSON)


@app.route("/api/sharks/journey/<int:shark_id>")
def get_shark_journey(shark_id: int):
    travel = requests.get(f"{API}/pois/{shark_id}/motion/with-meta/").json()

    locations = []
    for spot in travel["motion"]:
        coordinates = spot["point"]["coordinates"]
        time = spot["dt_move"]
        locations.append(TravelSpot(coordinates[0], coordinates[1], time))

    return locations


@app.route("/api/sharks/previous/<int:shark_id>")
def get_previous_location(shark_id: int):
    travel = requests.get(f"{API}/pois/{shark_id}/motion/with-meta/").json()

    if len(travel["motion"]) < 2:
        return {"error": "Not enough data"}

    previous_spot = travel["motion"][-2]
    coordinates = previous_spot["point"]["coordinates"]
    time = previous_spot["dt_move"]
    prev_location = TravelSpot(coordinates[0], coordinates[1], time)

    return prev_location.__dict__
