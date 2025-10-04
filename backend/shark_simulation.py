import time
import numpy as np
from random import randint, choice
from PIL import Image

sharks = []
isDay = True
currentShark = 0

# Load depth map image for terrain checking
depth_map = None
DEPTH_LAND_COLOR = 0x787774  # Hex color indicating land/shallow depth

def load_depth_map(image_path):
    """Load the depth map image for collision detection"""
    global depth_map
    try:
        depth_map = Image.open(image_path).convert('RGB')
        return True
    except Exception as e:
        print(f"Error loading depth map: {e}")
        return False

def get_pixel_color(px_x, px_y):
    """Get the color at a specific pixel coordinate from depth map"""
    if depth_map is None:
        return None

    try:
        width, height = depth_map.size
        # Clamp coordinates to image bounds
        px_x = max(0, min(int(px_x), width - 1))
        px_y = max(0, min(int(px_y), height - 1))

        r, g, b = depth_map.getpixel((px_x, px_y))
        # Convert RGB to hex
        return (r << 16) | (g << 8) | b
    except Exception as e:
        print(f"Error getting pixel color: {e}")
        return None

def check_5x5_grid(center_px_x, center_px_y):
    """
    Check a 5x5 pixel grid centered at shark coordinates
    Returns True if any pixel matches land color (#787774)
    """
    if depth_map is None:
        return False

    for dx in range(-2, 3):  # -2, -1, 0, 1, 2
        for dy in range(-2, 3):
            pixel_color = get_pixel_color(center_px_x + dx, center_px_y + dy)
            if pixel_color == DEPTH_LAND_COLOR:
                return True
    return False

class Shark:
    def __init__(self, type, mode, latitude, longitude, direction, name, depth=None):
        self.latitude = latitude
        self.longitude = longitude
        self.type = type
        self.mode = mode
        self.prev_mode = None
        self.direction = direction  # Direction in degrees (0-360)
        self.modeSwitch = time.time()
        self.px_x, self.px_y = coordsToPx(latitude, longitude)
        self.name = name
        self.depth = depth if depth else randint(1, 100)
        self.prev_depth = self.depth
        self.pitch = 135  # Pitch angle in degrees
        self.predicted_lat = latitude
        self.predicted_long = longitude
        self.vert_vel = 0  # Vertical velocity
        self.terminated = False  # Flag for shark termination

        sharks.append(self)

    def check_land_collision(self):
        """
        Check if shark hits land using 5x5 grid
        If land detected, rotate 90 or 180 degrees randomly
        """
        if check_5x5_grid(self.px_x, self.px_y):
            # Land collision detected - rotate randomly
            rotation = choice([90, 180])
            self.direction = (self.direction + rotation) % 360
            return True
        return False

    def check_depth_termination(self):
        """
        Check if shark is in an area with depth color #787774
        If so, terminate the shark
        """
        pixel_color = get_pixel_color(self.px_x, self.px_y)
        if pixel_color == DEPTH_LAND_COLOR:
            self.terminated = True
            print(f"Shark {self.name} terminated at depth indicator location")
            return True
        return False

    def update_position(self, speed):
        """
        Update shark position based on current direction and speed
        """
        if self.terminated:
            return

        # Convert direction to radians
        direction_rad = np.radians(self.direction)

        # Calculate movement in lat/long
        # Approximate: 1 degree latitude ≈ 111 km
        # Speed assumed to be in km/h
        lat_change = speed * np.cos(direction_rad) / 111.0
        lng_change = speed * np.sin(direction_rad) / (111.0 * np.cos(np.radians(self.latitude)))

        # Update position
        self.latitude += lat_change
        self.longitude += lng_change

        # Update pixel coordinates
        self.px_x, self.px_y = coordsToPx(self.latitude, self.longitude)

        # Check for collisions
        self.check_land_collision()
        self.check_depth_termination()

    def forage_mode(self):
        """
        Foraging behavior - actively searching for prey
        More erratic movement patterns
        """
        if self.terminated:
            return

        # Random direction changes while foraging
        if randint(0, 100) < 20:  # 20% chance to change direction
            self.direction = (self.direction + randint(-45, 45)) % 360

        # Moderate speed while foraging
        speed = randint(3, 8)  # km/h
        self.update_position(speed)
        self.predicted_lat = self.latitude
        self.predicted_long = self.longitude

    def scavenge_mode(self):
        """
        Scavenging behavior - slower, more methodical movement
        Following scent trails or searching for dead prey
        """
        if self.terminated:
            return

        # Less frequent direction changes
        if randint(0, 100) < 10:  # 10% chance to change direction
            self.direction = (self.direction + randint(-30, 30)) % 360

        # Slower speed while scavenging
        speed = randint(1, 4)  # km/h
        self.update_position(speed)
        self.predicted_lat = self.latitude
        self.predicted_long = self.longitude

    def sleeping_mode(self):
        """
        Sleeping/resting behavior - minimal movement
        Maintain position with slight drift
        """
        if self.terminated:
            return

        # Very minimal movement during sleep
        speed = randint(0, 1)  # km/h
        self.update_position(speed)

        # Set predicted position to current (no active hunting)
        self.predicted_lat = self.latitude
        self.predicted_long = self.longitude

    def update(self):
        """
        Main update method - called each simulation tick
        """
        if self.terminated:
            return

        # Calculate vertical velocity
        if self.prev_depth is not None:
            self.vert_vel = (self.depth - self.prev_depth) / 60
            speed = abs(self.vert_vel / np.sin(np.radians(self.pitch)))
        else:
            speed = 5  # Default speed

        # Update depth tracking
        self.prev_depth = self.depth

        # Execute behavior based on current mode
        if self.mode == "sleeping":
            # Check if it's day - if so, wake up
            if isDay:
                self.mode = self.prev_mode if self.prev_mode else "foraging"
                print(f"{self.name} waking up - switching to {self.mode} mode")
            else:
                self.sleeping_mode()

        elif self.mode == "scavenging":
            if self.type == "great white":
                if isDay:
                    self.scavenge_mode()
                else:
                    # Switch to sleeping at night
                    self.prev_mode = self.mode
                    self.mode = "sleeping"
                    print(f"{self.name} going to sleep")

        elif self.mode == "foraging":
            self.forage_mode()

        # Random mode switches based on environmental factors
        if randint(0, 1000) < 5:  # 0.5% chance per update
            old_mode = self.mode
            if self.mode != "sleeping":
                self.mode = choice(["foraging", "scavenging"])
                if self.mode != old_mode:
                    print(f"{self.name} switching from {old_mode} to {self.mode}")

def coordsToPx(latitude, longitude):
    """Convert lat/long coordinates to pixel coordinates"""
    px_x = 24 * longitude
    px_y = 24 * latitude
    return (px_x, px_y)

def pxToCoords(px_x, px_y):
    """Convert pixel coordinates to lat/long coordinates"""
    latitude = px_y / 24
    longitude = px_x / 24
    return (latitude, longitude)

def currentDepthOcean(latitude, longitude):
    """
    Get the current ocean depth at given coordinates
    Uses the depth map to determine actual depth
    """
    px_x, px_y = coordsToPx(latitude, longitude)
    pixel_color = get_pixel_color(px_x, px_y)

    if pixel_color == DEPTH_LAND_COLOR:
        return 0  # Land/shallow

    # TODO: Implement actual depth calculation from depth map
    # For now, return a default depth
    return randint(50, 1000)

def updateSharks():
    """Update all sharks in the simulation"""
    global currentShark

    if len(sharks) == 0:
        return

    # Update current shark
    shark = sharks[currentShark]
    shark.update()

    # Move to next shark
    currentShark = (currentShark + 1) % len(sharks)

def get_shark_data():
    """
    Return shark data in format suitable for API response
    """
    shark_data = []
    for shark in sharks:
        shark_data.append({
            "name": shark.name,
            "type": shark.type,
            "mode": shark.mode,
            "latitude": shark.latitude,
            "longitude": shark.longitude,
            "direction": shark.direction,
            "depth": shark.depth,
            "predicted_lat": shark.predicted_lat,
            "predicted_long": shark.predicted_long,
            "terminated": shark.terminated,
            "px_x": shark.px_x,
            "px_y": shark.px_y
        })
    return shark_data

# Example initialization
if __name__ == "__main__":
    # Load depth map
    load_depth_map("path/to/depth.png")

    # Create some test sharks
    test_shark1 = Shark(
        type="great white",
        mode="foraging",
        latitude=36.7783,
        longitude=-121.9200,
        direction=45,
        name="Test Shark 1"
    )

    test_shark2 = Shark(
        type="great white",
        mode="scavenging",
        latitude=21.3099,
        longitude=-157.8581,
        direction=180,
        name="Test Shark 2"
    )

    # Run simulation
    for i in range(100):
        updateSharks()
        time.sleep(0.1)

        # Print positions every 10 iterations
        if i % 10 == 0:
            print(f"\n--- Iteration {i} ---")
            for shark in sharks:
                if not shark.terminated:
                    print(f"{shark.name}: ({shark.latitude:.4f}, {shark.longitude:.4f}) - Mode: {shark.mode}")
