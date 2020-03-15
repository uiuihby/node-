
const {getAllpages,getPageList} = require("./getAllPage.js");


// getAllpages("https://www.wrmyx.com/"); 


for (let index = 1; index < 5; index++) {
    getPageList(`https://www.tianyancha.com/search/p${index}?key=%E5%AE%81%E6%B3%A2%E5%BB%BA%E7%AD%91`);
}

