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
      `//{0}[contains(@onclick, '{1}')]`
    ];
    
    let found_element;
    let found_elements = []
    const actual_xpaths = xpaths.map(xpath => xpath.replace('{0}', element_type).replace('{1}', element_text));
    
    
    try{
      found_elements = await driver.wait(until.elementsLocated(By.xpath(actual_xpaths.join(' | '))));
      
      for(let i = 0;i<found_elements.length;i++){
        element = found_elements[i]
        

        const ariaLabel = await element.getAttribute('aria-label')
        const 
        
        // what if element doesnt have aria? 
        if (ariaLabel === await element.getAttribute('aria-label')) {
          console.log(chalk.green(`Found element with aria-label: ${ariaLabel}`));
          found_element = found_elements[i]
          break;
        }
        
      }
      // console.log(chalk.green('FOUND ELEMENT: ' + element_text))
      // console.log(chalk.green(JSON.stringify(found_element)))
      
   
      