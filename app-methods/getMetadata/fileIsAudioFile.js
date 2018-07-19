const audioFormats = ['.mp3', '.wav', '.m4a', '.aac', '.flac'];

module.exports = function (song) {

    for (format of audioFormats) {
        if (song.name.endsWith(format)) return true;
    }
    return false;

}