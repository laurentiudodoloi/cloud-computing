const URL = 'https://northeurope.api.cognitive.microsoft.com/text/analytics/v2.1/keyPhrases';
const KEY = '4bd04eb57127477ca1212f8b1bcdd8ee';

const fetch = require('node-fetch');

module.exports = {
    getKeyPhrases: async (text, callback) => {
        const body = {
            "documents": [
                {
                    "language": "en",
                    "id": "1",
                    "text": text
                }
            ]
        };

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
                callback(json.documents[0].keyPhrases);
            });
    }
}
