//Component for the album thumnails
const {selectAlbum} = require('../app-methods/index');
const {dblClickPlay, dragstart, drop} = require('../app-methods/index');
const {trackMenu} = require('../context-menu/index');



module.exports = Vue.component('album-li', {
    props: ['artist', 'album', 'link', 'coverPath', 'flac', 'health', 'albumObject', 'songs'],
    template:
        `<div class="album-info" draggable="true" v-on:dragstart="dragstart" v-on:drop="drop">
        <div v-on:click="selectAlbum" class="album-thumbnail"  :class="{ flac: flac}" v-bind:style="{ backgroundImage: 'url(' + coverPath + ')' }">
        <div class="health"><i class="fas fa-plus-square"></i> {{health}}</div>
        </div>
        <p v-on:click="selectAlbum" :title="album" class="album-name">{{album}}</p>
        <p class="album-artist">{{artist}}</p>
        </div>`,
    methods: {
        selectAlbum,
        dragstart,
        drop
    }
});