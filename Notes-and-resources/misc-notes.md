////////////////////MAIN SCRAPE FUNCTION /////////////////////
//const celebChoice = 'kyliejenner'

/* Call last modified first before running full scraping function 
    the goal is to put all data into db under celeb name, so a record for each celeb.
    If the date we have on file is older than 3 days, run the funciton as new and update the db
    otherwise pull the stored data and return to user
    the reason for this is because the scrape function takes awhile to run
*/




async function getAndProcessComments (UN,PW,celebChoice){
    let data = await scraper.runScraper(UN,PW,celebChoice)
    cleanedComments = cleanComments(data)
    return cleanedComments

    //console.log(cleanedComments)
    //let results = await AI.runAI(cleanedComments)
    //return results
}
// getAndProcessComments(UN,PW,celebChoice).then((results)=>{
//     console.log(results)
// })
//END MAIN SCRAPE FUNCTION

// const celeb1 = new celebRecord({
//     Name: 'Kylie Jenner',
//     Handle: '@kyliejenner',
//     LastPost:'2021-04-12 01:24:47.887840',
// })