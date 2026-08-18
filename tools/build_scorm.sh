#!/usr/bin/env bash
# Rakentaa SCORM 1.2 -paketit src/-kansion työkaluista.
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p build/studio build/seula scorm

make_manifest() {   # $1=identifier  $2=title  $3=outfile  $4=mastery(optional)
  local mastery=""
  [ -n "${4:-}" ] && mastery="<adlcp:masteryscore>$4</adlcp:masteryscore>"
  cat > "$3" <<XML
<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="$1" version="1.2"
  xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2"
  xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.imsproject.org/xsd/imscp_rootv1p1p2 imscp_rootv1p1p2.xsd http://www.adlnet.org/xsd/adlcp_rootv1p2 adlcp_rootv1p2.xsd">
  <metadata><schema>ADL SCORM</schema><schemaversion>1.2</schemaversion></metadata>
  <organizations default="ORG"><organization identifier="ORG"><title>$2</title>
    <item identifier="ITEM-1" identifierref="RES-1" isvisible="true"><title>$2</title>$mastery</item>
  </organization></organizations>
  <resources><resource identifier="RES-1" type="webcontent" adlcp:scormtype="sco" href="index.html"><file href="index.html"/></resource></resources>
</manifest>
XML
}

make_manifest "TURBIINI_STARTUP_STUDIO" "Turbiini Startup Studio" build/studio/imsmanifest.xml 100
make_manifest "TURBIINI_HAKUSEULA"      "Turbiini Hakuseula"      build/seula/imsmanifest.xml

cp src/studio.html    build/studio/index.html
cp src/hakuseula.html build/seula/index.html

rm -f scorm/turbiini_studio_SCORM.zip scorm/turbiini_hakuseula_SCORM.zip
(cd build/studio && zip -qr ../../scorm/turbiini_studio_SCORM.zip    imsmanifest.xml index.html)
(cd build/seula  && zip -qr ../../scorm/turbiini_hakuseula_SCORM.zip imsmanifest.xml index.html)

python3 tools/check_scorm.py scorm/turbiini_studio_SCORM.zip scorm/turbiini_hakuseula_SCORM.zip

# GitHub Pages serves only docs/, so keep downloadable copies there too
mkdir -p docs/scorm
cp scorm/turbiini_studio_SCORM.zip scorm/turbiini_hakuseula_SCORM.zip docs/scorm/

echo "SCORM packages built."
