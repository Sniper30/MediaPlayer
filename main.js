import AutoPlay from "./plugins/autoPlay.js";
import AutoPause from './plugins/autoPause.js';
import MediaPlayer from "./mediaPlayer.js";




document.addEventListener("DOMContentLoaded", () => {

    var player = new MediaPlayer({ el: document.getElementById("mediaPlayer"), plugins: [AutoPlay, AutoPause] });


    document.getElementById("play").onclick = () => player.play();

    document.getElementById("pause").onclick = () => player.pause();

    var url = location.href;
    var sw;
    if(url.includes('127.0.0.1') || url.includes('localhost')) sw = "./service-worker.js";
    else sw = 'MediaPlayer/service-worker.js';

    console.log("url: ",url,"path sw: ",sw)

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register(sw).then((register)=>{
            console.log('Registration successful: ', register.scope);
      }).catch(err => console.log("error: ",err.message));
    }

})