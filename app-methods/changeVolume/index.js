const audioTags = document.querySelectorAll('audio');

module.exports = function (e) {

    audioTags.forEach(audioTag => {
        audioTag.volume = audioTag.dataset.default * e.target.value;
    })
    
}