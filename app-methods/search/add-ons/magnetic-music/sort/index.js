const Album = require('./Album');
const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');
const torrentStream = require('torrent-stream');
const torrentHealth = require('torrent-tracker-health');
const toBlobURL = require('stream-to-blob-url');


//own modules
const fileIsAudio = require('./fileIsAudio');
const fileIsImage = require('./fileIsImage');

require('events').EventEmitter.prototype._maxListeners = 500;

module.exports = function (query, arr, result) {

    //filename-safe query string
    let torrentDir = process.env.TMP_TORRENT || path.join(os.tmpdir(),'juketorrents');

    //nullify writable each time function is called
    let magnet = result.magnet || result.magnetLink;

    let torrent = new torrentStream(magnet, {path: torrentDir});

    torrent.on('ready', () => {

        //if torrent contains music
        if (torrent.files.find((file, index) => {
            return fileIsAudio(file);
        })) {

            //create an album object with name, link and popularity
            let album = new Album( result.name, magnet );
            let cover = null;
            album.cover = [path.join('img', 'default-thumbnail.png')]

            torrentHealth(magnet)
            .then(res=> {
                album.seeds = res.seeds;
                album.health = Math.round((res.peers > 0 ? res.seeds / res.peers : res.seeds));
            })

            //iterate over each file
            torrent.files.forEach((file, index) => {

                let id = crypto.randomBytes(16).toString('hex');

                //add music files to the album's "songs" array
                if (fileIsAudio(file)) {
                    album.addSong(file.name, index);
                }

                //download covers and assign path to album.cover
                else if (fileIsImage(file)) {
                    // writable = fs.createWriteStream(path.join(imgDir, `${id}.jpg`));
                    // album.cover = [path.join(imgDir, `${id}.jpg`)];
                    cover = file;
                    // readable.pipe(writable);

                }

                //once all files have been iterated and cover has been downloaded: return promise
                if (index === torrent.files.length - 1) {
                    try{
                        readable = cover.createReadStream();
                        toBlobURL(readable, (err, url) => {
                            album.cover = url;
                            let id = crypto.randomBytes(16).toString('hex');
                            album.id = id;
                            arr.push(album);
                        });
                    }
                    catch(e){
                        let id = crypto.randomBytes(16).toString('hex');
                        album.id = id;
                        arr.push(album);
                    }
                }

            })
        }
    })


}
