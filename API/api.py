from PIL import Image
import os
from datetime import date

class PhytoplanktonImages:
    def get_image(self, year, month, day) -> list[Image.Image]:
        print(f"{year}{month:02d}{day:02d}")
        for line in open("nasa-hacks-2025/API/phytoplankton.txt", "r").readlines():
            if f"{year}{month:02d}{day:02d}" in line:
                os.system(f"curl --output ./{year}-{month}-{day}.png --url " + line)
