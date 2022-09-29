//h4.split('coupon code:')[1].trim().split('Available')[0]
// sentence.slice(sentence.indexOf('coupon code:') + 'coupon code:'.length).trim().split(' ')[0].replace('Available', '')
// .toLocaleLowerCase();
import fetch from 'node-fetch';
import * as cheerio from "cheerio";
import { Qyu } from 'qyu';


(async () => {
    const siteUrl = ['https://www.hp.com/id-en/shop/', "https://oceanbuy.ca/", "https://www.groupon.fr/goods", "https://www.myprotein.com.my/", "https://3second.co.id/", "https://shopee.com.my/", "https://www.dell.com/"];
    const q = new Qyu({concurrency: 3});
    for (let key in siteUrl) {
        q(async () => {
            const url = siteUrl[key];
            const resp = await fetch(url);
            const html = await resp.text();
            const $ = cheerio.load(html);
            const div = $("body").text()
            if (div.includes('coupon code')){
                // const coupon = h4.includes('coupon code')  
                // const coupon = div.slice(div.indexOf('coupon code:') + 'coupon code:'.length).trim().split(' ')[0].replace('Available', '')

                const coupon = div.slice(div.indexOf('coupon code:') + 'coupon code:'.length).trim().split(' ')[0].replace(/(\r\n|\n|\r)/gm, "")
                // console.log(coupon);
                // console.log(url);
                // console.log();
                const codes = [];
                codes.push({ url ,coupon});
                console.log(codes);
                    
            } else if (div.includes('Coupon Code')){
                const coupon = div.slice(div.indexOf('Coupon Code:') + 'Coupon Code:'.length).trim().split(' ')[0].replace(/(\r\n|\n|\r)/gm, "")
                const codes = [];
                codes.push({ url ,coupon});
                console.log(codes);
            }

            
            


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