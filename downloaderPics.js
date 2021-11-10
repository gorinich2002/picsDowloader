const shortid = require('shortid');
const path = require('path')
const fs = require('fs');
const download = require('download');



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
 

module.exports = downloadPicsFromArray



