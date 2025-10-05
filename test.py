from backend import sharkPredict
import requests
from main import API
from common import Shark, SHARK_CATEGORIES


def main():
    sharksRaw = requests.get(f"{API}/pois.geojson/")
    sharksRawJSON = sharksRaw.json()

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
            sharkPredict.updateShark(shark)
            print(shark.__dict__)


if __name__ == "__main__":
    main()
