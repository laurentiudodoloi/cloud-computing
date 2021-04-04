require('dotenv').config();

const request = require('request');

module.exports = {
    search: async (query, callback) => {
        let url = process.env.GOOGLE_PLACE_API_URL;
        url += `?input=${query}`;
        url += `&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry`;
        url += `&key=${process.env.GOOGLE_PLACE_API_KEY}`;

        request(url, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                body = JSON.parse(body);
                callback(body.candidates[0]);
            } else {
                callback(false);
            }
        });
    }
}
