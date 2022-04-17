
var options = {threshold:0.24};

function AutoPause(){
    var observer = new IntersectionObserver(Interserction.bind(this),options);
    observer.observe(this.el)
};

function Interserction(entries){
    if(entries[0].intersectionRatio > options.threshold) this.play();
    else this.pause();
}



export default AutoPause;