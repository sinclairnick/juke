const { search, loadMore } = require('./search/index');
const selectAlbum = require('./selectAlbum/index');
const scrollHandler = require('./scrollLoad/index');
const getMetadata = require('./getMetadata/index');
const {
    dblClickPlay,
    pauseUnpause,
    onPause,
    onPlaying,
    onStall,
    playNext,
    playPrev,
    playFromQueue
} = require('./playPause/index');
const addToQueue = require('./addToQueue/index');
const { dragenter, dragleave, dragstart, drop } = require('./dragdrop/index')
const seek = require('./seek/index')
const changeVolume = require('./changeVolume/index')
const importPlaylist = require('./importPlaylist/index');
const exportAllPlaylists = require('./exportAllPlaylists/index');
const { saveAlbum, removeAlbum } = require('./saveRemoveAlbum/index');
const removeFromPlaylist = require('./removeFromPlaylist');

module.exports = {
    search,
    loadMore,
    getMetadata,
    selectAlbum,
    scrollHandler,
    dblClickPlay,
    pauseUnpause,
    addToQueue,
    onPause,
    onPlaying,
    onStall,
    playNext,
    playPrev,
    dragstart,
    dragenter,
    dragleave,
    drop,
    playFromQueue,
    seek,
    changeVolume,
    importPlaylist,
    exportAllPlaylists,
    saveAlbum,
    removeAlbum,
    removeFromPlaylist
}