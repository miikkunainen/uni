# IKM — Paja domain-taksonomia (v0.1)

**Tarkoitus:** yhteinen, karkea sanasto kyvykkyyksien nimeämiseen. Nämä `domain`-tunnisteet täyttävät IKM-mallin `Capability.domain`- ja `TaskEnvironment.requiredCapabilities`-kentät. Yksi domain = yksi paja-ajokortti, jolla on neljä tasoa (havainnoitu → ohjattu → itsenäinen → ohjaava).

**Konventio:** `kategoria.tarkenne`, pienin kirjaimin, vakaa (ei muuteta kun se on julkaistu). Pidetään karkeana: yksi tunniste per konetyyppi tai prosessi, ei mikrotaitoja.

**Status:** v0.1 luonnos — vahvistettava todellisia pajoja vasten (ks. lopun lista).

---

## Perusta — läpileikkaavat (vaaditaan ennen muita)

| domain | suomeksi | laajuus | alue |
|---|---|---|---|
| `safety.induction` | Perusperehdytys | Pajojen yleinen turvallisuus, suojaimet, hätätilanteet. **Esivaatimus kaikelle.** | kaikki |
| `chem.handling` | Kemikaalien käsittely | KTT:n luku (PRO24), merkinnät, kemikaalikohtaiset suojaimet, varastointi. | läpileikkaava |
| `waste.retake` | Jätteet ja RETAKE | Lajittelu, 120 l → 350 l kerrossukkula → jätehuone; ongelmajäte ja itsesyttyvät rätit. | läpileikkaava |

---

## Koneet ja prosessit

### CNC
| domain | suomeksi | laajuus | alue |
|---|---|---|---|
| `cnc.bacci` | BACCI ARTIST 5-akselinen | 5-akselinen CNC (puu/Finfoam); CAM-valmistelu, työkalut, rajat. | CNC-alue |
| `cnc.wood` | Puu-CNC | Puuntyöstö-CNC / jyrsin. | Puu CNC |

### Laser
| domain | suomeksi | laajuus | alue |
|---|---|---|---|
| `laser.co2` | CO2-laser | CO2-laserleikkuri; materiaalirajat, savunpoisto, paloturvallisuus. | CO2 Laser |

### 3D-tulostus
| domain | suomeksi | laajuus | alue | chem |
|---|---|---|---|---|
| `print3d.fff` | Lankatulostus | FFF/FDM-tulostimet. | 3D tulostus | |
| `print3d.resin` | Resiinitulostus | SLA/resiini; kemikaali- ja iho-/silmäriski. | 3D tulostus | ✓ |

### Puu
| domain | suomeksi | laajuus | alue |
|---|---|---|---|
| `wood.machines` | Puuntyöstökoneet | Vannesaha, oikohöylä, pyörösaha jne.; kovapuupöly (syöpävaarallinen, ASA). | Puustudio |

### Metalli
| domain | suomeksi | laajuus | alue |
|---|---|---|---|
| `metal.machines` | Metallintyöstö | Sorvi, jyrsin, hionta. | Metallistudio |
| `metal.welding` | Hitsaus | Hitsaus ja kuumatyö; suojaus, paloturvallisuus, ilmanvaihto. | Metallistudio |

### Jalometalli
| domain | suomeksi | laajuus | alue | chem |
|---|---|---|---|---|
| `jewellery.bench` | Jalometallityö | Juotto, viilaus, valu; hapot ja kaasut. | Jalometallistudio | ✓ |

### Keramiikka
| domain | suomeksi | laajuus | alue | chem |
|---|---|---|---|---|
| `ceramics.forming` | Saven muotoilu | Saven käsittely ja muotoilu. | Kuvanveisto | |
| `ceramics.kiln` | Keramiikkauuni | Kerako-uunit (ISOUUNI / AMMEMALLI); poltto-ohjelmat, lasitteet. | uunit | ✓ |

### Lasi *(vahvistettava — kuuluuko Arabian pajoihin)*
| domain | suomeksi | laajuus | alue | chem |
|---|---|---|---|---|
| `glass.work` | Lasinkäsittely | Lasin työstö. | (vahvistettava) | |
| `glass.kiln` | Lasiuuni | Lasin polttouuni. | (vahvistettava) | |

### Pintakäsittely
| domain | suomeksi | laajuus | alue | chem |
|---|---|---|---|---|
| `surface.spray` | Ruiskumaalaus | Ruiskumaalaus ja pintakäsittely; esikäsittelytila. | Maalaamo | ✓ |

---

## Esivaatimukset (yksinkertainen sääntö)

- `safety.induction` on **kaikkien** edellytys.
- Domainit, joissa on `chem` ✓, edellyttävät myös `chem.handling`-tasoa.
- Muutoin taso ja itsenäisyys ratkaistaan tehtäväkohtaisesti IKM:n `TaskEnvironment.requiredCapabilities`-kentässä — taksonomia ei lukitse niitä.

---

## Koneluettava lista

```json
{
  "version": "0.1",
  "domains": [
    "safety.induction",
    "chem.handling",
    "waste.retake",
    "cnc.bacci",
    "cnc.wood",
    "laser.co2",
    "print3d.fff",
    "print3d.resin",
    "wood.machines",
    "metal.machines",
    "metal.welding",
    "jewellery.bench",
    "ceramics.forming",
    "ceramics.kiln",
    "glass.work",
    "glass.kiln",
    "surface.spray"
  ]
}
```

---

## Vahvistettava (tämä on luonnos muistini pohjalta)

1. **Lasi** — kuuluuko (`glass.work`, `glass.kiln`) vai jätetäänkö pois?
2. **CNC/metalli** — onko BACCI oikeassa paikassa, ja halutaanko `cnc.wood` ja jyrsin erikseen? Tarvitaanko `metal.sheet` (levytyö) tai `metal.grinding` omana?
3. **Puu** — riittääkö `wood.machines`, vai erotetaanko käsityökalut?
4. **Puuttuuko aloja?** Mainitsit ~19 paja-aluetta. Tässä on ~12 aluetta. Mitä jäi: tekstiili, elektroniikka, muovit/tyhjiömuovaus, valokuvaus/studio, jokin muu?
5. **Tarkennukset** — pitäisikö jonkin domainin jakautua (esim. `ceramics.kiln` raaka- vs. lasituspoltto), vai pidetäänkö karkeana?
