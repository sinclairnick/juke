const getHomePath = require('home-path');
const fs = require('fs');

module.exports = Vue.component('playlist', {
    template:
        `<li class="playlist" v-on:mouseleave="hideOptions">
            <div class="title" v-on:click="selectPlaylist">
                <h3>{{album.title}}</h3>
            </div>
            <div class="ellipsis" v-on:click="showOptions">
                <i class="fas fa-ellipsis-h"></i>
            </div>
            <transition name="fade">
                <div v-if="showPlaylistOptions" class="options" id="options" v-on:mouseleave="hideOptions">
                    <ul>
                        <li v-on:click="exportPlaylist" class="export">Export</li>
                        <li v-on:click="deletePlaylist" class="delete">Delete</li>
                    </ul>
                </div>
            </transition>
        </li>`,
    props: ['album', 'index'],
    methods: {
        selectPlaylist() {
            global.juke.selectedAlbum = this.album;
            global.juke.albumIsSelected = true;
        },
        showOptions() {
            this.showPlaylistOptions = true;
        },
        hideOptions() {
            this.showPlaylistOptions = false;
        },
        exportPlaylist() {
            console.log(this);
            let homePath = getHomePath();
            fs.writeFile(homePath + '/desktop/' + this.album.linkName + '.json',
                JSON.stringify(global.juke.playlists[this.index]), (err) => {
                    if (err) console.log(err)
                    else {
                        let noti = new Notification('Playlist Exported', {
                            body: 'The playlist file can be found on your desktop. You can import this file to add it back to Juke, if it gets deleted.'
                        })
                        setTimeout(noti.close.bind(noti), 10000);
                    }
                });
        },
        deletePlaylist() {
            global.juke.playlists.splice(this.index, 1);
        }
    },
    data() {
        return { showPlaylistOptions: false }
    }
})