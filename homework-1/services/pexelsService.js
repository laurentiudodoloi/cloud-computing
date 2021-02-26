require('dotenv').config()

const https = require('https');

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
            let data = '';
            res.on('data', function (chunk) {
                data += chunk;
            });

            res.on('end', function () {
                callback(JSON.parse(data));
            });
        })
        .end();
}
