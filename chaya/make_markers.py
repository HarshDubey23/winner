"""Print these four ArUco markers and tape them at the screen corners (IDs 0-3 = TL, TR, BR, BL).

    python3 make_markers.py            -> results/markers/marker_0.png ... marker_3.png
Print each at 60 mm wide.  Measure the centre-to-centre distances (width, height) in mm.
"""
import os

import cv2

OUT = os.path.join(os.path.dirname(__file__), "results", "markers")
os.makedirs(OUT, exist_ok=True)
d = cv2.aruco.getPredefinedDictionary(cv2.aruco.DICT_4X4_50)
for i in range(4):
    img = cv2.aruco.generateImageMarker(d, i, 400)
    img = cv2.copyMakeBorder(img, 40, 40, 40, 40, cv2.BORDER_CONSTANT, value=255)
    cv2.imwrite(os.path.join(OUT, f"marker_{i}.png"), img)
print("wrote", OUT)
