const scraper = require('./insta-scrape-test.js')
const { run } = require('./insta-scrape-test.js');


var UN ='SentiScrape';
var PW ='kirklandExpo';
const celebHandle = '@cristiano'
const celebChoice = (celebHandle.split(/[@]/))[1]

async function getAndProcessComments (UN,PW,celebChoice){
    let data = await scraper.runScraper(UN,PW,celebChoice)
    cleanedComments = cleanComments(data)
    console.log(cleanedComments)
    return cleanedComments
}


getAndProcessComments(UN,PW)