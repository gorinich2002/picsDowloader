const getPicLinksBySelector = require('./apiLinksGetters/2chGetLinks')
const downloadPicsFromArray = require('./downloaderPics')

let treadLink = 'https://2ch.hk/h/res/157731.html';
let folderName ='hent';



download2chPics(treadLink,folderName)



async  function download2chPics(link,folderName){
    
let linksArray = await getPicLinksBySelector(link)

   await downloadPicsFromArray(folderName,linksArray)


}