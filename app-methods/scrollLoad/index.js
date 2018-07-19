module.exports = function (e) {

    let scrollTop = e.target.scrollTop;
    let clientHeight = e.target.clientHeight;
    
    if (global.juke.canLoadMore === true) {
        if (scrollTop >= clientHeight - 50) {
            global.juke.canLoadMore = false;
            global.juke.loadMore();
        }
        setTimeout(() => {
            global.juke.canLoadMore = true;
        }, 5000);
    }

}