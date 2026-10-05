# Open the 3D equipment viewer

From this directory run:

```powershell
python -m http.server 8765 --bind 127.0.0.1
```

Then open http://127.0.0.1:8765 in Chrome or Edge. Keep the server running. Opening index.html directly as a file can block GLB loading.

The viewer's library and models are local; it does not need a CDN. The copied Lite prototype may request optional Google Fonts. Rotate with a drag, zoom with the wheel, and pan with right-drag. Choose a scene, show labels, inspect components and save a labelled PNG for your slides.

The `models/` directory holds the portable GLBs and SHA-256 manifest. `evidence/cad-housings.zip` contains the original STEP/STL housings. Read `evidence/PROJECT_REVIEW.md` for the source audit, evidence boundaries, sharing instructions and planned video storyboard.

To rebuild the meshes from the repository source:

```powershell
& 'E:\New folder (3)\.venv\Scripts\python.exe' export_models.py
```

The source must remain next to this directory in `../cad/`. Dependencies: CadQuery 2.8.0 and trimesh 5.1.1. Three.js 0.169.0 is vendored with its MIT license.

The repository geometry is the upstream author's work. Keep source attribution and check applicable permissions before redistributing or claiming authorship. The new viewer presents that design; it does not certify fabrication readiness.
