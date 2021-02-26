require('dotenv').config()

const http = require('http');

const options = {
    host: 'localhost',
    port: '8080',
    path: '/',
    method: 'POST',
    body: {
        content: 'test'
    }
};

http
    .request(options, (res) => {
        let data = '';
        res.on('data', function (chunk) {
            data += chunk;
        });

        res.on('end', function () {
            console.log('Done.');
        });
    })
    .end();
