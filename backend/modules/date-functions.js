

const celebRecord = require('../models/celebRecordSchema')
const dbFunc = require('./DB-functions.js')
const textProcessing = require('./Text-processing.js')



let celebHandle = '@kylieJenner'
//TESTING DATE COMPARISON

/*Celeb names comes in , we hit DB to if the last post date we have stored is 3 days or more older than current date
    if it is, run scraper function and update db with new sentiment date etc. - if not, pull current data */

    async function dateCompTest(celebHandle){

        let dateFromDB = await dbFunc.getDateFromDB(celebHandle)
        console.log('Date from DB: ' + dateFromDB)
        // let currentDate = new Date().toISOString().slice(0, 10);
        // console.log('Current date: ' + currentDate)
        // //console.log((dateFromDB<currentDate)) //if db date is less than file 
         
        // let needNewScrape = detailDateCompare(dateFromDB,currentDate)
        // console.log(chalk.green('Stored date is 3 days or older than current date - new scrape needed: ' + needNewScrape))
        // return needNewScrape// true if db date of last post is older than current date by 3 days or more
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
 dateCompTest(celebHandle);




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


 module.exports = {
     dateCompTest: dateCompTest,
     getDateFromFile: getDateFromFile
     
 }
 //===============================================================
 
 