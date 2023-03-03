
const celebRecord = require('../models/celebRecordSchema')
const dbFunc = require('./DB-functions')
const emojiStrip = require('emoji-strip');
// const dateFunc = require('./date-functions')
const chalk = require('chalk')
const fs = require('fs')

let raw_comments = ""


try{
    raw_comments = fs.readFileSync('../raw_comments.txt', 'utf8')
    let cleaned_comments = cleanComments(raw_comments)
    console.log(chalk.red('::::CLEANED COMMENTS:::: ') + cleaned_comments)
} catch(error) {
    console.log(chalk.red('::::FILE READ ERROR:::: ') + error)
}

let cleaned_comments = cleanComments(raw_comments)
console.log(chalk.red('::::CLEANED COMMENTS:::: ') + cleaned_comments)

fs.appendFile('../cleaned_comments.txt',cleaned_comments.join('\n'),(err)=>{
    if (err) throw err;
    console.log('Cleaned comments written to file')
})

//TEXT PROCESSING METHODS
/* COMMENT PREPROCESSING BEFORE PASSING TO MODEL
   cleanComments takes raw_comments as a string and removes all non alphanumeric symbols

*/
function cleanComments(raw_comments){
    // console.log(raw_comments)
    let noSymbols = symStripFunc(raw_comments)   
    // console.log("No symbols output: " + noSymbols)
    let noEmojis = emojiStrip(noSymbols)  //removes emojis, might be redundant because symStringFunc did it but just as a double measure.
    // console.log("No emojis output: " + noEmojis)
    let commaSplitArray = noEmojis.split(",") //seperates comments at ',' and puts them in array
    // console.log("comma split array: " + commaSplitArray)
    let emptiesRemovedArray = commaSplitArray.filter( elem => elem !== " ") //removes all empty comments left from removing emojis
    // console.log(emptiesRemovedArray)
    return(emptiesRemovedArray)
}
/* Text processing function This removes all symbols that are not alphanumeric and in doing so, removes all emojis*/
function symStripFunc (raw_comments) {
        // console.log(raw_comments)
        let tempString = raw_comments.replace(/[^a-z0-9/',]/gmi, " ").replace(/\s+/g, " ");
        //let tempString2 = tempString.replace(/[\,]+/g,"");
        let tempString2 = tempString.replace(/,+/g,',');
        return tempString2
}


module.exports = {
    symStripFunc: symStripFunc,
    cleanComments: cleanComments

}