//h4.split('coupon code:')[1].trim().split('Available')[0]
// sentence.slice(sentence.indexOf('coupon code:') + 'coupon code:'.length).trim().split(' ')[0].replace('Available', '')

import fetch from 'node-fetch';
import * as cheerio from "cheerio";
import { Qyu } from 'qyu';


(async () => {
    const siteUrl = ['https://www.hp.com/id-en/shop/', "https://www.ramzamani.com/", "https://www.asos.com/"];
    const q = new Qyu({concurrency: 3});
    // const len= siteUrl.length;
    for (let key in siteUrl) {
        q(async () => {
            const resp = await fetch(siteUrl[key]);
            const html = await resp.text();
            const $ = cheerio.load(html);
            const h4 = $("h4").text();
            // const coupon = h4.includes('coupon code')  
            const coupon = h4.slice(h4.indexOf('coupon code:') + 'coupon code:'.length).trim().split(' ')[0].replace('Available', '')
            console.log(coupon);
            console.log(siteUrl[key]);
            
            // let products = [];
            // $('.product-list .product').each((i, elem) => {
            //     let $elem = $(elem);
            //     let title = $elem.find('.title').text();
            //     let price = $elem.find('.price').text();
            //     products.push({ title, price });
            // });
            // Do something with products...
        });
    }

    await q.whenEmpty();

    // All done!
})();