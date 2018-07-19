const getTorrentMetadata = require('./getTorrentMetadata');

module.exports = function (album) {

    //if it does not have metadata:
    if (!album.metadata) {

        //and if it is a torrent: do this
        if (album.link.startsWith('magnet:?xt=urn:')) {
            getTorrentMetadata(album);
        }

    }

}