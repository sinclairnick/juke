const playTorrent = require('./playTorrent');

module.exports = function () {

    let song = this.track;

    if (song.link.startsWith('magnet')) {
        playTorrent(song);
        global.juke.queue = global.juke.queue.slice(this.index + 1);
    }

}