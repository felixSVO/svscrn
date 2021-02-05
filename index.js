#!/usr/bin/env node
const express = require('express');
const screenshot = require('screenshot-desktop');
const argv = require('minimist')(process.argv.slice(2));

const PORT = argv.p || argv.port || 8081;
const HOST = argv.h || argv.host || '127.0.0.1';
const app = express();

app.get('/', (req, res) => {
  res.json({ foo: 'bar' }).end();
});

app.get('/screen', function (req, res) {
  screenshot({ format: 'png' })
    .then((img) => {
      res.writeHead(200, { 'Content-type': 'image/png' });
      res.end(img);
    })
    .catch((err) => {
      console.warn('err', err);
      res.status(500).json({});
    });
});

app.listen(PORT, HOST, (err) => console.info('listening on', PORT));
