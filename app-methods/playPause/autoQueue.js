module.exports = function (track) {

    let songs = track.$parent.$children.sort((a, b) => a.index - b.index);
    global.juke.queue = songs.slice(track.index + 1);

}