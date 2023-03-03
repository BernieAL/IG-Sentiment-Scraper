*** For when instagram changes
    consider suggestive script - " target wasnt found but these elements could be an option for what you are looking for


***exhaustive search for element
    write function that has the text of the element youre looking for
    function will generate all possible locator combinations for find the element your looking for 
    it will also return all possible elements that are matches

    it would build the locator paths and pass to driver element
        all variations using the text you provided


    target = "log in"
    function (target)
        query1 = generated locator
        query2 = generated locator
        query3 = generated locator
        query4 = generated locator
    
        return the query that worked

    exhaustive and generative element search
    "button, text="login"

    possibly include css traits to help reduce search time.



*****

    find elements in a row using loop - these would need to be elements that arent dependant on another for appearance. So for login form, UN and PW inputs appear at same time and not dependant.
    we can locate them, store their locations,
    then iterate the locations and pass an order of operations to be performed
        elements = [username_web_element, pw_web_element]
        ops= [username,password]

        for i in elements(){
            element[0].sendkeys[ops[0]]
        }
