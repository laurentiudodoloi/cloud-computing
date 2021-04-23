const URL = 'https://northeurope.api.cognitive.microsoft.com/vision/v3.0/analyze?visualFeatures=Categories&language=en';
const KEY = '58d1eaf504044d77935864cb13daf3ab';

const fetch = require('node-fetch');

module.exports = {
    getImageInformation: async (imageUrl, callback) => {
        const body = { "url": imageUrl };

        fetch(URL, {
            method: 'post',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': KEY
            },
        })
            .then(res => res.json())
            .then(json => {
                callback(json);
            });
    }
}
