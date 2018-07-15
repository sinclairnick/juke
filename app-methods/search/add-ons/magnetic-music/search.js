//file to export all torrent-db search functions

const searchBTDB = require('./torrent-dbs/btdb/index');
const searchTPB = require('./torrent-dbs/tpb/index');

module.exports = function (query, arr, page) {
    searchBTDB(query, arr, page);
    searchTPB(query, arr, page);
    //add any other torrent-db search function invocations here

}