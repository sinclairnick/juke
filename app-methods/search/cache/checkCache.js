module.exports = function () {

    //if the searchCache > max cache size, remove the first item
    while (global.juke.searchCache.length > global.juke.cacheSize) {

        let removedSearch = global.juke.searchCache.shift();

    }

}