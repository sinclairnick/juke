require('./playlistNavItem');

module.exports = Vue.component('playlist-nav', {
    template: 
    `<ul id="playlist-nav">
        <playlist-nav-item v-for="(playlist, index) in playlists" :playlist="playlist" :key="index"></playlist-nav-item>
    </ul>`,
    props: ['playlists']
})