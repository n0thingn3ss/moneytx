var EventEmitter = require( "events" ).EventEmitter;
var controller = new EventEmitter();
var URL = require('url');

var transactions = require('../data/transactions.json');

controller.handle = function (req, res){
    var routes = {
        transactions: new RegExp( "\/transactions$", "i" ),
    };

    var url = URL.parse(req.url);
    var routeName = '';

    for (var key in routes) {
        if (match = url.pathname.match(routes[key])) {
            routeName = key;

        }
    }

    if (routeName === 'transactions') {
        controller.emit( "data", transactions);
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
