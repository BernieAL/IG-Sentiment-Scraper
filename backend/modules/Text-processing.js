
const celebRecord = require('../models/celebRecordSchema')
const dbFunc = require('./DB-functions')
const dateFunc = require('./date-functions')


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


module.exports = {
    symStripFunc: symStripFunc,
    cleanComments: cleanComments

}