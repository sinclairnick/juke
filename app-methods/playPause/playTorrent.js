const home = require('home-path')();
const path = require('path');
const audioTag = document.querySelector('audio#now-playing');
const vinylNoise = document.querySelector('#vinyl-noise');
const Promise = require('bluebird');
const WebTorrent = require('webtorrent');

let client = new WebTorrent();

Promise.config({ cancellation: true });
var prom = Promise.resolve();

let engine = null;
let oldEngine = null;


function addToDOM(selectedFile, song) {
    prom.cancel();

    selectedFile.getBlobURL((err, url) => {
        if(err)console.log(err);
        if (oldEngine) {
            oldEngine.destroy();
        }
        audioTag.src = url;
        global.juke.nowPlaying = song;
    })
}

module.exports = function (song) {

    if (engine) {
        oldEngine = engine;
    }

    if (!global.juke.playing) {
        vinylNoise.play();
    }
    let selectedFile;
    if(!client.get(song.link)){
        client.add(song.link, {path: path.join(home, 'documents', 'juke_library', 'music')}, torrent => {
            torrent.deselect(0, torrent.pieces.length-1, false);
            torrent.files.forEach((file, index) => {
                if(index === song.torrentIndex){
                    file.select();
                    selectedFile = file;
                }
                else{
                    file.deselect();
                }
            })
            addToDOM(selectedFile, song);
        })
    }
    else{
        let torrent = client.get(song.link);
        selectedFile = torrent.files[song.torrentIndex];
        selectedFile.select();
        addToDOM(selectedFile, song);
        
    }


}

