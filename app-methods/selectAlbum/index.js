const getMetadata = require('../getMetadata/index');


module.exports = function () {

    global.juke.selectedAlbum = this.albumObject;
    if (!this.albumObject.metadata) {
        getMetadata(global.juke.selectedAlbum);
    }
    global.juke.albumIsSelected = true;

}