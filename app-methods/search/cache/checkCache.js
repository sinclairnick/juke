
module.exports = function () {
    
    //if the searchCache exceeds the max cache size, remove the first item
    while (global.juke.searchCache.length > global.juke.cacheSize) {
        console.log('Cache is too large, removing first item from queue');
        let removedSearch = global.juke.searchCache.shift();

        //TODO: delete covers of shift()ed search results
        console.log(removedSearch);
    }

}