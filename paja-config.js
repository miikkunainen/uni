/* ============================================================
   PAJA-CONFIG — näkyvyysasetukset
   ============================================================
   TÄSSÄ PÄÄTETÄÄN, MIKÄ TYÖKALU NÄKYY JA MIKÄ EI.

   true  = näkyy portaalissa, navipalkissa ja kartassa
   false = piilotettu kaikkialta (tiedosto jää paikalleen)

   Muokkaa joko suoraan tästä tiedostosta tai helpommin
   hallinta.html-sivulla, joka kirjoittaa tämän tiedoston
   puolestasi. Korvaa tiedosto silloin uudella versiolla.
   ============================================================ */
(function(){
  "use strict";

  var VISIBLE={
    /* --- Opiskelijan työkalut --- */
    orientaatio:   true,   // Orientaatiokurssi (opiskelijan sovellus)
    kurssi:        true,   // Ajokorttiputki
    tyolupa:       true,   // Työlupa
    app:           true,   // Paja-app

    /* --- Turvallisuus --- */
    kemia:         true,   // Kemikaalienhallinta
    kone:          true,   // Konerekisteri
    herate:        true,   // Herätteet ja loki

    /* --- Hallinta --- */
    mhks:          true,   // MHKS materiaali ja kustannus
    seuranta:      true,   // Seuranta

    /* --- Tausta ja ymmärrys --- */
    peli:          false,  // Pajapeli
    kuutio:        false,  // Pajakuutio-malli
    kartta:        false,  // Hallinnan kartta
    perusta:       true,   // Pajatoiminnan perusta

    /* --- Yleiset --- */
    sivukartta:    true,   // Sivustokartta
    asenna:        true,   // Asenna puhelimeen
    tietosuoja:    true    // Tietosuoja ja GDPR
  };

  /* Yksittäisten työkalujen sisäiset osiot.
     Näillä karsitaan näkymää vielä tarkemmin. */
  var SECTIONS={
    naytaHerateNostot:  true,   // herätenostot portaalin etusivulla
    naytaOhjelma:       true,   // päivän ohjelma portaalissa
    naytaKemikaaliKooste: true, // kemikaalinostot portaalissa
    naytaAsennusohje:   true    // asennusohje puhelimelle
  };

  /* Tiedosto, jota kukin avain vastaa. Älä muuta ilman syytä. */
  var FILES={
    orientaatio:"orientaatio.html", kurssi:"syksyn_orientaatiokurssi.html",
    tyolupa:"turvallisuus_ja_tyolupa.html", app:"paja_app.html",
    kemia:"paja_kemikaalit.html", kone:"paja_konerekisteri.html",
    herate:"paja_herateloki.html", mhks:"mhks_app.html",
    seuranta:"paja_seuranta.html", peli:"pajapeli_digital_twin.html",
    kuutio:"pajakuutio_esikatselu.html", kartta:"pajakuutio_hallinnan_kartta.html",
    perusta:"pajatoiminnan_perusta.html", sivukartta:"kartta.html",
    asenna:"asenna.html", tietosuoja:"tietosuoja.html"
  };

  /* Paikallinen esikatselu: hallinta.html tallentaa tähän,
     jolloin muutokset näkyvät heti ilman tiedoston korvaamista. */
  var STORE="paja_nakyvyys_v1";
  function local(){
    try{ var s=localStorage.getItem(STORE); return s?JSON.parse(s):null; }catch(e){ return null; }
  }
  function merged(){
    var o={},k,l=local();
    for(k in VISIBLE){ if(VISIBLE.hasOwnProperty(k)) o[k]=VISIBLE[k]; }
    if(l&&l.visible){ for(k in l.visible){ if(l.visible.hasOwnProperty(k)) o[k]=!!l.visible[k]; } }
    return o;
  }
  function mergedSections(){
    var o={},k,l=local();
    for(k in SECTIONS){ if(SECTIONS.hasOwnProperty(k)) o[k]=SECTIONS[k]; }
    if(l&&l.sections){ for(k in l.sections){ if(l.sections.hasOwnProperty(k)) o[k]=!!l.sections[k]; } }
    return o;
  }

  window.PAJACFG={
    version:"1.0",
    keys:function(){ var a=[],k,v=merged(); for(k in v){ if(v.hasOwnProperty(k)) a.push(k); } return a; },
    on:function(key){ var v=merged(); return v[key]!==false; },
    onFile:function(file){
      var v=merged(),k;
      for(k in FILES){ if(FILES.hasOwnProperty(k) && FILES[k]===file) return v[k]!==false; }
      return true;   // tuntematon tiedosto näkyy oletuksena
    },
    section:function(key){ var s=mergedSections(); return s[key]!==false; },
    file:function(key){ return FILES[key]||""; },
    files:function(){ var o={},k; for(k in FILES){ if(FILES.hasOwnProperty(k)) o[k]=FILES[k]; } return o; },
    defaults:function(){ var o={},k; for(k in VISIBLE){ if(VISIBLE.hasOwnProperty(k)) o[k]=VISIBLE[k]; } return o; },
    defaultSections:function(){ var o={},k; for(k in SECTIONS){ if(SECTIONS.hasOwnProperty(k)) o[k]=SECTIONS[k]; } return o; },
    saveLocal:function(vis,sec){ try{ localStorage.setItem(STORE,JSON.stringify({visible:vis,sections:sec})); return true; }catch(e){ return false; } },
    clearLocal:function(){ try{ localStorage.removeItem(STORE); }catch(e){} },
    hasLocal:function(){ return !!local(); }
  };
})();
