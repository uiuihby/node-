
const cheerio = require('cheerio');
const httpGet = require("./httpGet");
const fs = require('fs');
let urlssss=[]
let topUrl="https://www.wrmyx.com"




 function getAllpages(url){
    
    httpGet(url,function(html){           // 获取每一个标签页

        let $ = cheerio.load(html);
        let pages= $('.pagination').children();

        pages.each(function(){
            let pageUrl=$(this).children().attr('href')?$(this).children().attr('href'):''
            let allPages=url+pageUrl
            if(allPages.indexOf("undefined")==-1){       
                getPageList(allPages)
            }
          
        });

    })

}


function getPageList (url){              // 获取列表  

    httpGet(url,function(html){  
        let $ = cheerio.load(html);
        let nav= $('.result-list').children();
        console.log(nav)
        nav.each(function(){
        console.log($(this).find('.header').find("a").attr('href'));
            let href=topUrl+$(this).find('.header').find("a").attr('href')
            console.log(href);
            if(href.indexOf("undefined")==-1){       
                getDetail(href)
            }
 

        });
    });
}

function getDetail(url){

    httpGet(url,function(html){  
        let pass=true
        let $ = cheerio.load(html);
        let index=0

        let detail= $('.company-warp').children();

        let data={
            title:null,
            phone:null,
            link:null,
        }
        
        detail.each(function(){
            console.log(url)
            data.title=$(this).find(".content").find(".name").text();
            data.phone=$(this).find(".f0").find(".sup-ie-company-header-child-1").text();
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
 module.exports = {
    getPageList:getPageList,
    getAllpages:getAllpages,
  }

