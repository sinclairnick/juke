module.exports = Vue.component('add-playlist', {
    template:
    `<div class="addPlaylist button" v-on:click="showInput" title="create a playlist">
        <i class="fas fa-plus"></i>
    </div>`,
    methods: {
        showInput(){
            global.juke.showPlaylistInput = !global.juke.showPlaylistInput;
        }
    }
})