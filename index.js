const getPicLinksBySelector = require('./apiLinksGetters/2chGetLinks')
const downloadPicsFromArray = require('./downloaderPics')


getPicLinksBySelector('https://2ch.hk/gg/res/1115510.html#1115510')
.then(linksArray =>{
  
    downloadPicsFromArray('dvach',linksArray)
})
