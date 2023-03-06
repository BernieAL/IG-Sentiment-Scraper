/* RESOURCES 
https://www.reddit.com/r/learnpython/comments/bdpjz1/is_it_possible_to_scrape_instagram_comments_for/
https://www.bestproxyreviews.com/instagram-scraper/
https://stackoverflow.com/questions/59824750/scraping-all-comments-under-an-instagram-post 
https://github.com/arc298/instagram-scraper
https://stackoverflow.com/questions/26400943/selenium-webdriver-how-to-select-records-from-table-by-fetching-excel-input?rq=1
https://stackoverflow.com/questions/41405697/how-to-extract-instagram-data
https://www.selenium.dev/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_By.html
https://www.youtube.com/watch?v=iJGvYBH9mcY&ab_channel=PythonSimplified
SLEEP
https://www.selenium.dev/selenium/docs/api/javascript/module/selenium-webdriver/ie_exports_Driver.html#sleep
  Ex.   await driver.sleep(5000)
  Attribute selectors
  5.8 Attribute selectors
CSS 2.1 allows authors to specify rules that match elements which have certain attributes defined in the source document.
https://www.w3.org/TR/CSS2/selector.html#adjacent-selectors
SELECTING CHILDREN OF NODE
https://stackoverflow.com/questions/5119655/xpath-to-get-all-child-nodes-elements-comments-and-text-without-parent/5119937
Await examples
https://medium.com/@giltayar/javascript-asynchrony-and-async-await-in-selenium-webdriver-tests-a89924421f65


***** chromedriver not on path -> fixed by adding 'require chromedriver' and installing chromedriver with npm
https://stackoverflow.com/questions/26191142/selenium-nodejs-chromedriver-path 

*/




const {By,Builder,Key,util,withTagName,cssSelector,Select, WebDriver,until, promise,Promise,Map,map} = require('selenium-webdriver');
require('chromedriver')
const { elementIsDisabled } = require('selenium-webdriver/lib/until');
const fs = require('fs')
const chalk = require('chalk')
let comments = []


/*
  This function is called for each element we attempt to find
  If element is found, it will display - FOUND element_name
  If element isnt found, it will display - NOT FOUND element_name
  
  It recieves the web element object we are searching for located by driver.
  Ex. 
      const loginForm = await driver.wait(until.elementLocated(By.css('#loginForm'),2000))
      element_status(element)

      Then in element_status
      Ex. Recieves element
          prints (Object.keys(argument.callee)[0]) which would print the name of the var passed to the function
          Ex. prints ('loginForm')


*/
async function element_status(element_name,element){
  if (element) {
    // If element is found, log its details
    element_details = {
      elementName: element_name,
      TagName: await element.getTagName(),
      ID: await element.getAttribute('id'),
      Class: await element.getAttribute('class'),
      Text: await element.getText()
    }
    console.log(chalk.green(JSON.stringify(element_details)))
    console.log(chalk.green('-------------------------'))
  } else {
    // If element is not found, log a message
    console.log(chalk.red('Element not found' + element_name));
  }
}

// ====================================

async function main_scrape_func(un,pw,celebChoice){
      let driver = await new Builder().forBrowser('chrome').build();
    
      await driver.get('https://instagram.com');
      await driver.sleep(2000)

      // // locate username element and enter credentials
      // const username = await driver.wait(until.elementLocated(By.name('username')),2000);
      // username.sendKeys(un) 
      // //username.sendKeys('bhurnalcodes') 
      
      // // locate password element and enter credentials
      // const password = await driver.wait(until.elementLocated(By.name('password')),2000);
      // password.sendKeys(pw) 
      // //password.sendKeys('s15koukie39') 

            
      const U_name = await findBy_type_and_text('input','Phone number, username, or email',driver)
      // await driver.wait(until.elementLocated(By.name('username'),2000))
      // element_status(U_name)
      await U_name.sendKeys(un)
      
      const p_word = await findBy_type_and_text('input','Password',driver)
      //await driver.wait(until.elementLocated(By.name('password')),2000);
      // element_status(p_word)
      await p_word.sendKeys(pw)
      
      const loginButton = await findBy_type_and_text('*','Log in',driver)
      await loginButton.click()
      
      //to clear "save login info" prompt by clicking "not now"
      await driver.sleep(2000)
      const saveLoginInfoButton = await findBy_type_and_text('*','Not Now',driver)
      await saveLoginInfoButton.click();

      //to clear turn on post notif button - NOT NECESSARY because doesnt prevent navigation to celeb using URL
      await driver.sleep(1000)
      // need to element by text containing 'not now'
      const postNotifButton =  await findBy_type_and_text('*','Not Now',driver)
      // const postNotifButton =  await driver.wait(until.elementLocated(By.className('aOOlW   HoLwm ')));
      await postNotifButton.click();
      

    // NOT NEEDED - function for keying in celeb name into search bar and selecting from IG results 
    // The other option here is the manually enter the celebs name in the search bar and click the first result. I tried this and it was tricky 
    // This was the code. It would enter the celeb name and then hit enter, then enter again, this would go to the actual celebs page
        // const searchButton =  await driver.wait(until.elementLocated(By.className('XTCLo x3qfX')));
        // await searchButton.sendKeys('Kim Kardashian',Key.RETURN)
        // driver.sleep(1000)
        // await searchButton.sendKeys(Key.RETURN)
        //await searchButton.sendKeys(Key.RETURN)
        //await searchButton.sendKeys(Key.RETURN)
      
      
      //Navigate to target celeb IG page
      await driver.sleep(3000)
      await driver.get(`https://www.instagram.com/${celebChoice}/`);
      

    //This clicks latest post on profile
      await driver.sleep(2000)
      const latestPost = await driver.wait(until.elementLocated(By.className('_aabd _aa8k _aanf')))
      await latestPost.click()


    //NOT NEEDED - GETS name of the person and stores in file. Uses unshift to store
    //Appends to the beginning of the array, then use unshift on the latestPostDate
    // let userName = await driver.findElement(By.className('xt0psk2'))
    // let text = await userName.getText()
    // console.log(text)
    // // let userNameAsString = 'Username: ' + userName + '|'
    // // fs.appendFile('comments.txt',userNameAsString,(err)=>{
    // //   if(err){
    // //     console.log(err)
    // //   }
    // // })

    // Write celeb name to file as header

    let userNameAsString = 'Username: ' + celebChoice + '|'
      fs.appendFile('raw_comments.txt',userNameAsString,(err)=>{
        if(err){
          console.log(err)
        }
        chalk.red('successfully wrote username to file')
      })

    //Write date of latest post to file next to celeb name
    try {
      let latestPostDate = await driver.wait(until.elementLocated(By.className('_aaqe'),2000)).getAttribute('datetime')  
      console.log(latestPostDate)
      let latestPostDateAsString = 'LATEST POST: ' + latestPostDate + '|'
      fs.appendFile('raw_comments.txt', latestPostDateAsString, (err) => {
        if (err) {
          console.log(err)
        }
      })
      console.log(chalk.red('successfully wrote latest post date to file'))
    } catch (err) {
      console.log('An error occurred while running the code:', err.message)
    }
    

    // This is driver function for all the scraper functions
    //while counter less than desired amount of posts to scrape comments from
    //
    try{
      async function scrapeComments(num_posts_to_visit){
          let i = 0
          while(i < num_posts_to_visit){
            //comments = await scrapeCommentsFromPost(driver)
            let postNum = 'POST NUM: ' + i
            let postComments = await scrapeCommentsFromPost(driver)
            let numberedScrape = postNum + '~~~~~' + postComments
            let tempArr = [numberedScrape]
            comments = tempArr
            driver.sleep(Math.random() * 2000)
            //console.log(comments)
            await writeToFile(comments)
            nextPost(driver)
            i++;
          }
      }
    }catch (error){
      console.log('Error scraping comments' + error)
    }
    
    await scrapeComments(3) //POST NUM HERE !!! //hardcoded number of posts to get (2) chosen for testing, should be dynamically fed
    console.log(chalk.red(':::::DONE::::::'))
    comments.unshift(latestPostDateAsString)
    return comments;
}
//=================================================================================================
     
  /*TARGETING COMMENTS SECTION
      Goal:  Target UL of all comments - class: XQXOT pxf-y,
             Then in the UL, get all Mr508 elements, these are comments
  */
  

          // const commentsList = await (await driver.findElement(By.xpath('/html/body/div[4]/div[2]/div/article/div[3]/div[1]/ul'))).getAttribute('innerText')
          // console.log(commentsList)
      

     /* READ
        This function is called for each post, it targets and scrapes the comments
        Instagram loads 12 comments at a time -> this function takes an argument specifying how many sets of comments to load and thus scrape
        Once the comments are scraped, they are pushed to the array 'arrayComments' and the array is returned from the function
        The array returned holds the comments from an individual post
      */     
   
  
  async function scrapeCommentsFromPost (driver) {   

    let arrayComments = new Array(); //array to hold date and comments from individual post
    
    //clicks '+' to load more another set of comments -> (driver,numOfCommentSets)
    await loadMore(driver,20); //!!!!!!!!!!!!!! ADJUST NUM OF COMMENT SETS TO GET HERE!! !!!!!!!!!!!!!!

    //**targeting list of comments UL class: 'XQXOT pxf-y' , this returns a web element promise
    // let commentListRootPromise = await driver.wait(until.located(By.class('_a9z6 _a9za')),2000);
    
    //
    let commentListChildren = await commentListRootPromise.findElements(By.className('_aacl _aaco _aacu _aacx _aad7 _aade'))

    
    /**Iterate each Mr508, find span, and extract inner text, this is the pure comment text, 
      then push to arrayComments */
    for(i=0;i<commentListChildren.length;i++){
      //**get span section of 508 to then get text from span using 'innerText' NEED TO DO THIS FOR EACH 508 element
        // let spanText508 = await commentListChildren[i].findElement(By.css('.C4VMK > span'))
        let spanText = await commentListChildren.getAttribute('text')
      //**then get innerText
        // let innerText = await spanText.getAttribute('innerText').then((text)=>{
        //     //console.log('this is just the text: '+ text) -FOR TESTING
        //     //innerText = text; FOR TESTING
        //     return text
        // })
        //console.log('this is innnerText: ' + innerText)- FOR TESTING
        arrayComments.push(spanText)
    }
    
    //console.log('m length is '+ arrayComments.length)
    //console.log('this is arrayComments contents: ' + arrayComments) //checking of of array contents
    
    return arrayComments;
  // END MAIN
//--------------------------------------------------------------  

//WRITE COMMENTS FROM ARRAYCOMMENTS Array TO FILE
function writeToFile(comments){
    comments.forEach((element)=>{
      elementSpace = element + ', '
        fs.appendFile('raw_comments.txt',elementSpace,(err)=>{
          if(err){
            console.log('error')
          }
        })
      })
      console.log(chalk.red(':::::COMMENTS WRITTEN TO FILE::::::'))
    }
//------------------------------------------------------------------
//==================================================================


// POST NAVIGATION FUNCTIONS - clicking to next post and clicking to load more comments

/** function that clicks next arrow to get next post and begin scrape again */
  async function nextPost (driver){
    nextPostArrow_locator1 = 'body > div._2dDPU.CkGkG > div.EfHg9 > div > div > a._65Bje.coreSpriteRightPaginationArrow'
    nextPostArrow_locator2 = ""

    let nextPostArrow = await driver.findElement(By.css('body > div._2dDPU.CkGkG > div.EfHg9 > div > div > a._65Bje.coreSpriteRightPaginationArrow'))
    await driver.sleep(2500)
    nextPostArrow.click();
    console.log(chalk.red(':::::GOING TO NEXT POST::::::'))
  }
  /* this alternate version of nextPost using the RIGHT arrow key to visit next post in case the right post arrow is not located*/
  // async function nextPost2(driver){
  //   await driver.sleep(2500)
  //   driver.sendKeys(Key.RIGHT)
  // console.log(chalk.red(':::::GOING TO NEXT POST::::::'))
  // }

// Loads more Comments from post/
async function loadMore(driver,commentSets){
    i = 0;
    while(i < commentSets){
      await driver.sleep(2000)
      // const loadMore = await driver.wait(until.elementLocated(By.css('body > div._2dDPU.CkGkG > div.zZYga > div > article > div.eo2As > div.EtaWk > ul > li > div')),10000)
      const loadMore = await findBy_type_and_text('*','Load more comments',driver)
      loadMore.click()
      i++;
    }
    console.log(chalk.red(':::::LOADING COMMENTS::::::'))
  }
//=================================================================
/** MAIN FUNCTION TO START WHOLE SCRAPING PROCESS */

 async function runScraper(UN,PW,celebChoice){
    let returnedComments = await main_scrape_func(UN,PW,celebChoice)
    return returnedComments
 } 
 
 var UN ='sentiscrape';
 var PW ='kirklandExpo';
 let celebChoice =  'jakepaul'
runScraper(UN,PW,celebChoice)

//======================================================

/* 
using replace() to bind actual value to placeholder at runtime. {} used to inject vars into string
element_type -> is it a button, input, a, div etc
element_text -> specific text of the element, Ex. Login button has the text 'Login'
*/

async function findBy_type_and_text (element_type,element_text,driver){
  // let elements = []


  const xpaths = [
    `//{0}[contains(@aria-label, '{1}')]`,
    `//{0}[contains(@placeholder, '{1}')]`,
    `//{0}[contains(@id, '{1}')]`,
    `//{0}[contains(@name, '{1}')]`,
    `//{0}[contains(@value, '{1}')]`,
    `//{0}[contains(text(), '{1}')]`,
    `//{0}[contains(@title, '{1}')]`,
    `//{0}[contains(@alt, '{1}')]`,
    `//{0}[contains(@href, '{1}')]`,
    `//{0}[contains(@class, '{1}')]`,
    `//{0}[contains(@onclick, '{1}')]`,
    `//{0}[contains(@type, 'submit') and contains(text(), '{1}')]`
  ];
  
  let found_element;
  let found_elements = []
  const actual_xpaths = xpaths.map(xpath => xpath.replace('{0}', element_type).replace('{1}', element_text));
  
  
  try{
    found_elements = await driver.wait(until.elementsLocated(By.xpath(actual_xpaths.join(' | '))),5000);
    found_element = found_elements[0]
    // console.log(found_elements)
    console.log(chalk.green('-------------------------'))
    return found_element
    // return found_elements or found_element?
      
    

    } catch(error){
      console.log(chalk.red('ELEMENT NOT FOUND: ' + element_text + '-' + error))
      return 
    }

    
    
    

  }

//=====================================================

module.exports = {
    runScraper: runScraper,
    
}