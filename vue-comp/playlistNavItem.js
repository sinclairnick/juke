module.exports = Vue.component('playlist-nav-item', {
    template: 
    `<li :album="playlist" v-on:click="showPlaylist">
        <h4>{{playlist.title}}</h4>
    </li>`,
    props: ['playlist'],
    methods: {
        showPlaylist(){
            global.juke.selectedAlbum = this.playlist;
            global.juke.albumIsSelected = true;
        }
    }
})