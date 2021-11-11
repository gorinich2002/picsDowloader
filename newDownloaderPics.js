const shortid = require('shortid');
const path = require('path')
const fs = require('fs');
const download = require('download');
const request = require('request');

const https = require('https'); // or 'https' for https:// URLs
const { default: axios } = require('axios');
const { resolve } = require('path');
// async function httpsDownload(url,fileName,cookie){
//     const file = fs.createWriteStream(fileName);
//     const request = https.get(url,{
//         headers:{
//             Cookie:cookie
//         }
//     },
//          function(response) {
//         console.log(response)
//     response.pipe(file);
//     });

// }
function promisify(f) {
    return function (...args) { // возвращает функцию-обёртку
      return new Promise((resolve, reject) => {
        function callback(err, result) { // наш специальный колбэк для f
          if (err) {
            return reject(err);
          } else {
            resolve(result);
          }
        }
  
        args.push(callback); // добавляем колбэк в конец аргументов f
  
        f.call(this, ...args); // вызываем оригинальную функцию
      });
    };
  };

//   const file = fs.createWriteStream("file.jpg");
// const request = http.get("http://i3.ytimg.com/vi/J---aiyznGQ/mqdefault.jpg", function(response) {
//   response.pipe(file);
// });

let axiosDownload = (url,fileName,cookie ='')=> new Promise(function(resolve,reject){
 
    const file =  fs.createWriteStream(fileName);
    const res =  request.get(url,{
        headers:{
            Cookie:cookie
        }
    }) .pipe(file).on('finish', function(response) {
        resolve(200)
       
      }).on('error', function(err) {
        console.error(err)
      })
   
})
async function httpsDownload(url,fileName,cookie =''){
    
    const file =  fs.createWriteStream(fileName);
    const request = await httpsGetPromise(url,{
        headers:{
            Cookie:cookie
        }
    },
        async function(response) {
       
           await response.pipe(file);
            
    });
    file.end()
   
    

}

let httpsGetPromise = promisify(https.get.bind(https))






async function downloadPicsFromArray(dirName,arrayPicLinks,cookie){
    console.log('files for recording counting: '+ arrayPicLinks.length)
    let i = 1;
   await fs.mkdir('dist/'+dirName, { recursive: true }, err => {
        if(err) throw err; // не удалось создать папки
        console.log('folder   dist/'+dirName+'   has been created');
     });
     
    await  asyncForEach(arrayPicLinks, (async link => {
         
        let fileName  = path.join( __dirname,'dist',dirName, (shortid.generate()+'.'+link.split('.')[2]));
         try{
           
            await axiosDownload(link,fileName,cookie).catch(e=>{throw e});
        
        i++
            console.log(fileName + ' has been writen')
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
 
 

  // (async()=>{
  //   await axiosDownload("https://2ch.hk/h/src/157731/15865918279525.webm",'hent.webm','07IFkGaPtry7mAxrnFzTs7kG=291342a1-e0fc-4d6b-ae69-1feae4c9c6ab; usercode_auth=086c2a7c29b42f8388c866b018501a16; SL_GWPT_Show_Hide_tmp=1; SL_wptGlobTipTmp=1; ageallow=1;')
  // })()

module.exports = downloadPicsFromArray



