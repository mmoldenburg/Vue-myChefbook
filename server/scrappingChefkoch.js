const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const recipe = {
    title: '',
    rating: '',
    author: '',
    time: '',
    level:'',
    ingridients: [],
    quantity: [],
    prepaire: '',
    imageUrl: '',
    value: '',
}
const scrappingChefkoch = async(url, userUid, createdAt) => {
    const browser = await puppeteer.launch({ headless: false}, { ignoreDefaultArgs: ['--disable-extensions']});
        const page = await browser.newPage();
        await page.goto(url);
        const html = await page.content();
        const $ = cheerio.load(html);
    
        recipe.quantity = [''];
        recipe.ingridients = ['']
        recipe.title = $("article.ds-box.ds-grid-float.ds-col-12.ds-col-m-8.recipe-header > div > h1").text();
        recipe.rating = $("body > main > article.ds-box.ds-grid-float.ds-col-12.ds-col-m-8.recipe-header > div > div.ds-mb-right > div > a > div.ds-rating-avg > span > strong").text();
        recipe.author = $("body > main > article.ds-box.ds-grid-float.ds-col-12.ds-col-m-8.ds-or-3 > div.ds-box.recipe-author.bi-recipe-author > div > div.ds-mb-right > a > span").text();
        recipe.time = $("body > main > article.ds-box.ds-grid-float.ds-col-12.ds-col-m-8.recipe-header > div > div.ds-mb-right > small > span.recipe-preptime.rds-recipe-meta__badge").text().slice(6)
        recipe.level= $("body > main > article.ds-box.ds-grid-float.ds-col-12.ds-col-m-8.recipe-header > div > div.ds-mb-right > small > span.recipe-difficulty.rds-recipe-meta__badge").text().slice(6);
        recipe.prepaire = $("body > main > article.ds-box.ds-grid-float.ds-col-12.ds-col-m-8.ds-or-3 > div:nth-child(3)").text();
        let ingridient = $("body > main > article.ds-box.ds-grid-float.ds-col-12.ds-col-m-8.recipe-ingredients.ds-or-1 > table > tbody > tr > td.td-right > span")
                .each((index, element) => {
                let ing = $(element).text();
                recipe.ingridients.push(ing);            
            })
        let quanty = $("body > main > article.ds-box.ds-grid-float.ds-col-12.ds-col-m-8.recipe-ingredients.ds-or-1 > table > tbody > tr > td.td-left > span")
                .each((index, element) => {
                let ing = $(element).text();
                recipe.quantity.push(ing);            
            })

        recipe.imageUrl = $("#i-amp-0 > img").attr('src')
        recipe.value = $("body > main > article.ds-box.ds-grid-float.ds-col-12.ds-col-m-8.recipe-ingredients.ds-or-1 > div.recipe-servings.ds-box > form > input").attr('value')
        
        
        await browser.close();


    return { 
        title: recipe.title,
        rating: recipe.rating,
        author: recipe.author,
        time: recipe.time,
        level: recipe.level,
        ingridients: recipe.ingridients,
        quantity: recipe.quantity,
        prepaire: recipe.prepaire,
        imageUrl: recipe.imageUrl,
        value: recipe.value,
        isFav: false
     }

}
module.exports = { scrappingChefkoch }
    