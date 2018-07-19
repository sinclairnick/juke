const playTorrent = require('./playTorrent');
const audioTag = document.querySelector('audio#now-playing');

module.exports = function () {

    if (global.juke.queue) {

        //add now playing to history
        if (global.juke.nowPlaying) {
            global.juke.history.unshift(global.juke.nowPlaying);
        }

        if (global.juke.queue.length > 0) {
            //play the song at front of queue
            let next = global.juke.queue.shift();

            playTorrent(next);
        }
        else {
            audioTag.pause();
            audioTag.src = null;
            global.juke.playing = false;
            global.juke.nowPlaying = null;
        }
    }
}