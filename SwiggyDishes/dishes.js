async function Getdata(url,page,filteredRestuarnt) {
      await page.setDefaultNavigationTimeout(0);
      await page.goto(url);
      await page.waitForSelector('[data-testid="normal-dish-item"] > div > div:first-of-type');

      // Extract dish data
      let dishes = [];
      let dishElements = await page.$$('[data-testid="normal-dish-item"] > div > div:first-of-type');
      const hotelName =  await page.$eval('h1',n=>n.title)
     
      //Apply Offer if existes
      let BestOffer =  await page.$eval('._3lvLZ',n => n.innerText)
      BestOffer = BestOffer.split(" ")
      let percentage = Number(BestOffer[0].substring(0,BestOffer[0].length-1));
      limit = Number(BestOffer[4].substring(1,BestOffer[4].length))
      let filteredDishes =[]
      
    // Check if Restaurant is present in Query Filter
      if(!filteredRestuarnt.includes(hotelName) && filteredRestuarnt.length > 0){
         return  { [hotelName] : { dishes : filteredDishes }}
      }
           


    let finalPrice = 0;
    counter++;
    str += counter +" ." + hotelName +":" + " " 
      for (const dishElement of dishElements) {
        const dishName = await dishElement.$eval('h3', node => node.textContent);
        let dishPrice = Number(await dishElement.$eval('.rupee', node => node.textContent));
        let discount = (dishPrice * (percentage) / 100)
        let dishPriceAfterDiscount = discount < limit ? Number(dishPrice - discount) : Number(dishPrice - limit);
        if(isNaN(dishPriceAfterDiscount)){
            dishes.push({ dishName, dishPrice})
             finalPrice += dishPrice
             if(dishPrice >= 200 && dishPrice <= 300) str += dishName +" "
        }else{
            dishes.push({ dishName, dishPrice: dishPriceAfterDiscount}); 
            finalPrice += dishPriceAfterDiscount
           if(dishPriceAfterDiscount >= 200 && dishPriceAfterDiscount <= 300) str += dishName +" "
        }   
    }

    str += ":" +finalPrice + " " +"\n"
   
      // Filter dishes within the price range
    filteredDishes = dishes.filter(dish => dish.dishPrice >= 200 && dish.dishPrice <= 300);
    
      return {
        [hotelName] : {
          Name : hotelName,
          dishes : filteredDishes 
      },
      finalPrice,
    }
};

module.exports = {Getdata}