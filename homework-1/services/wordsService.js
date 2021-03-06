require('dotenv').config()

const https = require('https');
const logService = require('../services/logService');

module.exports.search = (keyword, callback) => {
    const options = {
        host: process.env.WORDS_API_HOST,
        path: '/words/' + keyword.toLowerCase().trim(),
        method: 'GET',
        headers: {
            "x-rapidapi-host": process.env.WORDS_API_HOST,
            "x-rapidapi-key": process.env.WORDS_API_KEY,
            "useQueryString": true
        }
    };

    https
        .request(options, (res) => {
            const startTime = Date.now();

            let data = '';
            res.on('data', function (chunk) {
                data += chunk;
            });

            res.on('end', function () {
                callback(JSON.parse(data));

                logService.log({
                    address: process.env.HOST,
                    host: options.host,
                    url: options.path,
                    method: options.method,
                    user_agent: 'local-machine',
                    timestamp: Date.now(),
                    duration: Date.now() - startTime,
                    response: {
                        status_code: res.statusCode
                    },
                    internal: true
                });
            });
        })
        .end();
}
