var EventEmitter = require( "events" ).EventEmitter;
var controller = new EventEmitter();
var URL = require('url');
var qs = require('querystring');

var transactions = require('../data/transactions.json');

controller.handle = function (req, res){
    var routes = {
        transactions: new RegExp( "\/transactions$", "i" ),
    };

    var url = URL.parse(req.url);
    var query = qs.parse(url.query);
    var routeName = '';

    for (var key in routes) {
        if (match = url.pathname.match(routes[key])) {
            routeName = key;
        }
    }

    if (routeName === 'transactions') {
        var response = {};
        var len = transactions.length;
        var b = 1;
        var n = 25;

        if (parseInt(query.b) && parseInt(query.n)) {
            b = parseInt(query.b);
            n = parseInt(query.n);

            if (b + n < len) {
                response.transactions = transactions.slice(b - 1, b + n - 1);
                response.b = b + n;
            } else if (b < len) {
                response.transactions = transactions.slice(b - 1, b + n - 1);
                response.b = '';
            } else {
                response.b = '';
            }
        } else {
            response.transactions = transactions.slice(b - 1, n);
        }

        controller.emit("data", response);
        return;
    }

    if (routeName === '') {
        controller.emit( "error", {
            type: "404",
            data: "api not found"
        });
    }
};

module.exports = controller;
