#!/usr/bin/env python3
"""Extract the inline <script> block from a single-file HTML tool for syntax checking."""
import sys

src, out = sys.argv[1], sys.argv[2]
h = open(src, encoding="utf-8").read()
start = h.index("<script>") + len("<script>")
end = h.rindex("</script>")
open(out, "w", encoding="utf-8").write(h[start:end])
print(f"Extracted {end - start} bytes of JS from {src}")
