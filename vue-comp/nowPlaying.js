module.exports = Vue.component('now-playing', {
    props: ['song', 'context', 'artist', 'coverPath', 'contextName'],
    template:
        `<div class="now-playing">
            <div class="np-text">
                <div class="np-song" v-on:click="goToNowPlaying">
                        <h4>{{ contextName }}</h4>
                        <h3 :title="song">{{ song }}</h3>
                </div>
                <h5>{{ artist }}</h5>
            </div>
        </div>
    `,
    methods: {
        goToNowPlaying() {
            global.juke.selectedAlbum = global.juke.nowPlaying.album;
            global.juke.albumIsSelected = true;
        }
    }
})

