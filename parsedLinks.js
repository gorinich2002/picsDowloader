const axios = require('axios')
const cherio = require('cherio')

let selector = 'post__image-link>img'
let link = 'https://2ch.hk/gg/res/1111819.html#1111819'

async function getPicLinksBySelector(link, selector){

   
   
        let resultArr = [];
        try{ 
                await axios.get(link,{withCredentials: true})
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
getPicLinksBySelector(link,selector)