
const musicMeta = require('music-metadata');


const format = require('format-duration');
const mime = require('mime-types');

module.exports = function (song, stream) {

            if (!song.metadata) {

                let mimeType = mime.lookup(song.type);

                musicMeta.parseStream(stream, mimeType, { duration: true, fileSize: file.length })
                    .then((metadata) => {

                        if (metadata.common) {
                            console.log(metadata.common);

                            song.title = metadata.common.title || null;
                            song.track = metadata.common.track.no || null;
                            song.artists = metadata.common.artists || null;


                            if (metadata.format.duration) {
                                song.durationPretty = format(metadata.format.duration * 1000);
                                song.duration = metadata.format.duration;
                            }

                            song.metadata = true;
                        }


                    })
            }
}