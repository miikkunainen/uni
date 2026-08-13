/* ============================================================
   PAJA-DATA — yhteinen tietolähde kaikille työkaluille
   ============================================================
   Liitä jokaiseen sivuun ENNEN muita skriptejä:
     <script src="paja-data.js"></script>

   TÄRKEÄÄ: koneet, tilat, jakeet, suojaimet ja roolit
   määritellään VAIN tässä tiedostossa. Älä kopioi niitä
   sovelluksiin — muuten tieto eriytyy kahteen paikkaan.

   Kampuskohtainen paikkakoodi:
     KAMPUS-TILA-KAAPPI-LAATIKKO   esim. ARA-PUU-K3-L2
   ============================================================ */
(function(){
  "use strict";

  // ---------- KAMPUKSET ----------
  var CAMPUSES=[
    { code:"ARA", name:"Arabia",
      tagline:"Urbaani kulttuurikampus — ideoiden ja tarinoiden areena",
      desc:"Jatkaa Arabian alueen taideteollista historiaa ja luo rohkeasti uutta.",
      active:true },
    { code:"MYY", name:"Myyrmäki",
      tagline:"Tekniikka, digitaaliset ratkaisut ja luova ajattelu",
      desc:"Ideat kehittyvät kokeiluiksi, prototyypeiksi ja toimiviksi kokonaisuuksiksi. Projektipohjaista opiskelua tiiviissä yritysyhteistyössä. Alusta uusille teknologioille ja kestäville ratkaisuille.",
      active:false },
    { code:"MYP", name:"Myllypuro",
      tagline:"Monialainen hyvinvoinnin, liiketalouden, tekniikan ja rakentamisen kampus",
      desc:"Koulutus, kehittäminen ja työelämä kohtaavat arjessa.",
      active:false }
  ];

  // ---------- TILAT ----------
  // Nimi on kanoninen: käytä täsmälleen tätä kirjoitusasua kaikkialla.
  var ROOMS=[
    { campus:"ARA", code:"PUU", name:"Puustudio" },
    { campus:"ARA", code:"PVA", name:"Puuvarasto" },
    { campus:"ARA", code:"CNC", name:"Puu-CNC" },
    { campus:"ARA", code:"MET", name:"Metallistudio" },
    { campus:"ARA", code:"MVA", name:"Metallivarasto" },
    { campus:"ARA", code:"PRO", name:"Protostudio" },
    { campus:"ARA", code:"LAS", name:"CO2 Laser" },
    { campus:"ARA", code:"TDT", name:"3D-tulostus" },
    { campus:"ARA", code:"JAL", name:"Jalometallistudio" },
    { campus:"ARA", code:"KUV", name:"Kuvanveisto" },
    { campus:"ARA", code:"MAA", name:"Maalaamo" },
    { campus:"ARA", code:"ESI", name:"Esikäsittelytila" },
    { campus:"ARA", code:"YVA", name:"Yleisvarasto" },
    { campus:"ARA", code:"HAK", name:"Häkkitila" },
    { campus:"ARA", code:"VAL", name:"Valvomo" },
    { campus:"ARA", code:"YLE", name:"Yleiset tilat" }
  ];

  // ---------- SUOJAIMET ----------
  var PPE=["Silmäsuojaimet","Kuulosuojaimet","Turvajalkineet","Työkäsineet",
           "Hengityssuojain","Visiiri","Hitsausmaski","Palosuojavaatetus","Kohdepoisto"];

  // ---------- VAARALUOKAT ----------
  var HAZ={1:"Matala",2:"Kohtalainen",3:"Keskitaso",4:"Korkea",5:"Erittäin korkea"};

  // ---------- ROOLIT ----------
  var ROLES=[
    { id:"opiskelija",   name:"Opiskelija" },
    { id:"lehtori",      name:"Lehtori" },
    { id:"pajamestari",  name:"Pajamestari" },
    { id:"esimies",      name:"Esimies" },
    { id:"siivooja",     name:"Siivooja" },
    { id:"kiinteisto",   name:"Kiinteistö" },
    { id:"vierailija",   name:"Vierailija" }
  ];

  // ---------- JÄTEJAKEET ----------
  var FRACTIONS=[
    { id:"kartonki",     name:"Kartonki",         color:"#B5793A", note:"Litistetyt pahvit → 350 l → ulkopuristin." },
    { id:"muovi",        name:"Muovipakkaus",     color:"#4F6E92", note:"Puhtaat muovipakkaukset." },
    { id:"seka",         name:"Sekajäte",         color:"#4A4540", note:"Se mikä ei kelpaa muihin jakeisiin." },
    { id:"vaara",        name:"Vaarallinen jäte", color:"#CE3F1B", note:"Liuottimet, maalit, öljyt ja ÖLJYRÄTIT. Jalalla avattava metalliastia." },
    { id:"metalli",      name:"Metallilastut",    color:"#9AA0A6", note:"Sorvin ja jyrsimen lastut, hitsausjäte." },
    { id:"uusiometalli", name:"Uusiometalli",     color:"#6B7785", note:"Puhtaat metallipalat uusiokäyttöön." },
    { id:"retake",       name:"RETAKE-uusio",     color:"#5E8C5A", note:"Uudelleenkäyttöön kelpaava materiaali ja aihiot." },
    { id:"savi",         name:"Savi",             color:"#B07A55", note:"Keramiikka- ja savijäte." },
    { id:"kipsi",        name:"Kipsi",            color:"#D9CFB8", note:"Kipsijäte — EI viemäriin." },
    { id:"bio",          name:"Biojäte",          color:"#7A8C4A", note:"Ruokajäte." }
  ];

  // ---------- KONEET ----------
  // Kaikki koneet kaikilta kampuksilta. Tila-kenttä käyttää ROOMS-nimiä.
  var MACHINES=[
    {id:"m_vannesaha",campus:"ARA",name:"Vannesaha",room:"Puustudio",haz:3,permit:true,loc:"ARA-PUU-A1",
     ppe:["Silmäsuojaimet","Kuulosuojaimet","Turvajalkineet"],
     use:"Aihion sahaus muotoon, kaarevat leikkaukset, halkaisu.",
     start:["Tarkista terän kunto ja kireys.","Säädä yläohjain työkappaleen paksuuden mukaan (n. 5 mm yli).","Kytke purunpoisto päälle.","Käynnistä ja anna terän saavuttaa täysi nopeus."],
     stop:["Anna terän pysähtyä itsestään — älä jarruta.","Katkaise virta ja purunpoisto.","Harjaa pöytä ja alusta."],
     rules:["Työnnä kapeat kappaleet työntökepillä.","Pidä kädet terälinjan sivussa, ei terän edessä.","Älä poista purua terän pyöriessä.","Ilmoita katkennut tai tylsä terä heti."],
     clean:"Harjaa pöytä, imuroi lastut koneen alta ja lattialta.",
     maint_student:["Pöydän ja ohjaimen puhdistus","Purusäiliön tyhjennys ohjeen mukaan"],
     maint_staff:["Terän vaihto ja kireyden säätö","Ohjainlaakereiden säätö","Pyörien puhdistus"],status:"luonnos"},

    {id:"m_oikohoyla",campus:"ARA",name:"Oiko- ja tasohöylä",room:"Puustudio",haz:4,permit:true,loc:"ARA-PUU-A2",
     ppe:["Silmäsuojaimet","Kuulosuojaimet","Turvajalkineet","Hengityssuojain"],
     use:"Kappaleen suoristus ja mitallistus ennen jatkotyöstöä.",
     start:["Tarkista teräsuojan toiminta.","Säädä lastunotto (max 2 mm).","Kytke purunpoisto — pakollinen.","Käynnistä ja odota täysi kierrosnopeus."],
     stop:["Odota teräakselin pysähtyminen.","Katkaise virta ja purunpoisto.","Poista lastut ja tarkista suojan asento."],
     rules:["Käytä AINA työntöpalikoita — kädet eivät ylitä teräakselia.","Vain oikaistu pinta ohjainta vasten.","Älä höylää alle 300 mm kappaletta.","Älä poista suojaa."],
     clean:"Poista lastut pöydiltä ja koneen alta, tarkista purunpoiston toiminta.",
     maint_student:["Pöytien pyyhintä","Lastujen poisto"],
     maint_staff:["Terien vaihto ja teroitus","Pöytien suoruuden tarkistus","Syöttötelojen huolto"],status:"luonnos"},

    {id:"m_katkaisusaha",campus:"ARA",name:"Katkaisusaha",room:"Puustudio",haz:3,permit:true,loc:"ARA-PUU-A3",
     ppe:["Silmäsuojaimet","Kuulosuojaimet","Turvajalkineet"],
     use:"Kappaleiden katkaisu määrämittaan, kulmakatkaisut.",
     start:["Tarkista terän kunto ja suojan liike.","Aseta kulma ja lukitse.","Kytke purunpoisto."],
     stop:["Anna terän pysähtyä ennen nostoa.","Katkaise virta.","Harjaa pöytä ja lattia."],
     rules:["Pidä kappale tiukasti ohjainta vasten koko sahauksen ajan.","Kädet turva-alueen ulkopuolella.","Älä sahaa liian lyhyttä kappaletta käsin kiinni pitäen — käytä puristinta."],
     clean:"Harjaa pöytä ja sahan alusta, tyhjennä puruastia.",
     maint_student:["Pöydän puhdistus","Puruastian tyhjennys"],
     maint_staff:["Terän vaihto","Kulma-asteikon kalibrointi"],status:"luonnos"},

    {id:"m_pyorosaha",campus:"ARA",name:"Tarkkuuspyörösaha",room:"Puustudio",haz:4,permit:true,loc:"ARA-PUU-A4",
     ppe:["Silmäsuojaimet","Kuulosuojaimet","Turvajalkineet"],
     use:"Tarkka halkaisu ja levyjen sahaus.",
     start:["Varmista halkaisuveitsi ja teräsuojus paikoillaan.","Säädä terän korkeus (n. 5 mm yli materiaalin).","Aseta ja lukitse ohjain.","Kytke purunpoisto."],
     stop:["Odota terän pysähtyminen.","Laske terä alas ja katkaise virta.","Imuroi lastut."],
     rules:["Käytä työntökeppiä kapeissa halkaisuissa.","Älä koskaan kurota terän yli.","Takapotkuvaara: seiso terälinjan sivussa.","Halkaisuveistä ei saa poistaa."],
     clean:"Imuroi lastut pöydältä ja koneen sisältä, tarkista suojukset.",
     maint_student:["Pöydän puhdistus","Lastujen imurointi"],
     maint_staff:["Terän vaihto","Ohjaimen suoruuden säätö","Halkaisuveitsen linjaus"],status:"luonnos"},

    {id:"m_nauhahioma",campus:"ARA",name:"Nauhahiomakone",room:"Puustudio",haz:2,permit:false,loc:"ARA-PUU-B1",
     ppe:["Silmäsuojaimet","Hengityssuojain","Kuulosuojaimet"],
     use:"Muodon hionta ja reunojen viimeistely.",
     start:["Tarkista nauhan kunto ja kireys.","Säädä vaste lähelle nauhaa (n. 2 mm).","Kytke pölynpoisto."],
     stop:["Anna nauhan pysähtyä.","Katkaise virta ja pölynpoisto.","Imuroi hiomapöly."],
     rules:["Tue kappale aina vastetta vasten.","Hio nauhan liikesuuntaan.","Pidä sormet pois nauhan reunasta.","Älä hio metallia samalla nauhalla kuin puuta."],
     clean:"Imuroi hiomapöly koneesta ja lattialta — pöly on terveydelle haitallista.",
     maint_student:["Pölyn imurointi","Vasteen puhdistus"],
     maint_staff:["Nauhan vaihto ja keskitys","Pölynpoiston tarkistus"],status:"luonnos"},

    {id:"m_ylajyrsin",campus:"ARA",name:"Yläjyrsin / pöytäjyrsin",room:"Puustudio",haz:5,permit:true,loc:"ARA-PUU-B2",
     ppe:["Silmäsuojaimet","Kuulosuojaimet","Hengityssuojain"],
     use:"Urat, profiilit, reunojen muotoilu.",
     start:["Vain valvotusti.","Tarkista terän kiinnitys ja kunto.","Säädä ohjain ja suojat, aseta alastyöntimet.","Kytke purunpoisto."],
     stop:["Odota terän täysi pysähtyminen.","Katkaise virta.","Poista lastut ja pura asetteet."],
     rules:["Vain pajamestarin valvonnassa (vaaraluokka 5).","Syötä aina terää vastaan.","Käytä syöttölaitetta tai painimia — ei paljain käsin lähellä terää.","Kiinnitä kappale tukevasti."],
     clean:"Imuroi lastut, palauta asetteet alkuperäiseen tilaan.",
     maint_student:["Pöydän puhdistus"],
     maint_staff:["Terien vaihto","Karan korkeussäätö","Suojien kunnon tarkistus"],status:"luonnos"},

    {id:"m_puusorvi",campus:"ARA",name:"Puusorvi",room:"Puustudio",haz:4,permit:true,loc:"ARA-PUU-B3",
     ppe:["Silmäsuojaimet","Visiiri","Kuulosuojaimet","Hengityssuojain"],
     use:"Pyörähdyskappaleiden sorvaus puusta.",
     start:["TÄYDENNÄ konetta vasten."],stop:["TÄYDENNÄ konetta vasten."],
     rules:["Visiiri pakollinen — kappale voi irrota.","Tarkista kappaleen kiinnitys ja halkeamat.","Vastetuki lähelle kappaletta."],
     clean:"Imuroi lastut ja pöly.",maint_student:["Lastujen poisto"],
     maint_staff:["Terien teroitus","Laakerien tarkistus"],status:"luonnos"},

    {id:"m_leveanauha",campus:"ARA",name:"Leveänauhahiomakone",room:"Puustudio",haz:3,permit:true,loc:"ARA-PUU-B4",
     ppe:["Silmäsuojaimet","Kuulosuojaimet","Hengityssuojain"],
     use:"Levyjen ja liimalevyjen tasohionta.",
     start:["TÄYDENNÄ konetta vasten."],stop:["TÄYDENNÄ konetta vasten."],
     rules:["Pölynpoisto pakollinen — palovaara.","Älä hio liian ohutta kappaletta.","Syötä kappale suoraan."],
     clean:"Imuroi hiomapöly koneesta ja lattialta.",maint_student:["Pölyn imurointi"],
     maint_staff:["Nauhan vaihto","Telojen puhdistus"],status:"luonnos"},

    {id:"m_pylvaspora",campus:"ARA",name:"Pylväsporakone",room:"Metallistudio",haz:3,permit:true,loc:"ARA-MET-A1",
     ppe:["Silmäsuojaimet","Kuulosuojaimet","Turvajalkineet"],
     use:"Tarkka poraus, kierteytyksen alkureiät, sarjatyö.",
     start:["Valitse materiaalille oikea terä ja kierrosnopeus.","Kiinnitä kappale pöytään tai ruuvipenkkiin.","Säädä poraussyvyys ja tarkista istukan kireys.","Poista istukka-avain."],
     stop:["Nosta terä ylös ja katkaise virta.","Anna karan pysähtyä.","Harjaa lastut ja pyyhi pöytä."],
     rules:["ÄLÄ käytä käsineitä pyörivän karan lähellä — kiertymisvaara.","Kappale on aina kiinnitettävä, ei käsin pidellen.","Istukka-avain pois heti kiristyksen jälkeen.","Käytä leikkuunestettä metallia porattaessa."],
     clean:"Harjaa lastut (ei käsin), pyyhi pöytä, siivoa leikkuuneste.",
     maint_student:["Pöydän puhdistus","Lastujen poisto harjalla"],
     maint_staff:["Istukan huolto","Karan laakerointi","Terien teroitus"],status:"luonnos",
     extra:"Kierteytyksen alkureikä: katso porakokotaulukko (esim. M8 × 1,25 → 6,8 mm)."},

    {id:"m_sorvi",campus:"ARA",name:"Metallisorvi",room:"Metallistudio",haz:5,permit:true,loc:"ARA-MET-A2",
     ppe:["Silmäsuojaimet","Kuulosuojaimet","Turvajalkineet"],
     use:"Pyörähdyskappaleiden työstö, sorvaus, kierteitys.",
     start:["Vain valvotusti.","Kiinnitä kappale istukkaan ja tarkista keskitys.","POISTA ISTUKKA-AVAIN.","Aseta terä oikeaan korkeuteen, valitse kierrosnopeus.","Tarkista suojalasin asento."],
     stop:["Vedä terä irti, pysäytä kara.","Odota täysi pysähtyminen ennen mittausta.","Katkaise virta ja siivoa lastut koukulla."],
     rules:["Vain pajamestarin valvonnassa (vaaraluokka 5).","Ei käsineitä, ei löysiä vaatteita, ei koruja, hiukset kiinni.","Istukka-avain poistetaan aina heti.","Älä mittaa koneen käydessä.","Lastut poistetaan koukulla, ei käsin."],
     clean:"Lastut astiaan koukulla, pyyhi johteet ja öljyä ohjeen mukaan.",
     maint_student:["Lastujen poisto","Johteiden pyyhintä"],
     maint_staff:["Johteiden voitelu","Terien teroitus","Istukan tarkistus ja keskitys"],status:"luonnos"},

    {id:"m_jyrsin_met",campus:"ARA",name:"Metallijyrsin",room:"Metallistudio",haz:5,permit:true,loc:"ARA-MET-A3",
     ppe:["Silmäsuojaimet","Kuulosuojaimet","Turvajalkineet"],
     use:"Tasopintojen ja urien koneistus metalliin.",
     start:["Vain valvotusti.","Kiinnitä kappale tukevasti ruuvipenkkiin.","Valitse terä ja kierrosnopeus materiaalin mukaan.","Aseta nollapisteet."],
     stop:["Vedä terä irti, pysäytä kara.","Katkaise virta.","Poista lastut harjalla."],
     rules:["Vain pajamestarin valvonnassa.","Ei käsineitä pyörivän terän lähellä.","Kiinnitys tarkistetaan ennen jokaista ajoa.","Käytä leikkuunestettä."],
     clean:"Harjaa lastut, pyyhi pöytä ja johteet.",
     maint_student:["Lastujen poisto","Pöydän pyyhintä"],
     maint_staff:["Johteiden voitelu","Terien vaihto","Nollapisteiden tarkistus"],status:"luonnos"},

    {id:"m_metallivannesaha",campus:"ARA",name:"Metallivannesaha (pystymalli)",room:"Metallistudio",haz:3,permit:true,loc:"ARA-MET-A4",
     ppe:["Silmäsuojaimet","Kuulosuojaimet","Turvajalkineet"],
     use:"Metalliprofiilien ja tankojen katkaisu.",
     start:["TÄYDENNÄ konetta vasten."],stop:["TÄYDENNÄ konetta vasten."],
     rules:["Kiinnitä kappale tukevasti.","Anna terän leikata omaa vauhtiaan.","Käytä leikkuunestettä."],
     clean:"Poista lastut, tyhjennä lastuastia.",maint_student:["Lastujen poisto"],
     maint_staff:["Terän vaihto","Nesteen vaihto"],status:"luonnos"},

    {id:"m_metallicnc",campus:"ARA",name:"Metalli-CNC",room:"Metallistudio",haz:5,permit:true,loc:"ARA-MET-A5",
     ppe:["Silmäsuojaimet","Kuulosuojaimet","Turvajalkineet"],
     use:"CNC-koneistus metalliin.",
     start:["Vain valvotusti. TÄYDENNÄ konetta vasten."],stop:["TÄYDENNÄ konetta vasten."],
     rules:["Vain pajamestarin valvonnassa.","Ohjelma tarkistetaan ennen ajoa.","Suojaovet kiinni ajon aikana."],
     clean:"Imuroi lastut, pyyhi johteet.",maint_student:["Lastujen poisto"],
     maint_staff:["Johteiden voitelu","Työkalunvaihto"],status:"luonnos"},

    {id:"m_mig",campus:"ARA",name:"MIG-hitsaus",room:"Metallistudio",haz:5,permit:true,loc:"ARA-MET-B1",
     ppe:["Hitsausmaski","Työkäsineet","Palosuojavaatetus","Kohdepoisto"],
     use:"Teräsrakenteiden liittäminen, tulppahitsaus.",
     start:["Vain valvotusti, omassa hitsausblokissa.","Kytke kohdepoisto ja tarkista suojakaasun virtaus.","Poista syttyvät materiaalit lähialueelta.","Varmista sammutin ulottuvilla.","Tarkista maadoituskaapelin kiinnitys."],
     stop:["Sulje kaasupullon venttiili.","Anna kappaleen jäähtyä merkityllä alueella.","Tarkista ettei kytemistä ole — jälkivartiointi.","Katkaise virta ja kohdepoisto."],
     rules:["Vain pajamestarin valvonnassa (vaaraluokka 5).","Silmät ja iho suojattava kokonaan — valokaari polttaa.","Kuuma metalli näyttää kylmältä: käytä pihtejä ja merkitse kuuma kappale.","Suojakaasu voi syrjäyttää hapen — ilmanvaihto päällä."],
     clean:"Kuona ja hitsausjäte metallijakeeseen, alue siistiksi, maski paikalleen.",
     maint_student:["Työalueen siivous","Kuonan poisto"],
     maint_staff:["Langansyötön huolto","Suuttimen vaihto","Kaasupullon vaihto"],status:"luonnos"},

    {id:"m_kulmahioma",campus:"ARA",name:"Kulmahiomakone (rälläkkä)",room:"Metallistudio",haz:4,permit:true,loc:"ARA-MET-B2",
     ppe:["Silmäsuojaimet","Visiiri","Kuulosuojaimet","Työkäsineet"],
     use:"Katkaisu, hionta, jäysteenpoisto metallista.",
     start:["Valitse työhön oikea laikka (katkaisu vs. hionta).","Tarkista laikan kunto — ei halkeamia.","Varmista suojus paikallaan ja oikeassa asennossa.","Kiinnitä kappale."],
     stop:["Anna laikan pysähtyä ennen laskemista.","Irrota pistoke.","Tarkista ettei kipinäalueella kyte."],
     rules:["Suojusta ei saa poistaa.","Kipinät suunnataan poispäin itsestä, muista ja syttyvistä.","Katkaisulaikalla ei hiota sivulla.","Anna laikan saavuttaa täysi nopeus ennen kosketusta."],
     clean:"Kipinäalue ja lattia siistiksi, syttyvät pois lähistöltä.",
     maint_student:["Työalueen siivous"],
     maint_staff:["Laikan vaihto","Suojuksen kunto","Hiiliharjojen tarkistus"],status:"luonnos"},

    {id:"m_prassi",campus:"ARA",name:"Prässi",room:"Metallistudio",haz:5,permit:true,loc:"ARA-MET-B3",
     ppe:["Silmäsuojaimet","Työkäsineet","Turvajalkineet"],
     use:"Muotopuristus, laakerien asennus, pakotus.",
     start:["Vain valvotusti.","Tarkista muotin kiinnitys ja tuenta.","Varmista ettei puristusalueella ole käsiä eikä työkaluja."],
     stop:["Palauta mäntä yläasentoon.","Poista muotti ja järjestä paikalleen."],
     rules:["Vain pajamestarin valvonnassa (vaaraluokka 5).","Kädet eivät koskaan puristusalueella.","Kappale on tuettava — sinkoutumisvaara.","Älä ylitä koneen nimelliskuormaa."],
     clean:"Pyyhi öljyt, palauta muotit merkityille paikoilleen.",
     maint_student:["Muottien palautus paikoilleen"],
     maint_staff:["Hydrauliikan tarkistus","Muottien kunto"],status:"luonnos"},

    {id:"m_ahjo",campus:"ARA",name:"Ahjo ja taonta",room:"Metallistudio",haz:4,permit:true,loc:"ARA-MET-B4",
     ppe:["Silmäsuojaimet","Työkäsineet","Palosuojavaatetus","Kohdepoisto"],
     use:"Metallin kuumamuokkaus, taonta, työvälineiden valmistus.",
     start:["Vain valvotusti, kuumatyölupa.","Tarkista ilmanvaihto ja kohdepoisto.","Varaa vesisammutus ja hiekka ulottuville.","Poista syttyvät materiaalit."],
     stop:["Anna kappaleiden jäähtyä merkityllä alueella.","Sammuta ahjo ohjeen mukaan.","Jälkivartiointi: varmista ettei kytemistä."],
     rules:["Vain pajamestarin valvonnassa.","Kuuma metalli näyttää kylmältä — käytä aina pihtejä.","Merkitse kuumat kappaleet.","Ei synteettisiä vaatteita — sulavat iholle."],
     clean:"Hilse ja kuona astiaan, alue siistiksi, pihdit paikoilleen.",
     maint_student:["Työalueen siivous","Työkalujen palautus"],
     maint_staff:["Ahjon huolto","Alasimen kunto"],status:"luonnos"},

    {id:"m_polttopilli",campus:"ARA",name:"Polttopilli ja kaasut",room:"Metallistudio",haz:5,permit:true,loc:"ARA-MET-B5",
     ppe:["Silmäsuojaimet","Työkäsineet","Palosuojavaatetus"],
     use:"Kuumatyö, juotto ja lämmitys.",
     start:["Vain valvotusti, kuumatyölupa.","Tarkista letkut ja liitokset vuotojen varalta.","Varmista sammutin ja ilmanvaihto."],
     stop:["Sulje pullojen venttiilit.","Tyhjennä letkut ohjeen mukaan.","Jälkivartiointi kytemisen varalta."],
     rules:["Kaasupullot kiinnitettävä telineeseen — kaatumisvaara.","Ei rasvaa happiliitoksiin.","Merkinnät ovissa ja tilassa oltava kunnossa."],
     clean:"Alue siistiksi, letkut kelalle, pullot lukittuna telineeseen.",
     maint_student:["Työalueen siivous"],
     maint_staff:["Letkujen ja liitosten tarkistus","Pullojen vaihto"],status:"luonnos"},

    {id:"m_tormek",campus:"ARA",name:"Tormek-teroituskone",room:"Metallistudio",haz:2,permit:false,loc:"ARA-MET-C1",
     ppe:["Silmäsuojaimet"],
     use:"Talttojen ja terien vesijäähdytteinen teroitus.",
     start:["Täytä vesiallas merkkiin asti.","Kiinnitä terä oikeaan jigiin.","Aseta kulma ja tarkista kivi."],
     stop:["Katkaise virta.","Tyhjennä ja kuivaa vesiallas.","Kuivaa teroitettu terä huolellisesti."],
     rules:["Vesi on vaihdettava — seisova vesi ruostuttaa.","Käytä oikeaa jigiä terätyypille.","Älä paina liikaa — kivi kuluu epätasaisesti."],
     clean:"Tyhjennä vesi, pyyhi kone, palauta jigit paikoilleen.",
     maint_student:["Veden vaihto","Jigien palautus"],
     maint_staff:["Kiven oikaisu","Nahkalaikan hoito"],status:"luonnos"},

    {id:"m_engl_pyora",campus:"ARA",name:"Englannin pyörä",room:"Metallistudio",haz:2,permit:false,loc:"ARA-MET-C2",
     ppe:["Silmäsuojaimet","Työkäsineet"],
     use:"Ohutlevyn muotoilu kaareviksi pinnoiksi.",
     start:["Valitse alaraudan säde muotoilun mukaan.","Säädä puristus kevyeksi ja lisää vähitellen."],
     stop:["Löysää puristus.","Palauta alaraudat paikoilleen."],
     rules:["Sormet pois telojen välistä.","Lisää painetta asteittain — ei kerralla.","Työstä levyä useaan suuntaan tasaisen muodon saamiseksi."],
     clean:"Pyyhi telat, palauta alaraudat.",maint_student:["Telojen pyyhintä"],
     maint_staff:["Telojen kunto ja voitelu"],status:"luonnos"},

    {id:"m_smirgel",campus:"ARA",name:"Smirgel / kivihiontalaite",room:"Metallistudio",haz:3,permit:true,loc:"ARA-MET-C3",
     ppe:["Silmäsuojaimet","Visiiri","Kuulosuojaimet"],
     use:"Terien ja metalliosien hionta ja jäysteenpoisto.",
     start:["TÄYDENNÄ konetta vasten."],stop:["TÄYDENNÄ konetta vasten."],
     rules:["Tarkista laikan kunto ja vasteen etäisyys (max 3 mm).","Visiiri pakollinen.","Älä hio laikan sivulla.","Jäähdytä kappaletta vedellä."],
     clean:"Harjaa hiomapöly, tyhjennä vesiastia.",maint_student:["Alueen siivous"],
     maint_staff:["Laikan oikaisu ja vaihto","Vasteen säätö"],status:"luonnos"},

    {id:"m_tahko",campus:"ARA",name:"Tahko ja teroituspiste",room:"Metallistudio",haz:2,permit:false,loc:"ARA-MET-C4",
     ppe:["Silmäsuojaimet"],
     use:"Terien teroitus ja hienosäätö.",
     start:["TÄYDENNÄ konetta vasten."],stop:["TÄYDENNÄ konetta vasten."],
     rules:["Käytä oikeaa kulmaa ja jigiä.","Jäähdytä terä — ylikuumeneminen pilaa karkaisun."],
     clean:"Tyhjennä vesi, pyyhi laite.",maint_student:["Veden vaihto"],
     maint_staff:["Kiven oikaisu"],status:"luonnos"},

    {id:"m_imuri",campus:"ARA",name:"Korkeapaineimuri",room:"Metallistudio",haz:2,permit:false,loc:"ARA-MET-C5",
     ppe:["Hengityssuojain"],
     use:"Lastujen ja pölyn poisto koneilta ja lattialta.",
     start:["Tarkista pussin ja suodattimen tila.","Valitse oikea suulake."],
     stop:["Sammuta, kelaa letku, palauta paikalleen."],
     rules:["Älä imuroi kuumia lastuja tai kytevää materiaalia — palovaara.","Älä imuroi nesteitä ilman soveltuvaa laitetta."],
     clean:"Tyhjennä pussi, puhdista suodatin.",maint_student:["Pussin tyhjennys"],
     maint_staff:["Suodattimen vaihto"],status:"luonnos"},

    {id:"m_hiekkapuhallus",campus:"ARA",name:"Hiekkapuhallus",room:"Metallivarasto",haz:3,permit:true,loc:"ARA-MVA-A1",
     ppe:["Silmäsuojaimet","Hengityssuojain","Työkäsineet","Kuulosuojaimet"],
     use:"Pintojen puhdistus ja karhennus.",
     start:["TÄYDENNÄ konetta vasten."],stop:["TÄYDENNÄ konetta vasten."],
     rules:["Kaappi suljettuna käytön ajan.","Hengityssuojain pakollinen — kvartsipölyvaara.","Tarkista käsineiden kunto."],
     clean:"Puhdista kaappi, tarkista puhallusaineen määrä.",maint_student:["Kaapin puhdistus"],
     maint_staff:["Suuttimen vaihto","Suodattimen huolto"],status:"luonnos"},

    {id:"m_co2laser",campus:"ARA",name:"CO2-laserleikkuri",room:"CO2 Laser",haz:3,permit:true,loc:"ARA-LAS-A1",
     ppe:["Kohdepoisto"],
     use:"Levymateriaalien leikkaus ja kaiverrus (puu, akryyli, pahvi).",
     start:["Tarkista että materiaali on sallittu — EI PVC:tä (myrkyllinen kloorikaasu).","Kytke savunpoisto ja jäähdytys päälle.","Aseta polttopiste ja nollapiste.","Sulje kansi."],
     stop:["Anna savunpoiston käydä ajon jälkeen.","Avaa kansi vasta kun savu on poistunut.","Tyhjennä hukkapala-astia."],
     rules:["Konetta EI saa jättää käymään valvomatta — palovaara.","Vain sallitut materiaalit; epäselvässä tapauksessa kysy.","Sammutin on oltava ulottuvilla.","Kansi pysyy kiinni ajon aikana."],
     clean:"Tyhjennä hukkapala-astia, pyyhi taso, tarkista linssin puhtaus.",
     maint_student:["Hukkapalojen poisto","Tason pyyhintä"],
     maint_staff:["Linssin ja peilien puhdistus","Polttopisteen kalibrointi","Suodattimen vaihto"],status:"luonnos"},

    {id:"m_bacci",campus:"ARA",name:"BACCI CNC (5-akselinen)",room:"Puu-CNC",haz:5,permit:true,loc:"ARA-CNC-A1",
     ppe:["Silmäsuojaimet","Kuulosuojaimet","Turvajalkineet"],
     use:"5-akselinen CNC-työstö: puu ja Finfoam.",
     start:["Vain valvotusti.","Tarkista työkalun kiinnitys ja pituus.","Aja ohjelma ensin ilman materiaalia (kuivaajo).","Kiinnitä kappale ja tarkista alipaine/kiinnitys.","Sulje suojaovet."],
     stop:["Aja työkalu turva-asemaan.","Katkaise virta ohjeen mukaan.","Imuroi lastut ja pura kiinnitys."],
     rules:["Vain pajamestarin valvonnassa (vaaraluokka 5).","Ohjelma tarkistetaan aina ennen ajoa.","Suojaovet pysyvät kiinni ajon aikana.","Hätäpysäytyksen sijainti on tiedettävä ennen aloitusta."],
     clean:"Imuroi lastut pöydältä ja koneen sisältä, palauta työkalut.",
     maint_student:["Lastujen imurointi","Työkalujen palautus"],
     maint_staff:["Työkalunvaihtajan huolto","Akseleiden voitelu","Alipainepöydän tiivisteet"],status:"luonnos"},

    {id:"m_3dprint",campus:"ARA",name:"3D-tulostin (FFF)",room:"3D-tulostus",haz:2,permit:false,loc:"ARA-TDT-A1",
     ppe:[],
     use:"Prototyyppien tulostus lankamateriaalista (PLA, PETG).",
     start:["Tarkista alustan puhtaus ja tasaus.","Lataa oikea materiaali ja profiili.","Käynnistä tulostus ja seuraa ensimmäiset kerrokset."],
     stop:["Anna alustan jäähtyä ennen kappaleen irrotusta.","Irrota kappale lastalla, ei terävällä veitsellä.","Puhdista alusta."],
     rules:["Suutin ja alusta ovat kuumia — älä koske.","Älä jätä pitkää tulostusta valvomatta ilman lupaa.","Ilmoita tukkeutumasta heti."],
     clean:"Poista tukirakenteet ja jäämät, puhdista alusta, lajittele jäte muovijakeeseen.",
     maint_student:["Alustan puhdistus","Jäämien poisto"],
     maint_staff:["Suuttimen vaihto ja puhdistus","Alustan tasaus","Vetopyörän huolto"],status:"luonnos"},

    {id:"m_hartsitulostin",campus:"ARA",name:"Hartsitulostin (SLA)",room:"3D-tulostus",haz:3,permit:true,loc:"ARA-TDT-A2",
     ppe:["Työkäsineet","Silmäsuojaimet","Kohdepoisto"],
     use:"Tarkkojen prototyyppien tulostus fotopolymeerihartsista.",
     start:["Käytä aina nitriilikäsineitä — hartsi on ihoa herkistävää.","Tarkista altaan puhtaus ja hartsin määrä.","Varmista ilmanvaihto."],
     stop:["Pese kappale isopropanolissa suojakäsineet kädessä.","Jälkikovetus UV-valolla.","Suodata ylimääräinen hartsi takaisin pulloon."],
     rules:["Kovettumaton hartsi on haitallista — ei paljain käsin.","Pesuliuos on syttyvää.","Lue hartsin ja isopropanolin KTT ennen käyttöä."],
     clean:"Pyyhi roiskeet, sulje hartsi, hävitä pesujäte vaarallisena jätteenä.",
     maint_student:["Altaan pyyhintä"],maint_staff:["FEP-kalvon vaihto","Altaan puhdistus"],status:"luonnos"},

    {id:"m_juotospiste",campus:"ARA",name:"Juotospiste (jalometalli)",room:"Jalometallistudio",haz:4,permit:true,loc:"ARA-JAL-A2",
     ppe:["Silmäsuojaimet","Työkäsineet","Kohdepoisto"],
     use:"Kaasujuotto shamotti- ja tulitiililevyillä.",
     start:["Tarkista kaasupilli ja letku.","Kytke kohdepoisto.","Varmista juotoslevyn kunto ja alusta."],
     stop:["Sulje kaasu.","Anna kappaleen jäähtyä merkityllä alustalla.","Tarkista ettei kytemistä."],
     rules:["Kuuma metalli näyttää kylmältä — pihdit aina.","Kohdepoisto päällä juottaessa.","Ei syttyviä lähellä."],
     clean:"Puhdista juotoslevy, palauta pihdit, sulje kaasu.",
     maint_student:["Työpisteen siivous"],maint_staff:["Kaasuletkujen tarkistus","Juotoslevyjen vaihto"],status:"luonnos"},

    {id:"m_kiillotus",campus:"ARA",name:"Kiillotuslaite",room:"Jalometallistudio",haz:3,permit:true,loc:"ARA-JAL-A3",
     ppe:["Silmäsuojaimet","Visiiri","Hengityssuojain","Kohdepoisto"],
     use:"Jalometallien kiillotus ja viimeistely.",
     start:["Tarkista kotelointi ja kohdepoisto.","Valitse oikea laikka ja tahna."],
     stop:["Anna laikan pysähtyä.","Puhdista kotelo."],
     rules:["EI käsineitä — kiertymisvaara.","Pidä kappale laikan alapuolella.","Kohdepoisto päällä — kiillotuspöly on haitallista."],
     clean:"Imuroi kiillotuspöly kotelosta ja lattialta.",
     maint_student:["Kotelon puhdistus"],maint_staff:["Laikkojen vaihto","Imurin suodatin"],status:"luonnos"},

    {id:"m_nabertherm",campus:"ARA",name:"Nabertherm-uuni",room:"Jalometallistudio",haz:4,permit:true,loc:"ARA-JAL-A1",
     ppe:["Silmäsuojaimet","Työkäsineet","Palosuojavaatetus"],
     use:"Emalointi ja lämpökäsittely.",
     start:["Vain valvotusti.","Tarkista uunin sisätila ja alusta.","Aseta ohjelma ja lämpötila.","Varaa pihdit ja jäähdytysalusta valmiiksi."],
     stop:["Anna kappaleen jäähtyä merkityllä alustalla.","Sammuta uuni ohjelman mukaan.","Merkitse kuuma alue."],
     rules:["Vain pajamestarin valvonnassa.","Kuuma kappale näyttää kylmältä — pihdit aina.","Älä avaa uunia täydessä lämmössä ilman lupaa.","Ei syttyviä materiaaleja uunin lähellä."],
     clean:"Puhdista alusta, palauta pihdit, merkitse jäähtyvä kappale.",
     maint_student:["Alustan puhdistus","Työkalujen palautus"],
     maint_staff:["Vastusten kunto","Ohjelmien tarkistus"],status:"luonnos"},

    {id:"m_alipainevalu",campus:"ARA",name:"Alipainevaluyksikkö",room:"Jalometallistudio",haz:4,permit:true,loc:"ARA-JAL-B1",
     ppe:["Silmäsuojaimet","Työkäsineet","Palosuojavaatetus"],
     use:"Alipainevalu, hartsi- ja metallivalut.",
     start:["Vain valvotusti. TÄYDENNÄ laitetta vasten."],stop:["TÄYDENNÄ laitetta vasten."],
     rules:["Vain pajamestarin valvonnassa.","Sula metalli — täysi suojaus.","Kosteus muotissa aiheuttaa räjähdysmäisen roiskeen."],
     clean:"Puhdista upokas ja alusta, palauta työkalut.",
     maint_student:["Alueen siivous"],maint_staff:["Pumpun huolto","Upokkaan kunto"],status:"luonnos"},

    {id:"m_induktiouuni",campus:"ARA",name:"Induktioupokassulatusuuni",room:"Jalometallistudio",haz:5,permit:true,loc:"ARA-JAL-B2",
     ppe:["Silmäsuojaimet","Visiiri","Työkäsineet","Palosuojavaatetus"],
     use:"Metallin sulatus valua varten.",
     start:["Vain valvotusti. TÄYDENNÄ laitetta vasten."],stop:["TÄYDENNÄ laitetta vasten."],
     rules:["Vain pajamestarin valvonnassa (vaaraluokka 5).","Sula metalli: täysi suojavaatetus ja visiiri.","Ei kosteutta upokkaan lähellä.","Sydämentahdistin: induktiokenttä — varmista ennen työskentelyä."],
     clean:"Anna jäähtyä, puhdista upokas, merkitse kuuma alue.",
     maint_student:[],maint_staff:["Upokkaan kunto","Jäähdytyksen tarkistus"],status:"luonnos"},

    {id:"m_keramiikkauuni",campus:"ARA",name:"Keramiikkauuni",room:"Kuvanveisto",haz:4,permit:true,loc:"ARA-KUV-A1",
     ppe:["Silmäsuojaimet","Työkäsineet"],
     use:"Raakapoltto ja lasituspoltto.",
     start:["Tarkista uunin sisätila ja hyllyt.","Aseta poltto-ohjelma.","Varmista ettei syttyviä lähellä."],
     stop:["ÄLÄ avaa uunia kuumana — lämpöshokki rikkoo työt ja polttaa.","Odota ohjelman mukainen jäähtyminen.","Merkitse jäähtyvä uuni."],
     rules:["Vain pajamestarin valvonnassa polton käynnistys.","Lasitteet sisältävät haitallisia aineita — lue KTT.","Uunia ei avata ennen kuin lämpötila on turvallinen."],
     clean:"Puhdista hyllyt, poista lasitevalumat, siivoa alue.",
     maint_student:["Hyllyjen puhdistus"],
     maint_staff:["Vastusten kunto","Ohjelmien tarkistus","Hyllyjen pinnoitus"],status:"luonnos"},

    {id:"m_adamik",campus:"ARA",name:"Adamik-kalvopuristin",room:"Protostudio",haz:3,permit:true,loc:"ARA-PRO-A1",
     ppe:["Silmäsuojaimet","Työkäsineet"],
     use:"Kalvopuristus ja pintalaminointi.",
     start:["TÄYDENNÄ laitetta vasten."],stop:["TÄYDENNÄ laitetta vasten."],
     rules:["Kuumat pinnat — käsineet.","Kädet pois puristusalueelta."],
     clean:"Puhdista kalvojäämät, pyyhi taso.",
     maint_student:["Tason puhdistus"],maint_staff:["Kalvon vaihto","Lämmityksen tarkistus"],status:"luonnos"},

    {id:"m_maalauskaappi",campus:"ARA",name:"Maalauskaappi / ruiskumaalaus",room:"Maalaamo",haz:3,permit:true,loc:"ARA-MAA-A1",
     ppe:["Hengityssuojain","Silmäsuojaimet","Työkäsineet","Kohdepoisto"],
     use:"Pintakäsittely ruiskuttamalla, maalaus ja lakkaus.",
     start:["Kytke kohdepoisto päälle ennen työn aloitusta.","Lue käytettävän aineen käyttöturvallisuustiedote.","Suojaa ympäristö ja varmista ettei avotulta lähellä."],
     stop:["Anna kohdepoiston käydä ohjeen mukainen aika.","Puhdista ruisku heti liuottimella.","Sulje aineet tiiviisti."],
     rules:["Vain kohdepoiston kanssa — höyryt ovat syttyviä ja haitallisia.","Hengityssuojain on pakollinen.","Öljy- ja liuotinrätit metalliastiaan — itsesyttymisvaara.","Ei avotulta eikä kipinöiviä töitä samassa tilassa."],
     clean:"Puhdista ruisku, pyyhi kaappi, rätit metalliastiaan, aineet kaappiin.",
     maint_student:["Ruiskun puhdistus","Työalueen siivous"],
     maint_staff:["Suodattimien vaihto","Kohdepoiston tehon tarkistus"],status:"luonnos"}
  ];

  // ---------- TYÖKALUT ----------
  var TOOLS=[
    {id:"t_mitta",campus:"ARA",name:"Työntömitta ja mittatyökalut",room:"Puustudio",loc:"ARA-PUU-K1-L1",note:"Palauta suojakoteloon. Ei pudotuksia — kalibrointi kärsii."},
    {id:"t_taltat",campus:"ARA",name:"Taltat ja veistotyökalut",room:"Puustudio",loc:"ARA-PUU-K1-L2",note:"Teräsuojat päälle. Ilmoita lohkeamasta."},
    {id:"t_kasihoylat",campus:"ARA",name:"Käsihöylät",room:"Puustudio",loc:"ARA-PUU-K2-L1",note:"Terä sisään vedettynä säilytykseen."},
    {id:"t_hiomatarvikkeet",campus:"ARA",name:"Hiomatarvikkeet",room:"Puustudio",loc:"ARA-PUU-K3-L1",note:"Karkeuden mukaan järjestettynä."},
    {id:"t_puristimet",campus:"ARA",name:"Puristimet",room:"Puustudio",loc:"ARA-PUU-S1",note:"Puristinseinällä koon mukaan."},
    {id:"t_poranterat",campus:"ARA",name:"Poranterät",room:"Metallistudio",loc:"ARA-MET-K1-L1",note:"Teräkaapissa koon mukaan omissa paikoissaan."},
    {id:"t_kierretyokalut",campus:"ARA",name:"Kierretapit ja -leuat",room:"Metallistudio",loc:"ARA-MET-K1-L2",note:"Sarjoittain. Käytä leikkuuöljyä."},
    {id:"t_viilat",campus:"ARA",name:"Viilat ja rasput",room:"Metallistudio",loc:"ARA-MET-K2-L1",note:"Kahvat paikallaan. Puhdista viilaharjalla."},
    {id:"t_vasarat",campus:"ARA",name:"Vasarat ja pihdit",room:"Metallistudio",loc:"ARA-MET-S1",note:"Työkalutaululla varjopaikoillaan."},
    {id:"t_suojaimet",campus:"ARA",name:"Henkilökohtaiset suojaimet",room:"Yleiset tilat",loc:"ARA-YLE-S1",note:"Suojainpisteellä sisäänkäynnin luona. Palauta käytön jälkeen."}
  ];

  // ---------- JULKINEN RAJAPINTA ----------
  var STORE="paja_campus_v1";
  function getCampus(){
    try{ return localStorage.getItem(STORE) || "ARA"; }catch(e){ return "ARA"; }
  }
  function setCampus(c){
    try{ localStorage.setItem(STORE,c); }catch(e){}
  }
  function byCampus(arr,c){
    c=c||getCampus();
    return arr.filter(function(x){ return !x.campus || x.campus===c; });
  }

  window.PAJA={
    version:"1.0",

    campuses:function(){ return CAMPUSES.slice(); },
    campus:function(code){ code=code||getCampus();
      var a=CAMPUSES.filter(function(c){ return c.code===code; }); return a.length?a[0]:CAMPUSES[0]; },
    getCampus:getCampus,
    setCampus:setCampus,

    rooms:function(c){ return byCampus(ROOMS,c); },
    roomNames:function(c){ return byCampus(ROOMS,c).map(function(r){ return r.name; }); },
    roomCode:function(name){ var a=ROOMS.filter(function(r){ return r.name===name; }); return a.length?a[0].code:""; },

    machines:function(c){ return byCampus(MACHINES,c); },
    machine:function(id){ var a=MACHINES.filter(function(m){ return m.id===id; }); return a.length?a[0]:null; },
    machinesInRoom:function(room,c){ return byCampus(MACHINES,c).filter(function(m){ return m.room===room; }); },

    tools:function(c){ return byCampus(TOOLS,c); },
    fractions:function(){ return FRACTIONS.slice(); },
    fractionNames:function(){ return FRACTIONS.map(function(f){ return f.name; }); },
    ppe:function(){ return PPE.slice(); },
    roles:function(){ return ROLES.slice(); },
    hazardLabel:function(n){ return HAZ[n]||""; },
    hazards:function(){ var o={},k; for(k in HAZ){ if(HAZ.hasOwnProperty(k)) o[k]=HAZ[k]; } return o; },

    locFormat:"KAMPUS-TILA-KAAPPI-LAATIKKO",
    locExample:"ARA-PUU-K3-L2"
  };
})();
