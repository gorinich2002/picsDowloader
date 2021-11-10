const axios = require('axios')
const cheerio = require('cheerio')

let selector = '.post__image-link>img'
let link = 'https://2ch.hk/h/res/157731.html'

async function getPicLinksBySelector(link, selector,cookie){

   
   
        let resultArr = [];
        try{ 
                await  await axios.request({
                    url: APIlink,
                    method: "get",
                    headers:{
                        Cookie: cookie

                    } 
               })
                .then(res => res.data)
                .then(res =>{

                    let html = res
                    $ = cheerio.load(html)
                    
                    $(selector).each((index, el)=>{
                      
                        resultArr.push($(el).attr('src'))
                       
                    })
                   console.log(resultString)
                return resultString
                })
                .catch(e => {
                    (console.log('ERR: ' + e))
                })
            return resultArr;
        }catch(e){
         
            console.log('ERR: ' + e)
        }   

}
module.exports = getPicLinksBySelector