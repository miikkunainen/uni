/* ============================================================
   PAJAKUUTIO — jaettu navigointipalkki (yksi tiedosto kaikille sivuille)
   Liitä jokaiseen HTML-sivuun heti <body>-tagin jälkeen:
     <script src="pajakuutio-nav.js"></script>
   Muokkaa linkkejä VAIN tästä tiedostosta — muutos näkyy kaikilla sivuilla.
   Pidä kaikki sivut + tämä tiedosto samassa kansiossa.
   ============================================================ */
(function(){
  "use strict";

  // Estä kaksoisinjektointi (myös Pajapeli 3D:n popout-ikkunassa)
  if(window.__pkNav || (document.body && document.body.querySelector(".pk-nav"))){ return; }
  window.__pkNav = true;

  // ---- Sivurekisteri: tiedostonimi + näkyvä nimi ----
  var PAGES = [
    {f:"index.html",                                  t:"Koti"},
    {f:"syksyn_orientaatiokurssi.html",               t:"Orientaatio"},
    {f:"paja_app.html",                               t:"Paja-app"},
    {f:"paja_kemikaalirekisteri.html",                t:"Kemikaalit"},
    {f:"paja_herateloki.html",                        t:"Herätteet"},
    {f:"mhks_app.html",                               t:"MHKS"},
    {f:"paja_seuranta.html",                          t:"Seuranta"},
    {f:"pajapeli_3d_simulaattori.html",               t:"Pajapeli 3D"},
    {f:"pajakuutio_hallinnan_kartta.html",            t:"Hallinnan kartta"},
    {f:"pajakuutio_pelikirja.html",                   t:"Pelikirja"},
    {f:"linkit.html",                                 t:"Kaikki sivut"}
  ];

  function inject(){
    if(document.body.querySelector(".pk-nav")) return;

    // Fontit (vain jos sivulla ei jo ole)
    if(!document.querySelector('link[href*="Big+Shoulders+Display"]')){
      var lp=document.createElement("link"); lp.rel="preconnect"; lp.href="https://fonts.googleapis.com"; document.head.appendChild(lp);
      var lf=document.createElement("link"); lf.rel="stylesheet";
      lf.href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700;800&family=IBM+Plex+Mono:wght@500;600&display=swap";
      document.head.appendChild(lf);
    }

    // Tyylit (lisätään headin loppuun, jotta .printbar-säätö voittaa sivun oman)
    var css =
      ".pk-nav{position:sticky;top:0;z-index:1000;background:#E4DCCC;border-bottom:1px solid #C8BFAD;"
      + "font-family:'IBM Plex Mono',monospace;box-shadow:0 2px 14px rgba(33,28,22,.10);}"
      + ".pk-inner{max-width:1180px;margin:0 auto;display:flex;align-items:center;gap:12px;"
      + "padding:7px clamp(14px,3vw,28px);flex-wrap:wrap;}"
      + ".pk-brand{font-family:'Big Shoulders Display',sans-serif;font-weight:800;text-transform:uppercase;"
      + "font-size:1.3rem;letter-spacing:.01em;color:#211C16;text-decoration:none;line-height:1;flex:none;}"
      + ".pk-brand span{color:#CE3F1B;}"
      + ".pk-toggle{display:none;margin-left:auto;background:transparent;border:1px solid #211C16;color:#211C16;"
      + "border-radius:3px;font-size:1.05rem;line-height:1;padding:.28em .55em;cursor:pointer;}"
      + ".pk-links{display:flex;flex-wrap:wrap;gap:1px 3px;align-items:center;}"
      + ".pk-link{font-size:.67rem;letter-spacing:.05em;text-transform:uppercase;color:#5A5347;text-decoration:none;"
      + "padding:.42em .62em;border-radius:3px;white-space:nowrap;border-bottom:2px solid transparent;}"
      + ".pk-link:hover{color:#211C16;background:rgba(33,28,22,.05);}"
      + ".pk-link.pk-active{color:#CE3F1B;border-bottom-color:#CE3F1B;font-weight:600;}"
      + ".printbar{top:58px;}"
      + "@media (max-width:860px){"
      + ".pk-toggle{display:block;}"
      + ".pk-links{display:none;flex-basis:100%;flex-direction:column;align-items:stretch;margin-top:4px;}"
      + ".pk-links.pk-show{display:flex;}"
      + ".pk-link{padding:.62em .4em;border-bottom:1px solid #D8D0C0;border-radius:0;}"
      + ".pk-link.pk-active{border-bottom-color:#CE3F1B;}"
      + "}";
    var st=document.createElement("style"); st.id="pk-nav-style"; st.appendChild(document.createTextNode(css));
    document.head.appendChild(st);

    // Aktiivinen sivu tiedostonimen perusteella
    var cur = (location.pathname.split("/").pop() || "index.html");
    if(cur === "") cur = "index.html";

    var links = "", i, p, act;
    for(i=0;i<PAGES.length;i++){
      p = PAGES[i];
      act = (p.f === cur) ? " pk-active" : "";
      links += '<a class="pk-link'+act+'" href="'+p.f+'">'+p.t+'</a>';
    }

    var bar = document.createElement("header");
    bar.className = "pk-nav";
    bar.innerHTML =
        '<div class="pk-inner">'
      +   '<a class="pk-brand" href="index.html">Paja<span>kuutio</span></a>'
      +   '<button class="pk-toggle" id="pkToggle" aria-label="Avaa valikko">&#9776;</button>'
      +   '<nav class="pk-links" id="pkLinks" aria-label="Sivuston navigointi">'+links+'</nav>'
      + '</div>';
    document.body.insertBefore(bar, document.body.firstChild);

    var tg = document.getElementById("pkToggle");
    if(tg){ tg.addEventListener("click", function(){
      document.getElementById("pkLinks").classList.toggle("pk-show");
    }); }
  }

  if(document.body){ inject(); }
  else { document.addEventListener("DOMContentLoaded", inject); }

})();
