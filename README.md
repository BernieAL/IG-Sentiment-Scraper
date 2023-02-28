# IG-Sentiment-Scraper
App creates React Front-end where user can select a celebrity figure from a list
When user selects a target, requst is sent to Flask API on back-end

Request body is Celebrity name

On back-end,
  script is run to check if DB record for celbrity exists already
    if yes: we check the date of the last collected data for the celebrity, 
      if  'last-scraped date' < 7 days old: the data is still considered fresh, retrieve last stored sentiment rating and return to user
      if not: perform fresh scrape
    if no: create record in DB and perform fresh extraction. Clean. Perform analysis and Store in DB
  Once ETL and analysis script has completed, return calculated setniment rating to front-end to be displayed to end-user


Front-end
  React for UI, and request made with JS fetch
 
Back-end
  Flask API for handling reqeust and controlling ETL operations
  Selenium for browser automation to Instragram + all other relevenat navigation and JS interaction needed to render comments on posts.
  Vanilla Python for cleaning and transformations + writing to output CSV files
  MongoDB for storing/retrieving data
  TensorFlow Pre-defined Toxicity Model for returning sentiment rating (interprets text of comments i.e "Dumb moron" = +1 to Negative Rating , "Beautiful" = +1 Positive rating")
  
