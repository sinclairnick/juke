const audioTag = document.querySelector('audio#now-playing');

module.exports = function (e) {

    if (global.juke.nowPlaying && global.juke.nowPlaying.duration) {
        const playbar = document.querySelector('.play-bar');

        let clickX = e.offsetX;
        let playbarWidth = playbar.clientWidth;

        audioTag.currentTime = (clickX / playbarWidth) * global.juke.nowPlaying.duration;
    }
}