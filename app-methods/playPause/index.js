const dblClickPlay = require('./dblClickPlay');
const pauseUnpause = require('./pauseUnpause');
const onPause = require('./onPause');
const onStall = require('./onStall');
const onPlaying = require('./onPlaying');
const playNext = require('./playNext');
const playPrev = require('./playPrev');
const playFromQueue = require('./playFromQueue');

module.exports = {
    dblClickPlay,
    pauseUnpause,
    onPause,
    onPlaying,
    onStall,
    playNext,
    playPrev,
    playFromQueue
}