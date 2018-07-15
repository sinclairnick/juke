
const tpb = require('thepiratebay');
const sort = require('../../sort/index');

module.exports = function search(query, arr, page) {

    //tpb page 1 = page 0
    page--;

    tpb.search(query, {
        category: 'audio',
        page
    })
        .then(results => {

            if (results.length < 1) {
                console.log('No TPB results found');
            }
            else {
                results.forEach(result => {
                    sort(query, arr, result);
                })
            }

        })
        .catch(err => console.log(err))

}