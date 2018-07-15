const Album = require('../js/Album');
const path = require('path');

module.exports = Vue.component('playlist-input', {
    template:
    `
        <input class="search-bar" type="text" placeholder="playlist name" v-on:keyup.enter.prevent="createPlaylist">
    `,
    methods: {
        createPlaylist(e){
            if(e.target.value){
                let al = new Album(e.target.value);
                al.cover = path.join('.', 'img', 'default-thumbnail.png');
                al.title = e.target.value;
                al.playlist = true;
                global.juke.playlists.push(al);
                global.juke.showPlaylistInput = false;
            }
        }
    }
})