require('dotenv').config()

const https = require('https');

module.exports.search = (keyword) => {
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
            let data = '';
            res.on('data', function (chunk) {
                data += chunk;
            });

            res.on('end', function () {
                console.log('DATA', JSON.parse(data));

                // callback(JSON.parse(data));
            });
        })
        .end();
}
