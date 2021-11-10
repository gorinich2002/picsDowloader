

const axios = require('axios')
const cherio = require('cherio')

async function getPicLinksBySelector(link,cookie){

   
   
        let resultArr = [];
        try{ 
                let APIlink = link.split('#')[0]; APIlink = APIlink.split('.')[0]+'.' + APIlink.split('.')[1]+'.json'
                console.log(APIlink)
                let JSONthred = await axios.request({
                    url: APIlink,
                    method: "get",
                    headers:{
                        Cookie: cookie
                    } 
               });
                JSONthred = JSONthred.data
                
                JSONthred.threads[0].posts.forEach(
                    (post,i)=>{
                        post.files.forEach(file=>{
                            resultArr.push('https://2ch.hk/'+file.path)
                        })
                       
                    })
                  
                
            return resultArr;
        }catch(e){
         
            console.log('ERR: ' + e)
        }   

}
(async()=>{
    let a = await getPicLinksBySelector('https://2ch.hk/h/res/157731.html');
    console.log(a)
})()

module.exports = getPicLinksBySelector;