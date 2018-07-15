
const playTorrent = require('./playTorrent');

module.exports = function(){
    if(global.juke.history){

        //remove from history and add back to queue
        global.juke.queue.unshift(global.juke.nowPlaying);

        //play the previous song
        playTorrent(global.juke.history.pop());

    }
}