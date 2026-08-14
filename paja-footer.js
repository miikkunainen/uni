/* ============================================================
   Jaettu alatunniste — tietosuojalinkki jokaiselle sivulle.
   Liitä sivuun yksi rivi juuri ennen </body>:
     <script src="paja-footer.js"></script>
   Muokkaa tekstiä tai linkkejä VAIN tästä tiedostosta.
   ============================================================ */
(function(){
  "use strict";
  if(window.__pkFooter) return;
  window.__pkFooter = true;

  function inject(){
    if(document.querySelector(".pk-footer")) return;

    var css =
      ".pk-footer{margin-top:40px;padding:16px clamp(14px,4vw,30px) 26px;border-top:1px solid #C8BFAD;"
      + "background:transparent;font-family:'IBM Plex Mono',ui-monospace,monospace;font-size:.64rem;"
      + "line-height:1.8;color:#5A5347;text-align:center;}"
      + ".pk-footer a{color:#CE3F1B;text-decoration:none;}"
      + ".pk-footer a:hover{text-decoration:underline;}"
      + ".pk-footer .pk-sep{opacity:.5;margin:0 .5em;}"
      + "@media print{.pk-footer{display:none;}}";
    var st=document.createElement("style");
    st.appendChild(document.createTextNode(css));
    document.head.appendChild(st);

    var cur=(location.pathname.split("/").pop()||"index.html");
    var f=document.createElement("footer");
    f.className="pk-footer";
    var links = (cur==="tietosuoja.html")
      ? '<a href="index.html">Etusivu</a>'
      : '<a href="tietosuoja.html">Tietosuoja ja GDPR-käytänteet</a><span class="pk-sep">·</span><a href="index.html">Etusivu</a>';
    f.innerHTML = links
      + '<br>Muotoilun pajat · Metropolia · Arabian kampus'
      + '<br>Pilotti: tiedot tallentuvat selaimeen. Älä syötä oikeita henkilötietoja.';
    document.body.appendChild(f);
  }

  if(document.body){ inject(); }
  else { document.addEventListener("DOMContentLoaded", inject); }
})();
