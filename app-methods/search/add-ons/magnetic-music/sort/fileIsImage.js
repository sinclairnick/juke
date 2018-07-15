module.exports = function fileIsImage(file) {

    let imageFormats = ['.jpg', '.png', '.jpeg'];
    for (format of imageFormats) {
        if (file.name.endsWith(format)) {
            return true;
        }
    }
    return false;
}