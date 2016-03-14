var express = require('express');
var exphbs  = require('express-handlebars');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 3000;
var router = express.Router();


app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

app.use(bodyParser.urlencoded({ extended: false }));  // pull information from html in POST
app.use(morgan('dev'));                     // log every request to the console

router.get('/', function(req, res, next) {
    res.render('index', {
        page: 'index',
        title: 'What are we Doing?'
    });
});

router.get('/send-money', function(req, res, next) {
    res.render('send-money', {
        page: 'send-money',
        title: 'Send Money'
    });
});

router.post('/send-money', function(req, res, next) {
    setTimeout(function () {
        res.writeHead(200, {
            "Content-Type": "application/json"
        });
        res.write(JSON.stringify({
            'res': 'money-sent'
        }));
        res.end();
    }, 2000);
});

router.get('/view-transactions', function(req, res, next) {
    var viewTransactions = require('./routes/view-transactions');
    viewTransactions(req, res, next);
});

app.use('/', router);

app.listen(port);
console.log('App running on port', port);
