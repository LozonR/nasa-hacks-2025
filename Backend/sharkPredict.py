from main import Shark, SHARK_CATEGORIES, get_sharks

import time
import numpy
from PIL import Image
from random import randint

isDay = True
currentShark = 0

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

def updateShark(uid: int):
    shark = None

    for s in get_sharks():
        if s['id'] == uid:
            shark = s
            break

    vv = (shark.depth - shark.prev_depth)/60

    speed = vv / numpy.sin(shark.pitch)

    shark.facing = [shark.px_x - coordsToPx(shark.prev_location[0], shark.prev_location[1])[0], shark.px_y - coordsToPx(shark.prev_location[0], shark.prev_location[1])[1]]
    shark.facing = shark.facing / numpy.linalg.norm(shark.facing)


    if shark.mode == "sleeping":
        if isDay:
            shark.mode = shark.prev_mode
        else:
            shark.predicted_location[0] = shark.location[0]
            shark.predicted_location[1] = shark.location[1]

    if shark.mode == "scavenging":
        if SHARK_CATEGORIES[shark.species] == 1:
            if isDay:
                scavenging(shark)
                pass
            else:
                shark.predicted_location[0] = shark.location[0]
                shark.predicted_location[1] = shark.location[1]
                shark.prev_mode = shark.mode
                shark.mode = "sleeping"
        elif SHARK_CATEGORIES[shark.species] == 0:
            if not isDay:
                scavenging(shark)
                pass
            else:
                shark.predicted_location[0] = shark.location[0]
                shark.predicted_location[1] = shark.location[1]
                shark.prev_mode = shark.mode
                shark.mode = "sleeping"
    elif shark.mode == "transiting":
        if SHARK_CATEGORIES[shark.species] == 1:
            if isDay:
                transiting(shark)
                pass
            else:
                shark.predicted_location[0] = shark.location[0]
                shark.predicted_location[1] = shark.location[1]
                shark.prev_mode = shark.mode
                shark.mode = "sleeping"
        elif SHARK_CATEGORIES[shark.species] == 0:
            if not isDay:
                transiting(shark)
                pass
            else:
                shark.predicted_location[0] = shark.location[0]
                shark.predicted_location[1] = shark.location[1]
                shark.prev_mode = shark.mode
                shark.mode = "sleeping"
    else:
        pass


def scavenging(shark: Shark):
    if comparePixel(shark.px_x + shark.facing[0], shark.px_y + shark.facing[1]) != -999:
        shark.predicted_location[1] = pxToCoords(shark.px_x + shark.facing[0], shark.px_y + shark.facing[1])[1]
        shark.predicted_location[0] = pxToCoords(shark.px_x + shark.facing[0], shark.px_y + shark.facing[1])[0]
    else:
        scan = scanSquare(shark.px_x, shark.px_y)
        maxIndex = scan.index(max(scan))
        if maxIndex == 0:
            shark.predicted_location[1] = (1/shark.speed)*pxToCoords(shark.px_x - 1, shark.px_y - 1)[1]
            shark.predicted_location[0] = (1/shark.speed)*pxToCoords(shark.px_x - 1, shark.px_y - 1)[0]
        elif maxIndex == 1:
            shark.predicted_location[1] = (1/shark.speed)*pxToCoords(shark.px_x, shark.px_y - 1)[1]
            shark.predicted_location[0] = (1/shark.speed)*pxToCoords(shark.px_x, shark.px_y - 1)[0]
        elif maxIndex == 2:
            shark.predicted_location[1] = (1/shark.speed)*pxToCoords(shark.px_x + 1, shark.px_y - 1)[1]
            shark.predicted_location[0] = (1/shark.speed)*pxToCoords(shark.px_x + 1, shark.px_y - 1)[0]
        elif maxIndex == 3:
            shark.predicted_location[1] = (1/shark.speed)*pxToCoords(shark.px_x - 1, shark.px_y)[1]
            shark.predicted_location[0] = (1/shark.speed)*pxToCoords(shark.px_x - 1, shark.px_y)[0]
        elif maxIndex == 4:
            shark.predicted_location[1] = (1/shark.speed)*pxToCoords(shark.px_x + 1, shark.px_y)[1]
            shark.predicted_location[0] = (1/shark.speed)*pxToCoords(shark.px_x + 1, shark.px_y)[0]
        elif maxIndex == 5:
            shark.predicted_location[1] = (1/shark.speed)*pxToCoords(shark.px_x - 1, shark.px_y + 1)[1]
            shark.predicted_location[0] = (1/shark.speed)*pxToCoords(shark.px_x - 1, shark.px_y + 1)[0]
        elif maxIndex == 6:
            shark.predicted_location[1] = (1/shark.speed)*pxToCoords(shark.px_x, shark.px_y + 1)[1]
            shark.predicted_location[0] = (1/shark.speed)*pxToCoords(shark.px_x, shark.px_y + 1)[0]
        elif maxIndex == 7:
            shark.predicted_location[1] = (1/shark.speed)*pxToCoords(shark.px_x + 1, shark.px_y + 1)[1]
            shark.predicted_location[0] = (1/shark.speed)*pxToCoords(shark.px_x + 1, shark.px_y + 1)[0]
        else:
            shark.predicted_location[1] = (1/shark.speed)*pxToCoords(shark.px_x + randint(-1, 1), shark.px_y + randint(-1, 1))[1]
            shark.predicted_location[0] = (1/shark.speed)*pxToCoords(shark.px_x + randint(-1, 1), shark.px_y + randint(-1, 1))[0]
    if SHARK_CATEGORIES[shark.species] == 1:
        if time.time() - shark.prev_mode_time > 604800: # 1 week
            shark.prev_mode = shark.mode
            shark.mode = "transiting"
            shark.prev_mode_time = time.time()
    else:
        if time.time() - shark.prev_mode_time > 259200: # 3 days
            shark.prev_mode = shark.mode
            shark.mode = "transiting"
            shark.prev_mode_time = time.time()

    return (shark.predicted_location[0], shark.predicted_location[1])

def transiting(shark: Shark):
    if time.time() - shark.prev_mode_time > 86400: # 1 day
        shark.prev_mode = shark.mode
        shark.mode = "scavenging"
        shark.prev_mode_time = time.time()
        shark.predicted_location[1] = shark.location[1]
        shark.predicted_location[0] = shark.location[0]
    else:
        direction = randint(0, 7)
        scan = scanSquare(shark.px_x, shark.px_y)

        while scan[direction] == -999:
            direction = randint(0, 7)
        
        if direction == 0:
            shark.predicted_location[1] = (1/shark.speed)*pxToCoords(shark.px_x - 1, shark.px_y - 1)[1]
            shark.predicted_location[0] = (1/shark.speed)*pxToCoords(shark.px_x - 1, shark.px_y - 1)[0]
        elif direction == 1:
            shark.predicted_location[1] = (1/shark.speed)*pxToCoords(shark.px_x, shark.px_y - 1)[1]
            shark.predicted_location[0] = (1/shark.speed)*pxToCoords(shark.px_x, shark.px_y - 1)[0]
        elif direction == 2:
            shark.predicted_location[1] = (1/shark.speed)*pxToCoords(shark.px_x + 1, shark.px_y - 1)[1]
            shark.predicted_location[0] = (1/shark.speed)*pxToCoords(shark.px_x + 1, shark.px_y - 1)[0]
        elif direction == 3:
            shark.predicted_location[1] = (1/shark.speed)*pxToCoords(shark.px_x - 1, shark.px_y)[1]
            shark.predicted_location[0] = (1/shark.speed)*pxToCoords(shark.px_x - 1, shark.px_y)[0]
        elif direction == 4:
            shark.predicted_location[1] = (1/shark.speed)*pxToCoords(shark.px_x + 1, shark.px_y)[1]
            shark.predicted_location[0] = (1/shark.speed)*pxToCoords(shark.px_x + 1, shark.px_y)[0]
        elif direction == 5:
            shark.predicted_location[1] = (1/shark.speed)*pxToCoords(shark.px_x - 1, shark.px_y + 1)[1]
            shark.predicted_location[0] = (1/shark.speed)*pxToCoords(shark.px_x - 1, shark.px_y + 1)[0]
        elif direction == 6:
            shark.predicted_location[1] = (1/shark.speed)*pxToCoords(shark.px_x, shark.px_y + 1)[1]
            shark.predicted_location[0] = (1/shark.speed)*pxToCoords(shark.px_x, shark.px_y + 1)[0]
        elif direction == 7:
            shark.predicted_location[1] = (1/shark.speed)*pxToCoords(shark.px_x + 1, shark.px_y + 1)[1]
            shark.predicted_location[0] = (1/shark.speed)*pxToCoords(shark.px_x + 1, shark.px_y + 1)[0]
        


def scanSquare(px_x, px_y):
    return [comparePixel(px_x - 1, px_y - 1), 
            comparePixel(px_x, px_y - 1), 
            comparePixel(px_x + 1, px_y - 1), 
            comparePixel(px_x - 1, px_y), 
            comparePixel(px_x + 1, px_y), 
            comparePixel(px_x - 1, px_y + 1), 
            comparePixel(px_x, px_y + 1), 
            comparePixel(px_x + 1, px_y + 1)]

def comparePixel(px_x, px_y):
    phytoplankton_img = Image.open("public/phytoplankton.png") #path to phytoplankton image
    depth_img = Image.open("public/depth.png") #path to depth image

    phyto_color = phytoplankton_img.getpixel((px_x, px_y))
    depth_color = depth_img.getpixel((px_x, px_y))
    if depth_color == (0, 0, 0):
        return -999
    
    red = phyto_color[0]
    green = phyto_color[1]
    blue = phyto_color[2]

    if max(red, green, blue) == blue:
        return 0.01
    elif max(red, green, blue) == green:
        return 0.1
    elif max(red, green, blue) == red:
        return 1
    
def calcDepth(px_x, px_y):
    depth_img = Image.open("public/depth.png") #path to depth image
    depth_color = depth_img.getpixel((px_x, px_y))
    
    red = depth_color[0]
    green = depth_color[1]
    blue = depth_color[2]

    brightness = (red + green + blue) // 3

    depth = (brightness / 255) * 11000
    return depth   