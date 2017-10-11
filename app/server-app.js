let express             = require( 'express' ),
    app                 = express(),
    bodyParser          = require( 'body-parser' ),
    // fs               = require( 'fs' ),
    mongoose            = require( 'mongoose' ),
    cors                = require( 'cors' );
    mongoose.Promise    = Promise;
let conn                = require( './db/db' );
let validationsSecurity = require('./services/security.service');

app.set( 'port', process.env.PORT || 5005 );
global.validationUserToken    = validationsSecurity.validationUserToken;
global.validationManagerToken = validationsSecurity.validationManagerToken;

app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( bodyParser.json() );
app.use( cors() ); // it must use personal cors object or use this lib but with security rules defined on it in order to restrict 
app.use( '/fill', require( './db/fill' ) ); // only for database developer purposes

conn.then( function(db) {
    app.listen( app.get( 'port' ), function () {
        console.log( 'Zemtime server running on PORT:' + app.get( 'port' ) + ' - PROCESS:' + process.pid );
    });
    console.log('192.168.16.40 Zemsania DB Server Connected');
});
