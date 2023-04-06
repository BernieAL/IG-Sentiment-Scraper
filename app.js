
const cors = require('cors');
const nodemon = require('nodemon');
const express = require('express')
const { until, promise } = require('selenium-webdriver');
const chalk = require('chalk')
const fs = require('fs').promises



const date_util_functions = require('./DB_functions/date_util_functions.js');
const  scrape_func = require('./Scrape_Clean_functions/insta-scrape.js')
const process_text = require('./Scrape_Clean_functions/Text-processing.js')
// import {classify_comments}
const celebRecord = require('./DB_Schema/celebRecordSchema.js');
const { connect } = require('http2');

const {connectDB} = require('./DB_functions/connect_to_db.js')
const mongoose = require('mongoose')



var UN ='SentiScrape';
var PW ='kirklandExpo';

//======================================================

//DB SECTION


//====================================================================
//REQUEST ROUTING
const app = express()
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());



celebRecord.findOne({Handle:'@kyliejenner'}). 
    then(data => {
        console.log(data)
    })

// app.get('/',(req,res)=>{
//     res.send('Server is working')
// })

// app.get('/search',async (req,res)=>{
    
//     // get celeb handle off request
//     const celebHandle = req.query.celebhandle
//     // console.log(typeof(celebHandle))
//     const celebChoice = (celebHandle.split(/[@]/))[1]
    
//     // await mainScrapeFunction(celebHandle)

    
// })

        
    
//     //END ROUTING
// //==============================================================
// // HELPER FUNCTIONS
// async function mainScrapeFunction(celebHandle){
        
//     // db=connect_to_db()
//     //check if new scrape needed - compare current date to date in DB
//     let needNewScrape = await date_util_functions.dateComp(celebHandle)
//     console.log(needNewScrape)
//     if(needNewScrape){
//         console.log(chalk.red('::::Info outdated, Beginning New Scrape and Sentiment Analysis::::'))

//         let scrapedComments = await getAndProcessComments(UN,PW,celebHandle)
//         // let cleanedComments = cleanComments(scrapedComments)
//         // let results = await AI.runAI(cleanedComments)

      
//         //get last post date from file:
//         let lastPostDate = await date_util_functions.getDateFromFile(raw_comments_file)
//         console.log(lastPostDate)


//         //update celeb record with new scrape data
//         updateRecord(celebHandle,NegativeSentimentRating,PositiveSentimentRating,lastPostDate)
//             res.send(JSON.stringify(results))   

//     } else {
//         let celebInfo = await getCelebInfoFromDB(celebHandle)
//         res.send(celebInfo)
//         // console.log(celebInfo)
//         // res.send('object')
//         //const response = {}
//     }
    
//     //clear file at end
//     clearCommentsFile('comments.txt')
// }


// async function getAndProcessComments (UN,PW,celebChoice){
//     scrape_result = await extraction_processing_function.runScraper(UN,PW,celebChoice)
//     console.log(scrape_result)
//     text_process_result =  await extraction_processing_function.process_raw_comments(['test123',''])
//     console.log(text_process_result)
//     //console.log(cleanedComments)
//     //let results = await AI.runAI(cleanedComments)
//     //return results
// }

// //==============================================================
// //this function will clear the prev celeb scraped comments from the comments.txt file
// async function clearCommentsFile(file){   
//    await fs.writeFile(file,' ')
// }
// //===============================================================


// Only launch app if connection to DB was successful
connectDB()
        .then(() =>{
        
        console.log(chalk.greenBright('Connection to DB successful'))  
        
        app.listen(port, () => {
            console.log(chalk.greenBright(`Server is running on port: ${port}`));
        })
    })
    .catch(err => {
        console.log(chalk.redBright('Not able to connect: ' + err))
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