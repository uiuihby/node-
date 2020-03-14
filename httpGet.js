const https = require('https');

function httpGet(url,callback){
    https.get(url, function (res) {
        let chunks = [],
            size = 0;
        res.on('data', function (chunk) {
            chunks.push(chunk);
            size += chunk.length;
        });
    
        res.on('end', function () {
            let data = Buffer.concat(chunks, size);
            let html = data.toString();
            callback(html)
        });
    })
}

module.exports = httpGet