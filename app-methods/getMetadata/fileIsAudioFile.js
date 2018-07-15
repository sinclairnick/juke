module.exports = function (song) {

    let audioFormats = ['.mp3', '.wav', '.m4a', '.aac', '.flac'];
    for (format of audioFormats) {
        if (song.name.endsWith(format)) {
            return true;
        }
    }
    return false;

}