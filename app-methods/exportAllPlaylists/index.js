const fs = require('fs');
const path = require('path');
const { dialog } = require('electron').remote;
const fileDest = document.querySelector('.export-dest');

module.exports = function () {
    let errored = false;

    fileDest.click();

    fileDest.addEventListener('change', (e) => {
        let exportPath = e.target.files[0].path;

        if (global.juke.playlists) {
        if(
            !fs.existsSync(exportPath)
        ){
            fs.mkdirSync(exportPath, (err) => {
                if (err) console.log(err);
            })
        }

        try {
            global.juke.playlists.forEach((playlist, index)=> {
                fs.writeFileSync(path.join(exportPath, `${index}_${playlist.title}.json`), JSON.stringify(playlist), (err) => {
                    console.log(err);
                    if (err) {
                        errored = true;
                        dialog.showMessageBox({
                            type: 'error',
                            message: 'An error occured\n' + err,
                        })
                    }

                })
            }
        )
        }
        catch (err) {
            errored = true;
            dialog.showMessageBox({
                type: 'error',
                message: 'An error occured\n' + err,
            })
        }
        if(!errored){
            new Notification('Success', {
                body: 'Playlists exported successfully'
            })
        }
    }
    })

    
}