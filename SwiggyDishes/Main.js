let {getLinks} = require('./restuarntsLink')
let {Getdata} = require('./dishes')
const puppeteer = require('puppeteer');


async function main(city,restaurants){
        const allLinks = await getLinks(city,restaurants);
        const browser = await puppeteer.launch({headless: false, args: ["--no-sandbox"]});
        let page = await browser.newPage();

        const arr = [];
        let count=0;
    
        for(let link of allLinks.links){
            count++;
            if(count > 2){
                break;
            }
          const data = await Getdata(link,page,allLinks.filteredRestuarnt);
          arr.push(data)  
        }

    await browser.close();
     return str;
}

module.exports = {main}