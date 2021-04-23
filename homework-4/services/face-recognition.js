const URL='https://northeurope.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&recognitionModel=recognition_04&returnRecognitionModel=false&detectionModel=detection_03&faceIdTimeToLive=86400';
const KEY='0a631a425bdc4b569fb7c479f5901101';

const fetch = require('node-fetch');

module.exports = {
    getFace: async (imageUrl, callback) => {
        const body = {
            "url": imageUrl
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
            .then(json => callback(json));
    }
}
