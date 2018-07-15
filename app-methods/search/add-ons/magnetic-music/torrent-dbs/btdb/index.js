const searchBTDB = require('./searchBTDB');
const sort = require('../../sort/index');


module.exports = function (query, arr, page = 1) {


    searchBTDB(query, page)
        .then(function (results) {
            if (results.length < 1) {
                console.log('Search could not be completed. BTDB servers may be down.\n')
            }
            else {
                results.forEach(result => {
                    sort(query, arr, result);
                })
            }

        })
        .catch(e=> console.log(e));

}

