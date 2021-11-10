const shortid = require('shortid');
const path = require('path')
const fs = require('fs');
const {promisify} = require('util');
const download = require('download');
const {CookieJar} = require('tough-cookie');


async function downloadPicsFromArray(dirName,arrayPicLinks, cookie){
    console.log('files for recording counting: '+ arrayPicLinks.length)
    let i = 1;
   await fs.mkdir('dist/'+dirName, { recursive: true }, err => {
        if(err) throw err; // не удалось создать папки
        console.log('folder   dist/'+dirName+'   has been created');
     });
   
    await  asyncForEach(arrayPicLinks, (async link => {
         
        let fileName  = path.join( __dirname,'dist',dirName, (shortid.generate()+'.'+link.split('.')[2]));
         try{
             let cookieJar = new CookieJar();
             const setCookie = promisify(cookieJar.setCookie.bind(cookieJar))
            
             cookie.split(';').forEach(async keyValue => {
                let domen= link.split('/')[0]+link.split('/')[1]+link.split('/')[2]
                await setCookie(keyValue, domen);
            });

        await fs.writeFile(fileName, await download(link,{cookieJar}),(err)=>{
            if (err) console.log(err);
            i++
            console.log(fileName + ' has been writen')
        });
        }catch(e){
            console.log(e)
        }
    })
     );
     console.log('Files has been writen: '+i)
   
};





async function asyncForEach(arr, callback) {
    for(let i = 0; i < arr.length; i++)
      await callback(arr[i], i, arr) 
  }
 

module.exports = downloadPicsFromArray



