const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const hpath = require('home-path')();

const vinylNoise = document.querySelector('#vinyl-noise');
vinylNoise.volume = 0.6;

//electron modules
const { webFrame, remote } = require('electron');
const { globalShortcut } = remote;
webFrame.setVisualZoomLevelLimits(1, 1);

//config

//app methods
const {
    search,
    loadMore,
    scrollHandler,
    pauseUnpause,
    onPause,
    onPlaying,
    onStall,
    playNext,
    playPrev,
    dragenter,
    dragleave,
    drop,
    seek,
    changeVolume,
    importPlaylist,
    exportAllPlaylists,
    saveAlbum,
    removeAlbum,
} = require('./app-methods/index');


//front page
let featuredArray = [];
try { featuredArray = JSON.parse(fs.readFileSync(path.join(__dirname, 'boot', 'featuredAlbums', 'albums.json'))) || [] }
catch (e) {

}

//load playlists
let playlists = [];
try { playlists = JSON.parse(fs.readFileSync(path.join(__dirname, 'boot', 'playlists', 'playlists.json'))) }
catch (e) { console.log(e) };

//saved albums
let savedAlbums = [];
let savedAlbumFile = path.join(hpath, 'documents', 'juke_library', 'savedAlbums.json');
if (!fs.existsSync(path.join(hpath, 'documents', 'juke_library'))) {
    fs.mkdirSync(path.join(hpath, 'documents', 'juke_library'));
    if (!fs.existsSync(path.join(hpath, 'documents', 'juke_library', 'music'))) {
        fs.mkdirSync(path.join(hpath, 'documents', 'juke_library', 'music'));
    }
}
if (!fs.existsSync(savedAlbumFile)) {
    try {
        fs.writeFileSync(savedAlbumFile, JSON.stringify(savedAlbums))
    }
    catch (e) {
        console.warn(e);
    }
}
else {
    savedAlbums = JSON.parse(fs.readFileSync(savedAlbumFile));
}

//components
require('./vue-comp/index').album;
require('./vue-comp/index').selectedAlbum;
require('./vue-comp/index').nowPlaying;
require('./vue-comp/index').nowPlayingArt;
require('./vue-comp/index').nextTrack;
require('./vue-comp/index').prevTrack;
require('./vue-comp/index').queueList;
require('./vue-comp/index').addPlaylist;
require('./vue-comp/index').playlistInput;
require('./vue-comp/index').playlist;
require('./vue-comp/index').playlistNav;


//accelerators
globalShortcut.register('MediaNextTrack', playNext);
globalShortcut.register('MediaPreviousTrack', playPrev);
globalShortcut.register('MediaPlayPause', pauseUnpause);
document.addEventListener('keyup', (e) => {
    if (document.activeElement.tagName !== 'INPUT') {
        e.preventDefault();
        if (e.keyCode === 32) {
            e.stopPropagation();
            pauseUnpause();
        }
    }
})



// root vue instance
global.juke = new Vue({
    el: '#juke',
    data: {
        page: 'home',
        searchQuery: '',
        searchArray: [],
        searchCache: [],
        lastPage: 'home',
        featuredArray,
        playlists,
        savedAlbums,
        cacheSize: 8,
        pageNumber: 1,
        selectedAlbum: null,
        albumIsSelected: false,
        canLoadMore: true,
        nowPlaying: null,
        trackProgress: null,
        showQueue: false,
        showHistory: false,
        showPlaylistInput: false,
        queue: [],
        history: [],
        shuffle: false,
        repeat: false,
        playing: false,
        dragItem: null,
    },
    methods: {
        search,
        loadMore,
        scrollHandler,
        pauseUnpause,
        onPause,
        onPlaying,
        onStall,
        playNext,
        playPrev,
        dragenter,
        dragleave,
        drop,
        seek,
        changeVolume,
        importPlaylist,
        exportAllPlaylists,
        saveAlbum,
        removeAlbum
    },
    computed: {
        sortedSearchArray() {
            if (this.searchArray) {
                return this.searchArray.filter(item => item.health > 5)
                    .sort((a, b) => b.health - a.health);
            }
        }
    }
})