const fileInput = document.querySelector('input#fileelem');
const fs = require('fs');
const { dialog } = require('electron').remote;

module.exports = function () {
    fileInput.click();
}

fileInput.addEventListener('change', (e) => {

    for (file of e.target.files) {
        if (file.type === 'application/json') {
            console.log(file.path);
            try {
                fs.readFile(file.path, (err, data) => {
                    if (err) console.log(err);
                    global.juke.playlists.push(JSON.parse(data));
                });
            }
            catch (e) {
                dialog.showMessageBox({
                    type: 'error',
                    message: 'Could not read file ' + file.name + '. Please ensure it is a valid playlist file.'
                })
            }
        }
    }
    
})