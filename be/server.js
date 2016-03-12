var http = require( "http" );
var controller = require( "./lib/controller.js" );

var server = http.createServer(
    function (req, res){
        controller.on(
            "data",
            function( data ){
                res.writeHead(
                    200,
                    { "Content-Type": "application/json" }
                );

                res.write(JSON.stringify(data));
                res.end();
            }
        );

        controller.on(
            "error",
            function( error ){
                // Express/Touchdown
                res.writeHead(
                    error.type,
                    { "Content-Type": "application/json" }
                );

                res.write(JSON.stringify(error.data)); // React
                res.end();
            }
        );

        controller.handle(req, res);
    }
);

server.listen(4080);
console.log( "Server is running on 4080" );