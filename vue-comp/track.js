const {dblClickPlay, dragstart, drop, removeFromPlaylist} = require('../app-methods/index');
const {trackMenu} = require('../context-menu/index');


module.exports = Vue.component('track-li', {
    props: [
        'name', 
        'link', 
        'durationPretty', 
        'duration', 
        'type', 
        'track', 
        'artists', 
        'fileName', 
        'album',
        'cover',
        'metadata', 
        'torrentIndex',
        'index',
        'info',
        'artist',
        'playlist'
    ],
    template: 
    `
    <li v-on:contextmenu="trackMenu" v-on:dblclick="dblClickPlay" class="track" draggable="true" v-on:dragstart="dragstart" v-on:drop="drop">
    <div v-if="!selectedAlbum.playlist" class="track-number"><p>{{track}}</p></div>
    <div v-else class="track-number"><p>{{index+1}}</p></div>
    <div class="track-name"><h4>{{name}}</h4></div>
    <div class="duration"><p>{{durationPretty}}</p></div>
    <div class="removeFromPlaylist">
        <i v-if="selectedAlbum.playlist" class="fas fa-times remove-playlist" v-on:click="remove"></i>
    </div>
    </li>
    `,
    methods: {
        dblClickPlay,
        dragstart,
        drop,
        trackMenu,
        remove(){
            removeFromPlaylist(this);
        }
    },
    data(){
        return {
            selectedAlbum: global.juke.selectedAlbum
        }
    }
})