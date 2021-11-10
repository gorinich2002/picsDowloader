const shortid = require('shortid');
const path = require('path')
const fs = require('fs');
const download = require('download');

const https = require('https'); // or 'https' for https:// URLs
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

async function httpsDownload(url,fileName,cookie){
    const file = fs.createWriteStream(fileName);
    const request = https.get(url,{
        headers:{
            Cookie:cookie
        }
    },
         function(response) {
       
    response.pipe(file);
    });

}






async function downloadPicsFromArray(dirName,arrayPicLinks){
    console.log('files for recording counting: '+ arrayPicLinks.length)
    let i = 1;
   await fs.mkdir('dist/'+dirName, { recursive: true }, err => {
        if(err) throw err; // не удалось создать папки
        console.log('folder   dist/'+dirName+'   has been created');
     });
   
    await  asyncForEach(arrayPicLinks, (async link => {
         
        let fileName  = path.join( __dirname,'dist',dirName, (shortid.generate()+'.'+link.split('.')[2]));
         try{
        await fs.writeFile(fileName, await download(link),(err)=>{
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
 
  (async ()=>{
      await httpsDownload('https://2ch.hk/h/src/157731/15865918276711.mp4', 'oleg\\asd.mp4',"07IFkGaPtry7mAxrnFzTs7kG=291342a1-e0fc-4d6b-ae69-1feae4c9c6ab; usercode_auth=086c2a7c29b42f8388c866b018501a16; SL_GWPT_Show_Hide_tmp=1; SL_wptGlobTipTmp=1; ageallow=1;")
  })()

module.exports = downloadPicsFromArray



