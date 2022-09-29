//h4.split('coupon code:')[1].trim().split('Available')[0]
// sentence.slice(sentence.indexOf('coupon code:') + 'coupon code:'.length).trim().split(' ')[0].replace('Available', '')


const cheerio = require("cheerio");;
const axios = require("axios");

const url="https://www.hp.com/id-en/shop/";

const data_code = []

async function getGenre(){

    try{

        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const h4 = $("h4").text();
        // const coupon = h4.includes('coupon code')  
        coupon = h4.slice(h4.indexOf('coupon code:') + 'coupon code:'.length).trim().split(' ')[0].replace('Available', '')
        console.log(coupon);

                
    }

    catch(error){
        console.error(error);
    }

}

getGenre();