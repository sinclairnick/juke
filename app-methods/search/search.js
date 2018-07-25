const cacheSearch = require('./cache/index');
const mag = require('magnetic-music');


module.exports = function (event) {

    global.juke.albumIsSelected = false;

    //cache previous search results
    cacheSearch(this.searchQuery);

    //reset search results
    this.searchArray = [];
    this.page = 'search';
    this.searchQuery = event.target.value.toLowerCase();
    this.pageNumber = 1;


    let searchAlreadyCached = this.searchCache.find(obj => obj.query === this.searchQuery);
    
    //display results if already in cache
    if (searchAlreadyCached) {
        //serve cached search
        this.searchArray = searchAlreadyCached.results;
        console.log('Serving cached results');
    }
    //or search and then display
    else {
        //search for the query in saved albums and web and serve results
        if (this.savedAlbums) {
            for (alb of this.savedAlbums) {
                for (word of this.searchQuery.split(' ')) {
                    try {
                        if (( alb.title && alb.title.match(new RegExp(word, 'i')) ) || ( alb.artist && alb.artist.match(new RegExp(word, 'i'))) ){
                            if (this.searchArray.indexOf(alb) < 0) {
                                this.searchArray.push(alb);
                            }
                        }
                    }
                    catch (e) {
                        console.log(e);
                    }
                }
            }
        }

        mag({
            query: this.searchQuery,
            array: this.searchArray
        });

    }

    //check every X seconds to see if first page is filled with results
    let x = 10000;
    let int = setInterval(() => {
        if (this.searchArray.length < 13) {
            this.loadMore();
        }
        else {
            clearInterval(int);
        }
        x *= 1.2;
    }, x);

}