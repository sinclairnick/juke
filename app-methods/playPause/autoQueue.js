module.exports = function(track){
    let songs = track.$parent.$children.sort((a, b)=> {
        return a.index - b.index
    });
    let songIndex = track.index;
    global.juke.queue = songs.slice(songIndex + 1);
}