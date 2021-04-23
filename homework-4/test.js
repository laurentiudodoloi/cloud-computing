const languageRecognitionService = require('./services/language-recognition');
const faceRecognitionService = require('./services/face-recognition');
const keyPhraseService = require('./services/key-phrase');
const imageDetectionService = require('./services/image-detection');

const text = "Hello world. This is some input text that I love.";

languageRecognitionService.getLanguage('Thank you.', function (language) {
    console.log('LANGUAGE', language);
});

faceRecognitionService.getFace('https://i.imgur.com/uOEhj02.jpeg', function (face) {
    console.log('FACE', face);
});

keyPhraseService.getKeyPhrases(text, function (keyPhrases) {
    console.log('KEY PHRASES', keyPhrases);
});

imageDetectionService.getImageInformation('https://i.imgur.com/uOEhj02.jpeg', function (keyPhrases) {
    console.log('IMAGE DETECTION', keyPhrases);
});
