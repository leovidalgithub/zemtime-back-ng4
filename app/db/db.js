let mongoose         = require( 'mongoose' );
    mongoose.Promise = Promise;
let environment      = process.env.NODE_ENV || 'prod';
let config = require( '../config/' + environment );

module.exports = mongoose.connect( config.database, {
    useMongoClient: true
});
