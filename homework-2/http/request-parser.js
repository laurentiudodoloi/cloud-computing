const status = require('./status');
const querystring = require('querystring');

module.exports.getPostData = (request, callback) => {
    if (request.method === 'GET') {
        return {};
    }

    let data = '';
    request.on('data', chunk => {
        data += chunk;
    });

    request.on('end', () => {
        if (data) {
            data = JSON.parse(data);
        } else {
            data = {};
        }

        callback(data);
    });
}