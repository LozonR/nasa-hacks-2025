import time

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
            location: list[float, float],
            prev_location: list[float, float] = [0.0, 0.0],
            predicted_location: list[float, float] = [0.0, 0.0],
            mode: str = "scavenging",
            prev_mode: str = "traversing",
            prev_mode_time: int = 0,
            depth: float =0.0,
            prev_depth: float =0.0,
            predicted_depth: float = 0.0,
            px_x: int = 0,
            px_y: int = 0,
            facing: list[int] = [0, 0],
            initial_time_depth: int = 0,
            depth_mode: str = "sinning"
            
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
        self.predicted_depth = predicted_depth
        self.px_x = px_x
        self.px_y = px_y
        self.facing = facing
        self.prev_location = prev_location
        self.initial_time_depth = initial_time_depth
        self.depth_mode = depth_mode
        self.prev_mode_time = prev_mode_time
        self.prev_depth = prev_depth


class TravelSpot:
    def __init__(self, lat: float, long: float, date: str):
        self.lat = lat
        self.long = long
        self.date = date
