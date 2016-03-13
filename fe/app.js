var express = require('express');
var exphbs  = require('express-handlebars');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 3000;
var router = express.Router();

app.use(express.static(__dirname + '/views')); // set the static files location for the static html
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

app.use(bodyParser.urlencoded({ extended: false }));  // pull information from html in POST
app.use(morgan('dev'));                     // log every request to the console

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'What are we Doing?'
    });
});

router.get('/send-money', function(req, res, next) {
    res.render('send-money.html');
});

router.get('/view-transactions', function(req, res, next) {
    res.render('view-transactions.html');
});

app.use('/', router);

app.listen(port);
console.log('App running on port', port);
