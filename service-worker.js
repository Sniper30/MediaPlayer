var CACHE_STATIC = 'Static-v4';
var CACHE_DYNAMIC = 'Dynamic-v1';

var ArrayInstall =[
    // './',
    'main.css',
    'main.js',
    'offline.html',
    "https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/r9E0QYuleiv25jmq9/videoblocks-the-man-standing-on-the-mountain-against-the-beautiful-sunset_binzdmw6e__5e1451f8f3f1d68df8371a20d1681d64__P360.mp4",
    "plugins/autoPause.js",
    "plugins/autoPlay.js",
    "img/windows-lhDjusLtpP4-unsplash.jpeg",
    "MediaPlayer.js"

]

function ErrorHandler(error){
    console.log(error.message)
}

self.addEventListener('install',function(event) {
    //aqui va a instalar todo lo que mi app necesita para subsistir sin internet
    var instalacion = caches.open(CACHE_STATIC).then(cache => cache.addAll(ArrayInstall)).catch(error => ErrorHandler(error));
    event.waitUntil(instalacion)
});

self.addEventListener('activate',(event) => {
    //cada ves que un service worker nuevo sea detectado, cuando este se active va a borrar la version vieja de mi static cache
    //para que no hallan dos caches con las mismas similitudes
   var response = caches.keys().then(cachesNames =>{
      for(cache of cachesNames){
         if(cache.toLowerCase().includes('static') && cache !==  CACHE_STATIC) return caches.delete(cache) 
      }
   });
   event.waitUntil(response)
})

self.addEventListener('fetch',function(event) {
    var req = event.request;
    event.respondWith(RespondCacheFirst(req));
    
})


async function RespondCacheFirst(req){
    
   var response = await caches.match(req);
   return response || fetch(req).then(res =>{
       console.log("aqui deberia estar el video :", res)
       caches.open(CACHE_DYNAMIC).then(cache => cache.put(req,res))
       return res.clone()
})
  
}