/* MHKS service worker — offline-välimuisti.
   Vaatii HTTPS-osoitteen. Kasvata CACHE-numeroa kun päivität sovelluksen. */
var CACHE = "mhks-v1";
var FILES = ["./", "./index.html", "./manifest.json", "./mhks-icon.svg",
  "./mhks_app.html", "./paja_app.html", "./paja_kemikaalirekisteri.html",
  "./paja_herateloki.html", "./paja_seuranta.html", "./syksyn_orientaatiokurssi.html",
  "./tietosuoja.html", "./paja-footer.js", "./pajakuutio-nav.js"];

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
