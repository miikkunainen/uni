#!/usr/bin/env python3
"""Verify each SCORM zip has imsmanifest.xml + index.html at its root and valid XML."""
import sys, zipfile, xml.dom.minidom

ok = True
for path in sys.argv[1:]:
    try:
        zf = zipfile.ZipFile(path)
        names = zf.namelist()
        if "imsmanifest.xml" not in names or "index.html" not in names:
            print(f"FAIL {path}: expected imsmanifest.xml and index.html at root, got {names}")
            ok = False
            continue
        xml.dom.minidom.parseString(zf.read("imsmanifest.xml"))
        print(f"OK   {path}: {names}")
    except Exception as e:
        print(f"FAIL {path}: {e}")
        ok = False
sys.exit(0 if ok else 1)
