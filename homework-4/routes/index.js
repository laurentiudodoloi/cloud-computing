var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
const languageRecognitionService = require('../services/language-recognition');
const faceRecognitionService = require('../services/face-recognition');
const keyPhraseService = require('../services/key-phrase');
const imageDetectionService = require('../services/image-detection');
const translateService = require('../services/translation');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET statistics page. */
router.post('/search', function(req, res, next) {
  const purpose = req.body.purpose;
  const search = req.body.search;

  var data = false;

  switch (purpose) {
    case 'translate':
      translateService.translate(search, function (translated) {
        console.log('Request :: translate', translated);

        res.render('statistics', { data: translated });
      });

    case 'recognize-language':
      languageRecognitionService.getLanguage(search, function (language) {
        console.log('Request :: language', language);

        res.render('statistics', { data: language });
      });

      break;
    case 'detect-image-info':
      imageDetectionService.getImageInformation(search, function (image) {
        console.log('Request :: image', image);

        res.render('statistics', { data: JSON.stringify(image) });
      });

      break;
    case 'detect-face':
      faceRecognitionService.getFace(search, function (face) {
        console.log('Request :: face', face);

        res.render('statistics', { data: JSON.stringify(face) });
      });

      break;
    case 'key-phrase':
      keyPhraseService.getKeyPhrases(search, function (keyPhrases) {
        console.log('Request :: keyPhrases', keyPhrases);

        res.render('statistics', { data: JSON.stringify(keyPhrases) });
      });

      break;
    default:
      break;
  }
});

});
module.exports = router;
