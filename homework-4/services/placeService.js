
const request = require('request');

module.exports = {
    search: async (query, callback) => {
        let url = "https://atlas.microsoft.com/search/address/json";
        url += `?subscription-key=ew2AGjCkLzM5_DWHXE6qWtrGldxQvYzz7H5RD8e8AxA`;
        url += `&api-version=1.0`;
        url += `&query=${query}}`;

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