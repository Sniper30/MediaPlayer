import AutoPlay from "./plugins/autoPlay.js";
import AutoPause from './plugins/autoPause.js';
import MediaPlayer from "./mediaPlayer.js";




document.addEventListener("DOMContentLoaded", () => {

    var player = new MediaPlayer({ el: document.getElementById("mediaPlayer"), plugins: [AutoPlay, AutoPause] });


    document.getElementById("play").onclick = () => player.play();

    document.getElementById("pause").onclick = () => player.pause();


    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./service-worker.js').then((register)=>{
            console.log('Registration successful: ', register.scope);
      }).catch(err => console.log("error: ",err.message));
    }

})