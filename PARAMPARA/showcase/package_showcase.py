from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED

root = Path(__file__).resolve().parent
dest = root.parent / 'PARAMPARA-3D-Evidence.zip'
with ZipFile(dest, 'w', ZIP_DEFLATED) as out:
    for p in sorted(root.rglob('*')):
        if p.is_file() and p.suffix not in ('.exe', '.pyc') and '__pycache__' not in p.parts:
            out.write(p, p.relative_to(root))
with ZipFile(dest) as out:
    assert out.testzip() is None
    assert 'index.html' in out.namelist()
    assert len([n for n in out.namelist() if n.endswith('.glb')]) == 8
print(dest, dest.stat().st_size, 'bytes; ZIP integrity verified')
