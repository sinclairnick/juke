const fs = require('fs');
const path = require('path');


let addonsFolder = fs.readdirSync(path.join(__dirname, 'add-ons'));
let searchAddons = [];

for (dir of addonsFolder) {

    if(!dir.startsWith('.')){
        try {
            let fn = require(`./add-ons/${dir}/index.js`);
            searchAddons.push(fn);
        }
        catch (e) {
            console.log(e);
        }
    }

}

module.exports = searchAddons;