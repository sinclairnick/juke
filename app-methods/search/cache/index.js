const checkCache = require('./checkCache.js');

module.exports = function (lastSearch) {
    
    //add the existing query results to cache before running new search

    if (global.juke.searchQuery) {

        global.juke.searchCache.push({
            query: lastSearch.toLowerCase(),
            results: Object.assign([], global.juke.searchArray)
        });
        //remove first item of array, if [cacheSize] has been exceeded
        checkCache();
    }
    
        
}