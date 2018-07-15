const { saveAlbum, removeAlbum } = require('../app-methods/index');
require('./index').track;


module.exports = Vue.component('selected-album', {
    props: ['albumTitle', 'artist', 'coverPath', 'flac', 'metadata'],
    template:
        `<div class="selected-album">
    <div class="thumbnail"">
    <img :src="coverPath" :class="{ flac: flac}">
    <h3 class="title">{{albumTitle}}</h3>
    <h4 class="artist">{{artist}}</h4>
    <transition name="fade">
        <h5 v-if="isSaved" class="save" v-on:click="removeAlbum(selectedAlbum)"><i class="fas fa-check"></i></h5>
        <h5 v-else class="save" v-on:click="saveAlbum(selectedAlbum)"><i class="fas fa-arrow-circle-down"></i> save</h5>
    </transition>
    </div>
    <div class="tracks">
    <ul>
        <track-li 
        v-for="(song, index) in sortedSongs" 
        :cover="song.cover" :key="song.fileName" 
        :file-name="song.fileName" :name="song.title || song.fileName"
        :duration-pretty="song.durationPretty" 
        :duration="song.duration" :track="song.track"
        :artists="song.artists"
        :type="song.type" 
        :link="song.link"
        :metadata="song.metadata" 
        :album="selectedAlbum" 
        :info="song"
        :torrent-index="song.torrentIndex"
        :index="index"
        :artist="selectedAlbum.artist"></track-li>
    </ul>
    </div>
    </div>`,
    computed: {
        sortedSongs() {
            if (!global.juke.selectedAlbum.playlist) {
                if (global.juke.selectedAlbum.metadata) {
                    return global.juke.selectedAlbum.songs.sort((a, b) => a.track - b.track);
                }
                else {
                    return global.juke.selectedAlbum.songs.sort((a, b) => a.fileName - b.fileName);
                }
            } else {
                return global.juke.selectedAlbum.songs;
            }
        },
        savedAlbumMagnets() {
            if (global.juke.savedAlbums) {
                let arr = [];
                for (alb of global.juke.savedAlbums) {
                    arr.push(alb.link);
                }
                return arr;
            }
        },
        isSaved(){
            for( entry of this.savedAlbumMagnets){
                if(global.juke.selectedAlbum.link === entry) return true;
            }
        }
    },
    data() {
        return {
            selectedAlbum: global.juke.selectedAlbum,
        }
    },
    methods: {
        saveAlbum,
        removeAlbum
    }
})