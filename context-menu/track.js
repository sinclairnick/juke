const { remote } = require('electron');
const { Menu, MenuItem } = remote;
const { addToQueue, removeFromPlaylist } = require('../app-methods/index');
const fs = require('fs');
const path = require('path');

let track;
let playlistSubMenu = [];


module.exports = function () {

    if (this.$el.classList.contains('track')) {
        track = this;

        playlistSubMenu = [];

        global.juke.playlists.forEach((playlist, index) => {

            playlistSubMenu.push({
                label: playlist.linkName,
                click() {
                    addToPlaylist(track, index);
                }
            })
        })

        let menu = Menu.buildFromTemplate([
            {
                label: 'Add to Queue',
                click() {
                    addToQueue(track);
                }
            },
            {
                label: 'Add to Playlist',
                submenu: playlistSubMenu
            }
        ]);

        if (global.juke.selectedAlbum.playlist) {
            menu.append(new MenuItem({
                label: 'Remove from playlist',
                click() {
                    removeFromPlaylist(track);
                }
            }))
        }


        menu.popup(remote.getCurrentWindow());
    }

}

function addToPlaylist(track, index) {
    global.juke.playlists[index].songs.push(track.info);

    fs.writeFileSync(path.join(__dirname, '..', 'boot', 'playlists', 'playlists.json'), JSON.stringify(global.juke.playlists));
}