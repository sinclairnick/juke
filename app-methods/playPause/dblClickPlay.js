const playTorrent = require('./playTorrent');
const autoQueueFrom = require('./autoQueue');

module.exports = function () {

    //if link is a magnet file:
    if (this.link.startsWith('magnet:?xt=urn:')) {
        autoQueueFrom(this);
        playTorrent(this);
    }

}