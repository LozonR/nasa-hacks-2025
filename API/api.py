from PIL import Image
import os


class PhytoplanktonImages:
    def get_image(self, year, month, day):
        print(f"{year}{month:02d}{day:02d}")
        for line in open("API/phytoplankton.txt", "r").readlines():
            if f"{year}{month:02d}{day:02d}" in line:
                os.system(f"curl --output ./{year}-{month}-{day}.png --url " + line)

    def remove_blacks(self, image: Image.Image) -> Image.Image:
        return Image.eval(
            image, lambda color: 0.0 if color == 0x000000FF else color
        )


if __name__ == "__main__":
    whatever = PhytoplanktonImages()
    whatever.get_image(2025, 10, 3)
    image = Image.open("2025-10-3.png")
    image.convert("RGBA")
    newImage = whatever.remove_blacks(image)
    newImage.convert("RGBA")
    # newImage.save("image.png")
    newImage.show()
