const addToQueue = require('../addToQueue/index');


module.exports = function (e) {

    e.target.style.border = 'none';
    e.target.style.borderRadius = '0';
    e.target.style.background = 'none';

    for (item of global.juke.dragItem) addToQueue(item);

}