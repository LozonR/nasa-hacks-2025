from flask import Flask, send_file
import requests
import random
import time

app = Flask(__name__)

# API = "https://www.mapotic.com/api/v1/maps/3413/pois.geojson/"
API = "https://www.mapotic.com/api/v1/maps/3413"

SHARK_CATEGORIES = {
    "White Shark (Carcharodon carcharias)": 1,
    "Tiger Shark (Galeocerdo cuvier)": 0,
    "Blacktip Shark (Carcharhinus limbatus)": 0,
    "Shortfin Mako Shark (Isurus oxyrinchus)": 1,
    "Blue Shark (Prionace glauca)": 1,
    "Hammerhead Shark (Sphyrnidae)": 0,
    "Silky Shark (Carcharhinus falciformis)": 0,
    "Bull Shark (Carcharhinus leucas)": 0,
    "Scalloped Hammerhead (Sphyrna lewini)": 0,
    "Whale Shark (Rhincodon typus)": 0,
    "Great Hammerhead (Sphyrna mokarran)": 0,
    "Dusky Shark (Carcharhinus obscurus)": 0
}


class Shark:
    def __init__(
            self,
            name: str,
            id: int,
            species: str,
            location: tuple[float, float],
            prev_location: tuple[float, float] = (0.0, 0.0),
            predicted_location: tuple[float, float] = (0.0, 0.0),
            mode: str = "",
            prev_mode: str = "",
            prev_mode_time: int = 0,
            depth: float =0.0,
            prev_depth: float =0.0,
            px_x: int = 0,
            px_y: int = 0,
            facing: tuple[int, int] = (0, 0),
            
    ):
        self.name = name
        self.id = id
        self.species = species
        self.location = location
        self.predicted_location = predicted_location
        self.mode = mode
        self.prev_mode = prev_mode
        self.prev_mode_time = time.time()
        self.depth = depth
        self.prev_depth = depth


class TravelSpot:
    def __init__(self, lat: float, long: float, date: str):
        self.lat = lat
        self.long = long
        self.date = date


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
