const URL = 'https://api.cognitive.microsofttranslator.com/translate?to=de&api-version=3.0';
const KEY = '085d75a2a1884172a71462dd9b478a17';

const fetch = require('node-fetch');

module.exports = {
    translate: async (text, callback) => {
        const body = [{
            "Text": text
        }];

        fetch(URL, {
            method: 'post',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': KEY,
                'Ocp-Apim-Subscription-Region' : 'northeurope'

            },
        })
            .then(res => res.json())
            .then(json => callback(json));
    }
}
