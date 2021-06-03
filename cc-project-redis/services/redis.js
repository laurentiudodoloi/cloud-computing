require('dotenv').config();

'use strict';
const redis = require('redis');

const REDIS_HOST = process.env.GOOGLE_REDIS_HOST || 'localhost';
const REDIS_PORT = process.env.GOOGLE_REDIS_PORT || 6379;
const REDIS_PASSWORD = process.env.GOOGLE_REDIS_PASSWORD;

const client = redis.createClient(REDIS_PORT, REDIS_HOST, {
    'auth_pass': REDIS_PASSWORD,
    'return_buffers': true
});

client.on('error', err => console.error('REDIS :: ERROR', err));

module.exports = {
    setKey: function (key, value) {
        return client.set(key, value, redis.print);
    },

    getKey: function (key, callback) {
        client.get(key, function (err, result) {
            callback(result);
        });
    }
}
