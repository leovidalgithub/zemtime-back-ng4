let express             = require( 'express' ),
    app                 = express(),
    bodyParser          = require( 'body-parser' ),
    mongoose            = require( 'mongoose' ),
    cors                = require( 'cors' );
    mongoose.Promise    = Promise;
let conn                = require( './db/db' );
    
require('./global/global.functions'); // load global app functions

app.set( 'port', process.env.PORT || 5005 );

app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( bodyParser.json() );
app.use( cors() ); // it must use personal cors object or use this npm-cors-module but with security rules defined on it in order to restrict traffic

app.use( '/calendars', require( './controllers/calendars.holidays.controller' ) );
// app.use( '/fill', require( './db/fill' ) ); // only for database developer purposes

conn.then( (db) => {
    app.listen( app.get( 'port' ), () => {
        console.log( 'Zemtime server running on PORT:' + app.get( 'port' ) + ' - PROCESS:' + process.pid );
    });
    console.log('192.168.16.40 Zemsania DB Server Connected');
});
