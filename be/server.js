var http = require( "http" );

var server = http.createServer(
    function (req, res){
        var controller = require( "./lib/controller.js" );
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Max-Age', 7200);
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.setHeader('Content-Type', 'application/json');

        controller.on(
            "data",
            function( data ){
                res.statusCode = 200;
                res.write(JSON.stringify(data));
                res.end();
            }
        );

        controller.on(
            "error",
            function( error ){
                res.statusCode = error.type;

                res.write(JSON.stringify(error.data));
                res.end();
            }
        );

        controller.handle(req, res);
    }
);

server.listen(4080);
console.log( "Server is running on 4080" );