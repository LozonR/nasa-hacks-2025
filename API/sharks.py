import requests


def main():
    sharksRaw = requests.get("https://www.mapotic.com/api/v1/maps/3413/pois.geojson/")
    sharks = sharksRaw.json()

    if sharks["type"] != "FeatureCollection":
        print("what the fuck just happened?")
        return

    for shark in sharks["features"]:
        properties = shark["properties"]
        location = shark["geometry"]["coordinates"]
        print(f"Found shark called {properties["name"]} at {location}")


if __name__ == "__main__":
    main()
