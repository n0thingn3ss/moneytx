var http = require('http');

module.exports = function viewTransactions(req, res, next) {
    http.get({
        host: 'localhost',
        port: 4080,
        path: '/transactions'
    }, function(response) {
        // Continuously update stream with data
        var transactions = '';
        response.on('data', function(d) {
            transactions += d;
        });

        response.on('end', function() {
            // Data reception is done, do whatever with it!
            transactions = JSON.parse(transactions);
            res.render('view-transactions', {
                page: 'view-transactions',
                title: 'Transaction History',
                transactions: transactions
            });
        });
    });
};