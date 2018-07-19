const fs = require('fs');
const path = require('path');
const home = require('home-path')();


module.exports = function (song) {

    global.juke.selectedAlbum.songs.splice(song.index, 1);
    fs.writeFile(path.join(home, 'documents', 'juke_library', 'savedAlbums.json'), JSON.stringify(global.juke.savedAlbums), (err) => {
        if (err) console.warn(err);
    });
    
}