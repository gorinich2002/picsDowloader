const getPicLinksBySelector = require('./apiLinksGetters/2chGetLinks')
const downloadPicsFromArray = require('./newDownloaderPics')

let treadLink = 'https://2ch.hk/b/res/272601448.json';
let folderName ='new';
let cookie2ch = "07IFkGaPtry7mAxrnFzTs7kG=291342a1-e0fc-4d6b-ae69-1feae4c9c6ab; usercode_auth=086c2a7c29b42f8388c866b018501a16; SL_GWPT_Show_Hide_tmp=1; SL_wptGlobTipTmp=1; ageallow=1;";


download2chPics(treadLink,folderName,cookie2ch)



async  function download2chPics(link,folderName,cookie2ch){
    
let linksArray = await getPicLinksBySelector(link,cookie2ch)

   await downloadPicsFromArray(folderName,linksArray,cookie2ch)


}