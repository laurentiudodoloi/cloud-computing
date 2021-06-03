'use strict';

require('dotenv').config();

const hostname = process.env.SERVER_HOST;
const port = process.env.SERVER_PORT;

const redis = require('redis');

const REDIS_HOST = process.env.GOOGLE_REDIS_HOST || 'localhost';
const REDIS_PORT = process.env.GOOGLE_REDIS_PORT || 6379;
const REDIS_PASSWORD = process.env.GOOGLE_REDIS_PASSWORD;

const client = redis.createClient(REDIS_PORT, REDIS_HOST, {
  'auth_pass': REDIS_PASSWORD,
  'return_buffers': true
});

client.on('error', err => console.error('REDIS :: ERROR', err));

console.log('CONNECTED', client.connected);

const express = require('express')
const app = express()

app.get('/', (req, res) => {
  client.incr('visits', (err, reply) => {
    if (err) {
      console.log(err);
      res.status(500).send(err.message);
      return;
    }
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.send(`Visitor number: ${reply}\n`);
  });
})

app.listen(port, () => {
  console.log(`Listening on ${hostname}:${port}`)
})
