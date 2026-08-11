/* MHKS service worker — offline-välimuisti.
   Vaatii HTTPS-osoitteen. Kasvata CACHE-numeroa kun päivität sovelluksen. */
var CACHE = "pajat-v2";
var FILES = [
  "./",
  "./index.html",
  "./asenna.html",
  "./kartta.html",
  "./linkit.html",
  "./mhks_app.html",
  "./orientaatiokurssi_moodle.html",
  "./paja_app.html",
  "./paja_herateloki.html",
  "./paja_kemikaalirekisteri.html",
  "./paja_seuranta.html",
  "./pajakuutio_esikatselu.html",
  "./pajakuutio_hallinnan_kartta.html",
  "./pajapeli_digital_twin.html",
  "./pajatoiminnan_perusta.html",
  "./syksyn_orientaatiokurssi.html",
  "./tietosuoja.html",
  "./turvallisuus_ja_tyolupa.html",
  "./vaihe1_turvallisuus_mhks.html",
  "./manifest.json",
  "./pajakuutio-nav.js",
  "./paja-footer.js",
  "./mhks-icon.svg",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(FILES); }).then(function(){ return self.skipWaiting(); }));
});
self.addEventListener("activate", function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.map(function(k){ if(k !== CACHE){ return caches.delete(k); } }));
  }).then(function(){ return self.clients.claim(); }));
});
self.addEventListener("fetch", function(e){
  if(e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then(function(hit){
      if(hit) return hit;
      return fetch(e.request).then(function(res){
        var copy = res.clone();
        caches.open(CACHE).then(function(c){ c.put(e.request, copy); });
        return res;
      }).catch(function(){ return caches.match("./index.html"); });
    })
  );
});
