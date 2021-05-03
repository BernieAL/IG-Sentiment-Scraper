
const celebRecord = require('../models/celebRecordSchema')
const textProcessingFunc = require('./Text-processing')
const dateFunc = require('./date-functions')

require('dotenv').config()
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:123@cluster0.hyhot.mongodb.net/celebs?retryWrites=true&w=majority', {useNewUrlParser:true,useUnifiedTopology:true})
const db = mongoose.connection
db.on('error',(error)=> console.log(chalk.redBright('Not able to connect: ' + error)))
db.once('open', ()=>{})


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

//UPDATE A CELEB'S RECORD
async function updateRecord(celebHandle,NegativeSentimentRating,PositiveSentimentRating,lastPostDate){

    //let lastPostDate = '2021-04-12'
    //let latestSentiment = 10;
    await celebRecord.findOneAndUpdate({Handle: celebHandle},{NegativeSentimentRating: NegativeSentimentRating,PositiveSentimentRating: PositiveSentimentRating,LastPost: lastPostDate})
    console.log(chalk.green(':::: Udpate successful for: ' + celebHandle))
   
}
//updateRecord(celebHandle,60,40,'2021-04-12')


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

module.exports = {
    saveRecord: saveRecord,
    updateRecord: updateRecord,
    getDateFromDB: getDateFromDB
}