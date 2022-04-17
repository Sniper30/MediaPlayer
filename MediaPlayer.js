
export default function MediaPlayer(config) {
    this.el = config.el;
    this.plugins = config.plugins || []

    this._initPlugin();
}

MediaPlayer.prototype.play = function(){
    this.el.play();
}

MediaPlayer.prototype.pause = function(){
    this.el.pause();
}

MediaPlayer.prototype._initPlugin = function(){
   this.plugins.forEach((plugin)=> plugin.call(this))
}

MediaPlayer.prototype.mute = function(){
    this.el.muted = !this.el.muted;
}

