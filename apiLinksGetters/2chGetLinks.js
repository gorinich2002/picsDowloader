

const axios = require('axios')
const cherio = require('cherio')

async function getPicLinksBySelector(link, cookie) {



    let resultArr = [];
    try {
        let APIlink = link.split('#')[0]; APIlink = APIlink.split('.')[0] + '.' + APIlink.split('.')[1] + '.json'
        console.log(APIlink)
        let JSONthred = await axios.request({
            url: APIlink,
            method: "get",
            headers: {
                Cookie: cookie
            }
        });
        JSONthred = JSONthred.data

        JSONthred.threads[0].posts.forEach(
            (post, i) => {
                if(Array.isArray(post?.files))
                post.files.forEach(file => {
                    resultArr.push('https://2ch.hk' + file.path)
                    

                })

            })


        return resultArr;
    } catch (e) {

        console.log('ERR: ' + e)
    }

}

module.exports = getPicLinksBySelector;