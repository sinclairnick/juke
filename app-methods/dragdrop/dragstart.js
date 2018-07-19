module.exports = function (e) {
    
    global.juke.dragItem = [];

    if (this.songs) {
        for (song of this.songs) {
            global.juke.dragItem.push(song);
        }
    }
    else if (this.link) {
        global.juke.dragItem.push(this)
    }
}