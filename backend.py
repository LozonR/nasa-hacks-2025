import time
import numpy
from random import randint

sharks = []
isDay = True
currentShark = 0

class Shark:
    def __init__(self, type, mode, prev_mode, modeSwitch, latitude, longitude, direction, depth, vert_vel, name, predicted_lat, predicted_long, prev_depth=None, px_x=0, px_y=0):
        self.latitude = latitude
        self.longitude = longitude
        self.type = type
        self.mode = mode
        self.prev_mode = None
        self.direction = direction
        self.modeSwitch = time.time()
        self.px_x = coordsToPx(latitude, longitude)[1]
        self.px_y = coordsToPx(latitude, longitude)[0]
        self.name = name
        self.depth = randint(1, currentDepthOcean(latitude, longitude) - 1)

        sharks.append(self)

    def whereGoing(self):
        ""

def coordsToPx(latitude, longitude):
    px_x = 24*longitude
    px_y = 24*latitude
    return (px_x, px_y)

def pxToCoords(px_x, px_y):
    latitude = px_y/24
    longitude = px_x/24
    return (latitude, longitude)

def currentDepthOcean(latitude, longitude):
    return None

while True:
    shark = sharks[currentShark]

    vv = (shark.depth - shark.prev_depth)/60


    if mode == "sleeping":
        if isDay:
            shark.mode = shark.prev_mode
        else:
            shark.predicted_lat = shark.latitude
            shark.predicted_long = shark.longitude
            time.sleep(60)
            continue

    if shark.type == "great white":
        if shark.mode == "scavenging":
            if isDay:
                # scavenge
                pass
            else:
                shark.predicted_lat = shark.latitude
                shark.predicted_long = shark.longitude
                shark.prev_mode = shark.mode
                shark.mode = "sleeping"
        elif shark.mode == "transiting":
            
            pass
