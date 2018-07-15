
const getTorrentMetadata = require('./getTorrentMetadata');

module.exports = function (album) {

    //insert check for if metadata already exists
    if(!album.metadata){
        
        //if it is a torrent, do this
        if (album.link.startsWith('magnet:?xt=urn:')) {
            getTorrentMetadata(album);
        }
        //else do this
        else{
            //something else
        }

    }

}