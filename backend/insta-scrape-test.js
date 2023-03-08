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



//ALTERNATE LOGIN CREDENTIALS to use in case other gets burnt
//username.sendKeys('bhurnalcodes') 
//password.sendKeys('s15koukie39') 


// ====================================

  async function main_scrape_and_write_func(un,pw,celebChoice){
      let driver = await new Builder().forBrowser('chrome').build();
    
      await driver.get('https://instagram.com');
      await driver.sleep(2000)
           
      const username_input = await findBy_type_and_text('input','Phone number, username, or email',driver)
      // await driver.wait(until.elementLocated(By.name('username'),2000))
      // element_status(U_name)
      await username_input.sendKeys(un)
      
      //finds pass
      const password_input = await findBy_type_and_text('input','Password',driver)
      //await driver.wait(until.elementLocated(By.name('password')),2000);
      // element_status(p_word)
      await password_input.sendKeys(pw)
      await driver.sleep(2000)

      //Finds Login button and clicks
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
      if (postNotifButton){
        await postNotifButton.click();
      }  
      
      //Navigate to target celeb IG page
      await driver.sleep(3000)
      await driver.get(`https://www.instagram.com/${celebChoice}/`);
      

      //This clicks latest post on profile - WORKING 3/7/23
      await driver.sleep(2000)
      const latestPost = await driver.wait(until.elementLocated(By.className('_aabd _aa8k _aanf')))
      await latestPost.click()

      await scrapeCommentsDriver(1) //POST NUM HERE !!! //hardcoded number of posts to get (2) chosen for testing, should be dynamically fed
      console.log(chalk.red(':::::DONE::::::'))
      // comments.unshift(latestPostDateAsString)
      return comments;
  }
//=================================================================================================
     



    // This is driver function for all the scraper functions
    //while counter less than desired amount of posts to scrape comments from   
  async function scrapeCommentsDriver(num_posts_to_visit){
      
      let i = 0
      while(i < num_posts_to_visit){
        
        let postNum = 'POST NUM: ' + i
        //array of scraped comments being returned from postComments
        let postComments = await scrapeCommentsFromPost(driver)
        console.log('scrapeCommentsDriver -> postComments array of web element' + postComments)
        
        //concat post num with array of extract comments - for labeling -> post 1~~~~~: + array of comments
        let post_num_label_for_comments = `${postNum} + ~~~~~: \n` + postComments 

        let tempArr = [post_num_label_for_comments]
        comments = tempArr
        driver.sleep(Math.random() * 2000)
        console.log('Comments for scrapeComments func: ' + comments)
        
        //write current extracted comments to file
        await writeCommentsToFile(comments)
        
        
        //go to next post
        nextPost(driver)
        i++;
      }
  }

//===================================================================


// HELPER FUNCTIONS SECTION

  /* READ
    This function is called for each post, it targets and scrapes the comments
    Instagram loads 12 comments at a time -> this function takes an argument specifying how many sets of comments to load and thus scrape
    Once the comments are scraped, they are pushed to the array 'arrayComments' and the array is returned from the function
    The array returned holds the comments from an individual post
  */     
   
  async function scrapeCommentsFromPost (driver) {   

    let arrayComments = new Array(); //array to hold date and comments from individual post
    
    //clicks '+' to load more another set of comments -> (driver,numOfCommentSets)
    //!!!!!!!!!!!!!! ADJUST NUM OF COMMENT SETS TO GET HERE!! !!!!!!!!!!!!!!
    try{
      
      //loads more comment sets onto page by clicking '+' at bottom of current comments
      await loadMore(driver,2); 
      
      //find parent element of all comments
      // let commentListRoot = await driver.wait(until.located(By.className('_a9z6 _a9za')),2000);
      
      //get all comment elements on page and put in array
      let comment_elements = await driver.findElements((By.className('_a9ym')),2000);
      console.log('COMMENT ELEMENTS ARRAY: ' + comment_elements + '---------------------------------')
      
      
      let nested_span_text = ''
      //extract span text from each comment element in comment_elements array & write to arrayComments
      for(i=0;i<comment_elements.length;i++){
          element = comment_elements[i]
          nested_span_text = await element.findElement(By.css('span')).getText()
          console.log('spanText for comment: ' + nested_span_text)
          arrayComments.push(nested_span_text)
      }
      console.log(arrayComments)

    } catch (error){
      console.log('Error in scrapeCommentsFromPost() ' + error  + '---------------------------------')
    }

    return arrayComments;
  }

//========================

//WRITE COMMENTS FROM ARRAYCOMMENTS Array TO FILE
async function writeCommentsToFile(comments){
  console.log(chalk.red('this is comments being printed from writeToFile function ' + comments))
  await comments.forEach((element)=>{
        elementSpace = element + ','
        fs.appendFile('raw_comments.txt',(elementSpace + '\n'),(err)=>{
          if(err){
            console.log('ERROR IN WRITING COMMENTS TO FILE')
          }
        })
      })
      console.log(chalk.red(':::::COMMENTS WRITTEN TO FILE::::::'))
}

//==================================================================


// POST NAVIGATION FUNCTIONS - clicking to next post and clicking to load more comments
//========================
/** function that clicks next arrow to get next post and begin scrape again */
async function nextPost (driver){
    
    try {
      // nextPostArrow_locator1 = 'body > div._2dDPU.CkGkG > div.EfHg9 > div > div > a._65Bje.coreSpriteRightPaginationArrow'
      // nextPostArrow_locator2 = '_aaqg _aaqh'
      // nextPostArray_locator3 = ''
  
      let nextPostArrow = await findBy_type_and_text('*','Next',driver)
      await driver.sleep(2500)
      nextPostArrow.click();
      console.log(chalk.red(':::::GOING TO NEXT POST::::::'))
    } catch (error) {
      console.log("Error from NextPost function" + error)
    }
}

//========================
// Loads more Comments from post
async function loadMore(driver,commentSets){
    try {
      i = 0;
      while(i < commentSets){
        await driver.sleep(2000)
        // const loadMore = await driver.wait(until.elementLocated(By.css('body > div._2dDPU.CkGkG > div.zZYga > div > article > div.eo2As > div.EtaWk > ul > li > div')),10000)
        const loadMore = await findBy_type_and_text('*','Load more comments',driver)
        loadMore.click()
        console.log(chalk.red(':::::LOADING COMMENTS::::::'))
        i++;
      }
    } catch (error) {
      console.log("Error from LoadMore function" + error)
    }
  }

//========================
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

//========================
  //this function writes celeb name, current date, and data of last post as file header
  async function get_latest_post_date(driver){
  
    try {
      let latestPostDate = await driver.wait(until.elementLocated(By.className('_aaqe'),2000)).getAttribute('datetime')  
      return latestPostDate
    } catch (err) {
      console.log('An error occurred while running the code:', err.message)
    }
  
  }
  
//======================== 
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
  
//========================
/** MAIN FUNCTION TO START WHOLE SCRAPING PROCESS */

 async function runScraper(UN,PW,celebChoice){
    let returnedComments = await main_scrape_and_write_func(UN,PW,celebChoice)
    return returnedComments
 } 
 
 var UN ='sentiscrape';
 var PW ='kirklandExpo';
 let celebChoice =  'cristiano'

 runScraper(UN,PW,celebChoice)

//=====================================================
//=====================================================

module.exports = {
    runScraper: runScraper,
}