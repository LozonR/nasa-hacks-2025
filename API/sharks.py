import requests

API = "https://www.mapotic.com/api/v1/maps/3413/pois.geojson/"

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
            gender: str,
            species: str,
            location: (float, float)
    ):
        self.name = name
        self.gender = gender
        self.species = species
        self.location = location


def get_sharks() -> list[Shark]:
    sharksRaw = requests.get(API)
    sharksJson = sharksRaw.json()

    sharks = []

    for shark in sharksJson["features"]:
        properties = shark["properties"]
        location = shark["geometry"]["coordinates"]

        if properties["species"] in SHARK_CATEGORIES:
            sharks.append(
                Shark(
                    properties["name"],
                    properties["gender"],
                    properties["species"],
                    (location[0], location[1])
                ))

    return sharks


def main():
    sharks = get_sharks()

    species = {}

    for shark in sharks:
        if shark.species in species:
            species[shark.species] += 1
        else:
            species[shark.species] = 1

    for specie in species.keys():
        print(specie)


if __name__ == "__main__":
    main()
