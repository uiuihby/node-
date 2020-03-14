const https = require('https');
const cheerio = require('cheerio');
let topUrl = 'https://www.wrmyx.com';





function getPageDetail(url){
    httpGet(url,function(html){
        let $ = cheerio.load(html);
        let article= $('.view-title').text();
        console.log(article);
    })
}


function getPageList(url){
    httpGet(url,function(html){
       
        let $ = cheerio.load(html);
        let article= $('.article-list-1').children();

        article.each(function(){
            let href=topUrl+$(this).find(".post-title").find("a").attr("href")
            console.log(href);
            return 
            getPageDetail(href)
        });

    })
}



httpGet(topUrl,function(html){
    let $ = cheerio.load(html);
    let nav= $('.nav').find('ul').children();

    nav.each(function(){
        let href=topUrl+$(this).children().attr('href')
        getPageList(href)
    });

})
