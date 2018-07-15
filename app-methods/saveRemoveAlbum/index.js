const saveAlbums = require('./writeSavedAlbum');
const torrentStream = require('torrent-stream');
const path = require('path');
const home = require('home-path')();


module.exports = {
    saveAlbum(album) {
        global.juke.savedAlbums.push(album);
        saveAlbums();
        let engine = new torrentStream(album.link, {path: path.join(home, 'documents', 'juke_library', 'music')});
        engine.on('ready', ()=>{
            engine.files.forEach(file=>{
                file.select();
            })
        })
    },
    removeAlbum(album) {
        let toDelete = global.juke.savedAlbums.find(savedAlbum => {
            savedAlbum.link === album.link;
        })
        global.juke.savedAlbums.splice(global.juke.savedAlbums.indexOf(toDelete), 1);
        saveAlbums();

    }
}