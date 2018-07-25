const mag = require('magnetic-music');

module.exports = function () {
    //searches without resetting any state, and increments page number

    this.pageNumber++;
    mag({
        query: this.searchQuery,
        array: this.searchArray,
        page: this.pageNumber
    })
}