const torrentStream = require('torrent-stream');
const musicMeta = require('music-metadata');


const format = require('format-duration');
const mime = require('mime-types');

module.exports = function (album) {

    let engine = torrentStream(album.link, { path: process.env.TMP_TORRENTS });

    engine.on('ready', function () {

        let amountOfAnalyzedFiles = 0;
        let iteratedFiles = 0;

        let albumTitle = null;
        let artist = null;
        let year = null;
        let totalTracks = null;

        album.songs.forEach(song => {

            if (!song.metadata) {

                let file = engine.files[song.torrentIndex];

                amountOfAnalyzedFiles++;


                let mimeType = mime.lookup(song.type);

                var stream = file.createReadStream();

                musicMeta.parseStream(stream, mimeType, { duration: true, fileSize: file.length })
                    .then((metadata) => {
                        iteratedFiles++;

                        if (metadata.common) {

                            //updating album metadata
                            albumTitle = albumTitle || metadata.common.album || null;
                            artist = artist || metadata.common.artist || null;
                            year = year || metadata.common.year || null;
                            totalTracks = totalTracks || metadata.common.track.of || null;


                            song.title = metadata.common.title || null;
                            song.track = metadata.common.track.no || null;
                            song.artists = metadata.common.artists || null;


                            if (metadata.format.duration) {
                                song.durationPretty = format(metadata.format.duration * 1000);
                                song.duration = metadata.format.duration;
                            }
                            if (metadata.common.picture) {

                                let cover = metadata.common.picture.find(pic => {
                                    return pic.type === "Cover (front)";
                                })
                                if (cover) {
                                    album.cover = [`data:${cover.format};base64,${cover.data.toString('base64')}`];
                                }
                                else {
                                    for (img of metadata.common.picture) {
                                        album.cover = [`data:${img.format};base64,${img.data.toString('base64')}`];
                                    }
                                }



                            }

                            song.metadata = true;
                        }

                        //once all files have been iterated
                        if (iteratedFiles === amountOfAnalyzedFiles) {
                            album.title = albumTitle;
                            album.artist = artist;
                            album.metadata = true;
                        }
                        else if (albumTitle && artist) {
                            album.title = albumTitle;
                            album.artist = artist;
                        }


                    })
            }
        })

    })
}