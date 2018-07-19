const cacheSearch = require('./cache/index');
const addons = require('./getAddons');

module.exports = function (event) {

    global.juke.albumIsSelected = false;

    //cache previous search results
    cacheSearch(this.searchQuery);

    //reset search results
    this.searchArray = [];
    this.page = 'search';
    this.searchQuery = event.target.value.toLowerCase();
    this.pageNumber = 1;


    //display results if already in cache, or search and then display
    let searchAlreadyCached = this.searchCache.find(obj => obj.query === this.searchQuery);

    if (searchAlreadyCached) {
        //serve cached search
        this.searchArray = searchAlreadyCached.results;
        console.log('Serving cached results');
    }
    else {
        //search for the query in saved albums and web and serve results
        if (this.savedAlbums) {
            for (alb of this.savedAlbums) {
                for (word of this.searchQuery.split(' ')) {
                    try {
                        if (alb.title.match(new RegExp(word, 'i')) || alb.artist.match(new RegExp(word, 'i'))) {
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

        if (addons) {
            for (fn of addons) {
                try {
                    fn(this.searchQuery, this.searchArray);
                }
                catch (e) {
                    console.log(e);
                }
            }
        }

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