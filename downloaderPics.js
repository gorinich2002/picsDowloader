const shortid = require('shortid');

const fs = require('fs');
const download = require('download');



async function downloadPicsFromArray(dirName,arrayPicLinks){

   
    arrayPicLinks.forEach(async link => {
        let fileName  = './dist'+shortid.generate()+'.'+link.split('.')[2];
        await fs.writeFile(fileName, await download(link),()=>{console.log(fileName + ' has been writen')});
    });
   
};

module.exports = downloadPicsFromArray



