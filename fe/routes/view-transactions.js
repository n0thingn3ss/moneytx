var http = require('http');

module.exports = function viewTransactions(req, res, next) {
    http.get({
        host: 'localhost',
        port: 4080,
        path: '/transactions'
    }, function (apiResponse) {

        var data = '';
        apiResponse.on('data', function(d) {
            data += d;
        });

        apiResponse.on('end', function() {
            data = JSON.parse(data);
            res.render('view-transactions', {
                page: 'view-transactions',
                title: 'Transaction History',
                transactions: data.transactions
            });
        });
    });
};