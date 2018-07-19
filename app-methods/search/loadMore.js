const juke = require('../../renderer');
const addons = require('./getAddons');

module.exports = function () {
    //searches without resetting any state, and incrememnts page number

    this.pageNumber++;
    if (addons) {
        for (fn of addons) {
            fn(this.searchQuery, this.searchArray, this.pageNumber);
        }
    }
}