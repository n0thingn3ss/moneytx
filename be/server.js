'use strict';

var express = require('express');
var app = express();

var data = require('./data/transactions.json');

// enable CORS
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Max-Age', 7200);
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/transactions', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.json(data);
});

app.listen(4080);
console.log('Started listening on port 4080');
