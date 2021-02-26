require('dotenv').config()

const https = require('https');
const logService = require('../services/logService');

module.exports.search = (keyword, callback) => {
    const options = {
        host: process.env.PEXELS_IMAGE_API_HOST,
        path: '/v1/search?query=' + keyword.toLowerCase().trim(),
        method: 'GET',
        headers: {
            "Authorization": process.env.PEXELS_IMAGE_API_KEY
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
