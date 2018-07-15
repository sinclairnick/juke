module.exports = function fileIsAudio(file) {

    let audioFormats = ['.mp3', '.wav', '.m4a', '.aac', '.flac'];
    
    for (format of audioFormats) {
        if (file.name.endsWith(format)) {
            return true;
        }
    }
    return false;

}