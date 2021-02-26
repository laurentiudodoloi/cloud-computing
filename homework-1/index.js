require('dotenv').config()

const http = require('http');

const functions = require('./functions');

const wordsService = require('./services/wordsService');
const pexelsService = require('./services/pexelsService');
const mediaService = require('./services/mediaService');

const requestListener = (req, res) => {
    if (req.method === 'GET') {
        if (req.url === '/') {
            functions.sendFile('./public/index.html', res);
        } else if (['css', 'js', 'gif'].includes(req.url.split('.')[1])) {
            functions.sendFile('./public' + req.url, res);
        } else {
            functions.handleNotFound(res, () => {
                res.end();
            });
        }
    } else if (req.method === 'POST') {
        if (req.url === '/') {
            let data = '';

            req.on('data', chunk => {
                data = data + chunk;
            });

            req.on('end', () => {
                data = JSON.parse(data);
                const keyword = data.content;

                let responseData = {
                    url: false
                }

                wordsService.search(keyword, (wordInfo) => {
                    let text = wordInfo.results && wordInfo.results.length
                        ? wordInfo.results[0].definition
                        : 'Word definition not found.';

                    pexelsService.search(keyword, (imageInfo) => {
                        const imageUrl = imageInfo && imageInfo.photos.length
                            ? imageInfo.photos[0].src.original
                            : process.env.TEXTOVERIMAGE_FALLBACK_IMAGE;

                        responseData.url = mediaService.getUrl(imageUrl, text);

                        res.writeHead(200, {'Content-Type': 'application/json'});
                        res.write(JSON.stringify(responseData));

                        res.end();
                    });
                });
            });
        }
    }
}

const server = http.createServer(requestListener);

server.listen(8080);
