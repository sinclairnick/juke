const fs = require('fs');
const hpath = require('home-path')();
const path = require('path');

module.exports = function () {

    fs.writeFile(path.join(hpath, 'documents', 'juke_library', 'savedAlbums.json'), JSON.stringify(global.juke.savedAlbums), (err) => {
        if (err) console.log(err);
    })

}