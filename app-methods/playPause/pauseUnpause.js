const audioTag = document.querySelector('audio#now-playing');
const playNext = require('./playNext');

module.exports = function () {

    if(audioTag.src){
        if (audioTag.paused) {
            audioTag.play();
        }
        else {
            audioTag.pause();
        }
    }
    else if(global.juke.queue.length > 0){
        playNext();
    }
}

