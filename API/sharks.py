import requests

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
            location: (float, float)
    ):
        self.name = name
        self.id = id
        self.species = species
        self.location = location


class TravelSpot:
    def __init__(self, lat: float, long: float, date: str):
        self.lat = lat
        self.long = long
        self.date = date


class TravelLog:
    def __init__(
        self,
        locations: list[TravelSpot]
    ):
        self.locations = locations


def get_sharks() -> list[Shark]:
    sharksRaw = requests.get(f"{API}/pois.geojson/")
    sharksJson = sharksRaw.json()

    sharks = []

    for shark in sharksJson["features"]:
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

    return sharks


def get_travel_log(shark: Shark):
    travel = requests.get(f"{API}/pois/{shark.id}/motion/with-meta/").json()

    spots = []
    for spot in travel["motion"]:
        coordinates = spot["point"]["coordinates"]
        time = spot["dt_move"]
        spots.append(TravelSpot(coordinates[0], coordinates[1], time))

    log = TravelLog(spots)
    return log


def main():
    sharks = get_sharks()
    log = get_travel_log(sharks[1])
    print("no")
    print(log.locations)


if __name__ == "__main__":
    main()
