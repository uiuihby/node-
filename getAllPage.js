
const cheerio = require('cheerio');
const httpGet = require("./httpGet");
const fs = require('fs');
let urlssss=[]
let topUrl="https://www.wrmyx.com"


const  getAllNav=function(url){
    name = 'Mark';
    this.topUrl=url
    httpGet(url,function(html){           // 获取每一个标签页
      
        let $ = cheerio.load(html);
        let nav= $('.nav').find('ul').children();

        nav.each(function(){
            let nowUrl=$(this).children().attr('href')
            let href=topUrl+nowUrl
            getAllpages(href);
        });

    })
}

function getAllpages(url){
    
    httpGet(url,function(html){           // 获取每一个标签页

        let $ = cheerio.load(html);
        let pages= $('.pagination').children();

        pages.each(function(){
            let pageUrl=$(this).children().attr('href')?$(this).children().attr('href'):''
            let allPages=url+pageUrl
            getPageList(allPages)
        });

    })

}


function getPageList (url){

    httpGet(url,function(html){  
        let $ = cheerio.load(html);
        let nav= $('.col-md-8').find('.article-list-1').children();

        nav.each(function(){
            let href=topUrl+$(this).find(".post-title").children().attr('href')
            if(href.indexOf("undefined")==-1){           
                getDetail(href)
            }
 

        });
    });
}
let index=0
function getDetail(url){
    index+=1
    httpGet(url,function(html){  
        let pass=true
        let $ = cheerio.load(html);
        let detail= $('.view-content').children();
        let index=0
        let data={
            title:null,
            bodyMsg:null,
            link:null,
        }
        detail.each(function(){

            if(index==0){
                data.title=$(this).find("span").text();

            }else {
                data.bodyMsg=$(this).find("span").text();
                data.link=$(this).find("a").attr('href');
            }
            index+=1
            urlssss.forEach(e => {
                if(e.title==data.title){
                    pass=false
                }   
            });
            if(pass){
                urlssss.push(data)
                fs.writeFileSync('test.json',JSON.stringify(urlssss));
            }
 
        });

    });
}
 module.exports = getAllNav

