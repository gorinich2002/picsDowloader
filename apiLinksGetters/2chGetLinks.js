

const axios = require('axios')
const cherio = require('cherio')

async function getPicLinksBySelector(link){

   
   
        let resultArr = [];
        try{ 
                let APIlink = link.split('#')[0]; APIlink = APIlink.split('.')[0]+'.' + APIlink.split('.')[1]+'.json'
           
                JSONthred = await axios.get(APIlink); JSONthred = JSONthred.data
                
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
module.exports = getPicLinksBySelector