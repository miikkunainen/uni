/* ============================================================
   PAJAKUUTIO — jaettu ylätason hallintapalkki
   Liitä jokaiseen sivuun heti <body>-tagin jälkeen:
     <script src="pajakuutio-nav.js"></script>
   Muokkaa linkkejä ja osioita VAIN tästä tiedostosta.
   Pidä kaikki sivut + tämä tiedosto samassa kansiossa.
   ============================================================ */
(function(){
  "use strict";

  if(window.__pkNav || (document.body && document.body.querySelector(".pk-nav"))){ return; }
  window.__pkNav = true;

  /* Palkin linkit */
  var PAGES = [
    {f:"index.html",                        t:"Koti"},
    {f:"kartta.html",                       t:"Kartta"},
    {f:"orientaatio.html",                  t:"Orientaatio"},
    {f:"syksyn_orientaatiokurssi.html",     t:"Ajokortti"},
    {f:"paja_app.html",                     t:"Paja-app"},
    {f:"paja_konerekisteri.html",           t:"Konerekisteri"},
    {f:"paja_kemikaalit.html",      t:"Kemikaalit"},
    {f:"paja_herateloki.html",              t:"Herätteet"},
    {f:"mhks_app.html",                     t:"MHKS"},
    {f:"paja_seuranta.html",                t:"Seuranta"},
    {f:"asenna.html",                       t:"Asenna sovellus"},
    {f:"tietosuoja.html",                   t:"Tietosuoja"},
    {f:"linkit.html",                       t:"Kaikki sivut"}
  ];

  /* Osiot: mihin kokonaisuuteen sivu kuuluu (murupolkua varten) */
  var SECTIONS = [
    { s:"Oppiminen ja pätevyys", pages:{
        "orientaatio.html":"Orientaatiokurssi — opiskelijan sovellus",
        "syksyn_orientaatiokurssi.html":"Ajokorttiputki",
        "vaihe1_turvallisuus_mhks.html":"Vaihe 1 — esitiedot",
        "turvallisuus_ja_tyolupa.html":"Työlupa",
        "orientaatiokurssi_moodle.html":"Kurssidokumentti" } },
    { s:"Päivittäinen työ", pages:{
        "paja_app.html":"Paja-app",
        "paja_konerekisteri.html":"Konerekisteri ja pajaäly",
        "paja_kemikaalit.html":"Kemikaalienhallinta",
        "paja_herateloki.html":"Herätteet ja loki" } },
    { s:"Hallinta ja talous", pages:{
        "mhks_app.html":"MHKS",
        "paja_seuranta.html":"Seuranta" } },
    { s:"Perusta ja ymmärrys", pages:{
        "pajatoiminnan_perusta.html":"Pajatoiminnan perusta",
        "pajakuutio_hallinnan_kartta.html":"Hallinnan kartta",
        "pajakuutio_esikatselu.html":"Pajakuutio",
        "pajapeli_digital_twin.html":"Pajapeli" } },
    { s:"Yleiset", pages:{
        "kartta.html":"Sivustokartta",
        "asenna.html":"Asenna sovellus",
        "tietosuoja.html":"Tietosuoja ja GDPR",
        "linkit.html":"Kaikki sivut" } }
  ];

  function locate(file){
    var i, k;
    for(i=0;i<SECTIONS.length;i++){
      for(k in SECTIONS[i].pages){
        if(SECTIONS[i].pages.hasOwnProperty(k) && k===file){
          return { s:SECTIONS[i].s, t:SECTIONS[i].pages[k] };
        }
      }
    }
    return null;
  }

  function inject(){
    if(document.body.querySelector(".pk-nav")) return;

    if(!document.querySelector('link[href*="Big+Shoulders+Display"]')){
      var lp=document.createElement("link"); lp.rel="preconnect"; lp.href="https://fonts.googleapis.com"; document.head.appendChild(lp);
      var lf=document.createElement("link"); lf.rel="stylesheet";
      lf.href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700;800&family=IBM+Plex+Mono:wght@500;600&display=swap";
      document.head.appendChild(lf);
    }

    var css =
      ".pk-nav{position:sticky;top:0;z-index:1000;background:#E4DCCC;border-bottom:1px solid #C8BFAD;"
      + "font-family:'IBM Plex Mono',ui-monospace,monospace;box-shadow:0 2px 14px rgba(33,28,22,.10);}"
      + ".pk-inner{max-width:1180px;margin:0 auto;display:flex;align-items:center;gap:12px;"
      + "padding:6px clamp(12px,3vw,28px);flex-wrap:wrap;}"
      + ".pk-brand{font-family:'Big Shoulders Display',sans-serif;font-weight:800;text-transform:uppercase;"
      + "font-size:1.22rem;color:#211C16;text-decoration:none;line-height:1;flex:none;}"
      + ".pk-brand span{color:#CE3F1B;}"
      + ".pk-toggle{display:none;margin-left:auto;background:transparent;border:1px solid #211C16;color:#211C16;"
      + "border-radius:3px;font-size:1.05rem;line-height:1;padding:.26em .55em;cursor:pointer;}"
      + ".pk-links{display:flex;flex-wrap:wrap;gap:1px 3px;align-items:center;}"
      + ".pk-link{font-size:.65rem;letter-spacing:.04em;text-transform:uppercase;color:#5A5347;text-decoration:none;"
      + "padding:.4em .58em;border-radius:3px;white-space:nowrap;border-bottom:2px solid transparent;}"
      + ".pk-link:hover{color:#211C16;background:rgba(33,28,22,.05);}"
      + ".pk-link.pk-active{color:#CE3F1B;border-bottom-color:#CE3F1B;font-weight:600;}"
      /* murupolku */
      + ".pk-crumb{background:#EFE9DD;border-top:1px solid #D8D0C0;}"
      + ".pk-crumb-in{max-width:1180px;margin:0 auto;padding:4px clamp(12px,3vw,28px);"
      + "font-size:.6rem;letter-spacing:.06em;text-transform:uppercase;color:#5A5347;display:flex;gap:.5em;align-items:center;flex-wrap:wrap;}"
      + ".pk-crumb-in a{color:#5A5347;text-decoration:none;}"
      + ".pk-crumb-in a:hover{color:#211C16;text-decoration:underline;}"
      + ".pk-crumb-in .pk-sep{opacity:.45;}"
      + ".pk-crumb-in b{color:#211C16;font-weight:600;}"
      + ".pk-campus{display:inline-flex;align-items:center;gap:.4em;}"
      + ".pk-campus select{font-family:inherit;font-size:.95em;border:1px solid #C8BFAD;border-radius:3px;background:#fff;color:#211C16;padding:.1em .3em;}"
      /* estetään päällekkäisyys sivujen omien tarttuvien palkkien kanssa */
      + ".printbar{top:86px;}"
      + ".tabs{top:64px !important;}"
      + ".topbar{top:64px !important;}"
      + ".side{top:64px !important;height:auto !important;max-height:calc(100vh - 64px);}"
      + "@media (max-width:860px){"
      + ".pk-toggle{display:block;}"
      + ".pk-links{display:none;flex-basis:100%;flex-direction:column;align-items:stretch;margin-top:3px;}"
      + ".pk-links.pk-show{display:flex;}"
      + ".pk-link{padding:.6em .4em;border-bottom:1px solid #D8D0C0;border-radius:0;}"
      + ".pk-link.pk-active{border-bottom-color:#CE3F1B;}"
      + "}"
      + "@media print{.pk-nav{display:none;}.printbar{top:18px;}}";
    var st=document.createElement("style"); st.id="pk-nav-style";
    st.appendChild(document.createTextNode(css));
    document.head.appendChild(st);

    var cur=(location.pathname.split("/").pop() || "index.html");
    if(cur === "") cur = "index.html";

    var links="", i, act;
    for(i=0;i<PAGES.length;i++){
      act = (PAGES[i].f === cur) ? " pk-active" : "";
      links += '<a class="pk-link'+act+'" href="'+PAGES[i].f+'">'+PAGES[i].t+'</a>';
    }

    var here=locate(cur);
    var crumb = '<a href="index.html">Koti</a>';
    if(here){
      crumb += '<span class="pk-sep">&#9656;</span><span>'+here.s+'</span>'
             + '<span class="pk-sep">&#9656;</span><b>'+here.t+'</b>';
    } else if(cur !== "index.html"){
      crumb += '<span class="pk-sep">&#9656;</span><b>'+(document.title || cur).split("—")[0].trim()+'</b>';
    } else {
      crumb += '<span class="pk-sep">&#9656;</span><b>Etusivu</b>';
    }
    crumb += '<span class="pk-sep">&#9656;</span><a href="kartta.html">Näytä kartta</a>';

    // Kampusvalitsin (jos jaettu tietolähde on käytettävissä)
    var campusSel="";
    if(window.PAJA && PAJA.campuses){
      var cs=PAJA.campuses(), cur=PAJA.getCampus(), o="", i;
      for(i=0;i<cs.length;i++){
        o+='<option value="'+cs[i].code+'"'+(cs[i].code===cur?" selected":"")
         + (cs[i].active?"":" disabled")+'>'+cs[i].name+(cs[i].active?"":" (tulossa)")+'</option>';
      }
      campusSel='<span class="pk-sep">&#9656;</span><label class="pk-campus">Kampus '
        + '<select id="pkCampus">'+o+'</select></label>';
    }
    crumb += campusSel;

    var bar=document.createElement("header");
    bar.className="pk-nav";
    bar.innerHTML =
        '<div class="pk-inner">'
      +   '<a class="pk-brand" href="index.html">Paja<span>kuutio</span></a>'
      +   '<button class="pk-toggle" id="pkToggle" aria-label="Avaa valikko">&#9776;</button>'
      +   '<nav class="pk-links" id="pkLinks" aria-label="Sivuston navigointi">'+links+'</nav>'
      + '</div>'
      + '<div class="pk-crumb"><div class="pk-crumb-in" aria-label="Sijaintisi">'+crumb+'</div></div>';
    document.body.insertBefore(bar, document.body.firstChild);

    var cs=document.getElementById("pkCampus");
    if(cs){ cs.addEventListener("change", function(){
      if(window.PAJA){ PAJA.setCampus(cs.value); location.reload(); }
    }); }

    var tg=document.getElementById("pkToggle");
    if(tg){ tg.addEventListener("click", function(){
      document.getElementById("pkLinks").classList.toggle("pk-show");
    }); }
  }

  if(document.body){ inject(); }
  else { document.addEventListener("DOMContentLoaded", inject); }
})();
