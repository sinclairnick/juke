const request = require('request');
const cheerio = require('cheerio');

module.exports = function search (query, page = 1) {

    //modified "btdb-search" by mendes2713

    return new Promise((resolve, reject) => {

        var result = [];
        const option = { url: 'https://btdb.to/q/' + encodeURIComponent(query) + '/' + page + '?sort=popular' };
        request(option, function (err, resp, html) {
            if(err){
                console.log('BTDB search error:');
                reject(err);
            }
            else{
                var $ = cheerio.load(html);
                var elems = $('li[class=search-ret-item]'), count = elems.length - 1;
                if(!elems){
                    reject('Found no BTDB results.');
                }
                elems.each((index, element) => {
    
                    var magnet = $(element).find('a.magnet').attr('href');
                    var name = $(element).find('.item-title a').attr('title');
                    var size = $(element).find('.item-meta-info-value').eq(0).text();
                    var popularity = $(element).find('.item-meta-info-value').eq(3).text();
    
                    //converting into a useful metric
                    popularity /= 1000;
    
                    let torrent = { magnet, name, size, popularity };
                    result.push(torrent);
    
                    if (count === index) {
                        resolve(result);
                    }
    
                });
            }
        });
    })

};