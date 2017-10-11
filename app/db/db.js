var mongoose         = require( 'mongoose' );
    mongoose.Promise = Promise;
var environment      = process.env.NODE_ENV || 'prod';
var config = require( '../config/' + environment );

module.exports = mongoose.connect( config.database, {
    useMongoClient: true
});
