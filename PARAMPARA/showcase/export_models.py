"""Export repository CAD scenes unchanged into portable, metre-unit GLB files.
Run with the workspace .venv Python. No render window is needed.
"""
from pathlib import Path
import sys, json, hashlib
import numpy as np
import trimesh

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE.parent / 'cad'))
import parampara_cad as P
import render_all as R

manifest = {}
KEEP = {'sleeve_iso', 'ring_exploded', 'motor_exploded', 'hand_exploded', 'hub_exploded', 'tabla_iso', 'puppet_iso', 'loom_iso'}

def convert(vertices):
    a = np.asarray(vertices, dtype=float)
    return np.column_stack((a[:,0], a[:,2], -a[:,1])) / 1000

def capture(name, parts, cam, size=None, anchors=None, tubes=(), parallel=False, tol=0.2):
    if name not in KEEP: return
    scene = trimesh.Scene()
    def mesh_add(label, vertices, faces, color, opacity=1):
        mesh = trimesh.Trimesh(vertices=convert(vertices), faces=faces, process=False)
        mesh.visual = trimesh.visual.TextureVisuals(material=trimesh.visual.material.PBRMaterial(
            name=label, baseColorFactor=[int(c*255) for c in color]+[int(opacity*255)],
            metallicFactor=0.15 if color == P.C['metal'] else 0.02, roughnessFactor=0.65,
            alphaMode='BLEND' if opacity < 1 else 'OPAQUE', doubleSided=True))
        scene.add_geometry(mesh, node_name=f'{len(scene.geometry):03d}_{label}', geom_name=f'{len(scene.geometry):03d}_{label}')
    for label, shape, color, opacity in parts:
        shape = shape.val() if hasattr(shape, 'val') else shape
        vertices, faces = shape.tessellate(max(tol, .18), .25)
        mesh_add(label, [(v.x,v.y,v.z) for v in vertices], faces, color, opacity)
    import vtk
    from vtkmodules.util.numpy_support import vtk_to_numpy
    for pd, color in tubes:
        tri = vtk.vtkTriangleFilter(); tri.SetInputData(pd); tri.Update()
        out = tri.GetOutput()
        mesh_add('cable', vtk_to_numpy(out.GetPoints().GetData()), vtk_to_numpy(out.GetPolys().GetData()).reshape(-1,4)[:,1:], color)
    dest = HERE / 'models' / (name+'.glb')
    dest.write_bytes(scene.export(file_type='glb'))
    manifest[name] = dict(file=dest.name, meshes=len(scene.geometry), bytes=dest.stat().st_size,
                          sha256=hashlib.sha256(dest.read_bytes()).hexdigest(),
                          anchors={k:convert([v])[0].tolist() for k,v in (anchors or {}).items()})
    (HERE/'models'/'manifest.json').write_text(json.dumps(manifest,indent=2))
    print(name, len(scene.geometry), dest.stat().st_size, flush=True)

R.go = capture
R.sleeve_views()
R.exploded()
R.tabla()
R.puppet()
R.loom()
