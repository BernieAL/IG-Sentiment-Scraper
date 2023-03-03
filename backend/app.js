
const scraper = require('./insta-scrape-test.js')
const { run } = require('./insta-scrape-test.js');


const AI = require('./AI-script2.js')
const AIScript2 = require('./AI-script2.js');

const cors = require('cors');
const nodemon = require('nodemon');
const express = require('express')
const e = require('express');

const fs = require('fs').promises



const { until, promise } = require('selenium-webdriver');


const chalk = require('chalk')
const celebRecord = require('./models/celebRecordSchema')





var UN ='SentiScrape';
var PW ='kirklandExpo';

//======================================================

//DB SECTION
//db connection properties
require('dotenv').config()
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:123@cluster0.hyhot.mongodb.net/celebs?retryWrites=true&w=majority', {useNewUrlParser:true,useUnifiedTopology:true})
const db = mongoose.connection
db.on('error',(error)=> console.log(chalk.redBright('Not able to connect: ' + error)))
db.once('open', ()=>{})

//====================================================================
//REQUEST ROUTING
const app = express()
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());




app.get('/',(req,res)=>{
    res.send('Server is working')
})

app.get('/search',(req,res)=>{
    

    const celebHandle = req.query.celebhandle

    console.log(typeof(celebHandle))
    const celebChoice = (celebHandle.split(/[@]/))[1]
    mainDemo(celebHandle)

    async function mainDemo(celebHandle){
        let needNewScrape = await dateCompTest(celebHandle)
        console.log(needNewScrape)
        if(needNewScrape){
            console.log(chalk.red('::::Info outdated, Beginning New Scrape and Sentiment Analysis::::'))

            let scrapedComments = await getAndProcessComments(UN,PW,celebChoice)
            let cleanedComments = cleanComments(scrapedComments)
            let results = await AI.runAI(cleanedComments)

            //destructure returned AI results object
            let NegativeSentimentRating = results['toxicPercentage']
            let PositiveSentimentRating = results['nonToxicPercentage']
            let unclassified = results['unclassifiedComments']
            let toxicReducedArray = results['toxicReduced']
            let nonToxicReducedArray = results['nonToxicReduced']
                console.log('Toxic percentage: ' + NegativeSentimentRating)
                console.log('Non Toxic Percentage: ' + PositiveSentimentRating)
                console.log('Unclassified count: ' + unclassified)
                console.log('toxicReducedArr' + toxicReducedArray)
                console.log('nonToxicReducedArr' + nonToxicReducedArray)

            //get last post date from file:
            let lastPostDate = await getDateFromFile()
            console.log(lastPostDate)

            //update celeb record with new scrape data
            updateRecord(celebHandle,NegativeSentimentRating,PositiveSentimentRating,lastPostDate)
                res.send(JSON.stringify(results))   

        } else {
            let celebInfo = await getCelebInfoFromDB(celebHandle)
            res.send(celebInfo)
            // console.log(celebInfo)
            // res.send('object')
            //const response = {}
        }
        
        //clear file at end
        clearCommentsFile('comments.txt')
    }
})

        
    
    //END ROUTING
//===================================================================






//====================================================================


//CORE FUNCTIONS

// const celeb2 = new celebRecord({
//     Name: 'Jeffree Star',
//     Handle: '@jeffreestar',
// })
// saveRecord(celeb2)


//MAIN DEMO FUNCTION (to be placed in router later)
const celebHandle = '@cristiano'
const celebChoice = (celebHandle.split(/[@]/))[1]

async function mainDemo(celebHandle){
    let needNewScrape = await dateCompTest(celebHandle)
    console.log(needNewScrape)
    if(needNewScrape){
        console.log(chalk.red('::::Info outdated, Beginning New Scrape and Sentiment Analysis::::'))
       
        let scrapedComments = await getAndProcessComments(UN,PW,celebChoice)
        let cleanedComments = cleanComments(scrapedComments)
        let results = await AI.runAI(cleanedComments)

        //destructure returned AI results object
        let NegativeSentimentRating = results['toxicPercentage']
        let PositiveSentimentRating = results['nonToxicPercentage']
        let unclassified = results['unclassifiedComments']
        let toxicReducedArray = results['toxicReduced']
        let nonToxicReducedArray = results['nonToxicReduced']
            console.log('Toxic percentage: ' + NegativeSentimentRating)
            console.log('Non Toxic Percentage: ' + PositiveSentimentRating)
            console.log('Unclassified count: ' + unclassified)
            console.log('toxicReducedArr' + toxicReducedArray)
            console.log('nonToxicReducedArr' + nonToxicReducedArray)

        //get last post date from file:
        let lastPostDate = await getDateFromFile()
        console.log(lastPostDate)

        //update celeb record with new scrape data
        updateRecord(celebHandle,NegativeSentimentRating,PositiveSentimentRating,lastPostDate)


    } else {
        let celebInfo = await getCelebInfoFromDB(celebHandle)
        console.log(celebInfo)
        //const response = {}
    }
}
mainDemo(celebHandle)

//============================================================
async function getAndProcessComments (UN,PW,celebChoice){
    let data = await scraper.runScraper(UN,PW,celebChoice)
    cleanedComments = cleanComments(data)
    return cleanedComments
    //console.log(cleanedComments)
    //let results = await AI.runAI(cleanedComments)
    //return results
}

//=============================================================
//DB FUNCTIONS - MOVE TO SEPERATE MODULE LATER
//SAVE A NEW CELEB RECORD TO DB
async function saveRecord(celebData){
    var newRecord = new celebRecord();
    newRecord = celebData;
    newRecord.save((err,data)=>{
        if(err){
            console.log(err)
        } else {
            console.log(chalk.green(':::::Celeb Data Saved Successfully To DB: ' + newRecord ))
        }
    })
}
//saveRecord(celeb1)
//=============================================================
//UPDATE A CELEB'S RECORD
async function updateRecord(celebHandle,NegativeSentimentRating,PositiveSentimentRating,lastPostDate){

    //let lastPostDate = '2021-04-12'
    //let latestSentiment = 10;
    await celebRecord.findOneAndUpdate({Handle: celebHandle},{NegativeSentimentRating: NegativeSentimentRating,PositiveSentimentRating: PositiveSentimentRating,LastPost: lastPostDate})
    console.log(chalk.green(':::: Udpate successful for: ' + celebHandle))
   
}
//updateRecord(celebHandle,60,40,'2021-04-12')
//=============================================================

//GET CELEB RECORD FROM DB
async function getCelebInfoFromDB(celebHandle){
    let celebInfo = await celebRecord.findOne({Handle: celebHandle})
    return celebInfo
}
//GET DATE OF LAST POST FOR CELEB FROM DB
async function getDateFromDB(celebHandle){
   let celebInfo = await getCelebInfoFromDB(celebHandle)
   let latestPostDate = ((celebInfo['LastPost']).split(' '))[0] //targeting yyyy-mm-dd portion of date only
   //console.log('Last Post Date of ' + celebHandle + ': ' + latestPostDate)
    //console.log('getDateFromDB function ' + latestPostDate)
   return latestPostDate
}
//console.log(getDateFromDB('@kylieJenner'))


//==============================================================
//DATE FUNCTIONS - MOVE TO SEPERATE MODULE LATER

/*Celeb names comes in , we hit DB to if the last post date we have stored is 3 days or more older than current date
    if it is, run scraper function and update db with new sentiment date etc. - if not, pull current data */

    async function dateCompTest(celebHandle){

        let dateFromDB = await getDateFromDB(celebHandle)
        console.log('Date from DB: ' + dateFromDB)
        let currentDate = new Date().toISOString().slice(0, 10);
        console.log('Current date: ' + currentDate)
        //console.log((dateFromDB<currentDate)) //if db date is less than file 
         
        let needNewScrape = detailDateCompare(dateFromDB,currentDate)
        console.log(chalk.green('Stored date is 3 days or older than current date - new scrape needed: ' + needNewScrape))
        return needNewScrape// true if db date of last post is older than current date by 3 days or more
    }
 
    function detailDateCompare(dateFromDB,currentDate){
        
         let old = false;
 
         //split each date string into an array, seperated at each '-'
        let dateDB = dateFromDB.split('-')
        let dateCurrent = currentDate.split('-')
        
        let dateDB_year = dateDB[0]  //'yyyy'
        let dateDB_month = dateDB[1] //'mm'
        let dateDB_day = dateDB[2]  //'dd'
 
        let dateCurrent_year = dateCurrent[0]//'yyyy'
        let dateCurrent_month = dateCurrent[1]//'mm'
        let dateCurrent_day = dateCurrent[2]//'dd'
 
 
        if(dateDB_year == dateCurrent_year){
             compareMonth()
             
         } else if (dateDB_year < dateCurrent_year){ 
             old = true;
         }
 
 
        function compareMonth(){ 
             if(dateDB_month == dateCurrent_month){  // if same month, move to compare day
                 compareDay()
             } else if(dateDB_month < dateCurrent_month) {
                 old = true;
             }
         }
 
         function compareDay(){
             if(dateDB_day == dateCurrent_day){
                 old = false;
             } else if(dateDB_day < dateCurrent_day - 3){
                 old = true;
             }
         }
        return old;
    }
//  dateCompTest(celebHandle);
//=============================================================

//Extracts date of latest post from file to save to db
async function extractLastPostDateFromFile (file){
    let data = await fs.readFile(file,'utf-8')
    let t = data.split(/[|,~]+/) //split at '|,~' multiple
    let lastPostDateRow = t[1].split(' ')
    let lastPostDate = ((lastPostDateRow[2]).split(/[T]/))[0]//targeting yyyy-mm-dd portion of date only
    console.log(lastPostDate)
    return lastPostDate
}
async function getDateFromFile(){
    let date = await extractLastPostDateFromFile('comments.txt')
    return date;
} 
//getDate()
//===============================================================
//TEXT PROCESSING FUNCTIONS - MOVE TO SEPERATE MODULE LATER


//TEXT PROCESSING METHODS
/* COMMENT PREPROCESSING BEFORE PASSING TO AI */
function cleanComments(comments){
    let noSymbols = symStripFunc(JSON.stringify(comments))    //non alphanumeric symbols removed
    let noEmojis = emojiStrip(noSymbols)  //removes emojis, might be redundant because symStringFunc did it but just as a double measure.
    let commaSplitArray = noEmojis.split(",") //seperates comments at ',' and puts them in array
    let emptiesRemovedArray = commaSplitArray.filter( elem => elem !== " ") //removes all empty comments left from removing emojis
    //console.log(emptiesRemovedArray)
    return(emptiesRemovedArray)
}
/* Text processing function This removes all symbols that are not alphanumeric and in doing so, removes all emojis*/
function symStripFunc (dataIn) {
        let tempString = dataIn.replace(/[^a-z0-9/',]/gmi, " ").replace(/\s+/g, " ");
        //let tempString2 = tempString.replace(/[\,]+/g,"");
        let tempString2 = tempString.replace(/,+/g,',');
        return tempString2
}

//==============================================================
//this function will clear the prev celeb scraped comments from the comments.txt file
async function clearCommentsFile(file){   
   await fs.writeFile(file,' ')
}

//===============================================================


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});


//END

//------------------------------------------------------------------------------------------------------
/* RESOURCES AND NOTES :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: 

//check last modified date
// function lastModified (file){
//     fs.readFile(file,'utf-8',(err,data)=>{
//         let t = data.split(' ')
//         let r = t.slice(2,5)
//         console.log(r)
//     })
// }
// lastModified('comments.txt')



/* COMMENT PREPROCESSING BEFORE PASSING TO AI  -> this needs to go in AI script*/
    // fs.readFile('comments.txt','utf-8',(err,data)=>{
        
    //     let noSymbols = symStripFunc(data)    //non alphanumeric symbols removed
    //     let noEmojis = emojiStrip(noSymbols)  //removes emojis, might be redundant because symStringFunc did it but just as a double measure.
    //     let commaSplitArray = noEmojis.split(",") //seperates comments at ',' and puts them in array
    //     let emptiesRemovedArray = commaSplitArray.filter( elem => elem !== " ") //removes all empty comments left from removing emojis
    //     console.log(emptiesRemovedArray)
    // })
    // /* Text processing function
    //     THis removes all symbols that are not alphanumeric and in doing so, removes all emojis
    // */
    // const symStripFunc = (dataIn)=>{
    //     let tempString = dataIn.replace(/[^a-z0-9/',]/gmi, " ").replace(/\s+/g, " ");
    //     //let tempString2 = tempString.replace(/[\,]+/g,"");
    //     let tempString2 = tempString.replace(/,+/g,',');
    //     return tempString2
    // }
    

/*

https://github.com/nizaroni/emoji-strip
https://stackoverflow.com/questions/6456864/why-does-node-js-fs-readfile-return-a-buffer-instead-of-string
https://stackoverflow.com/questions/19245897/regex-to-remove-multiple-comma-and-spaces-from-string-in-javascript
https://stackoverflow.com/questions/20864893/replace-all-non-alpha-numeric-characters-new-lines-and-multiple-white-space-wi
https://stackoverflow.com/questions/40101734/regex-to-add-a-new-line-break-after-each-bracket
https://stackoverflow.com/questions/19245897/regex-to-remove-multiple-comma-and-spaces-from-string-in-javascript
https://salesforce.stackexchange.com/questions/301150/remove-multiple-commas-between-two-strings
https://nodejs.org/en/knowledge/file-system/how-to-read-files-in-nodejs/


asycn await
https://stackoverflow.com/questions/46867517/how-to-read-file-with-async-await-properly/46867579


compare dates:
https://stackoverflow.com/questions/14781153/how-to-compare-two-string-dates-in-javascript

https://stackoverflow.com/questions/29127006/how-to-use-range-with-greater-than-and-less-than
*/