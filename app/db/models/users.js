let mongoose = require( 'mongoose' ),
    Schema   = mongoose.Schema;
// config    = require( '../../config/config' );

let UserSchema = new Schema( {
        candidatoId :     { type : String, trim : true, unique: true },
        cp :              { type : String, trim : true },
        username :        { type : String, trim : true, index: { unique: true } },
        password :        { type : String, trim : true },
        name :            { type : String, trim : true },
        surname :         { type : String, trim : true },
        nif :             { type : String, trim : true, index: { unique: true } },
        enabled :         { type : Boolean, index : true, default : true },
        defaultPassword : { type : Boolean, index : true, default : true },
        // activationDate :  { type : Date, default : Date.now },
        lastLoginDate :   { type : Date, default : Date.now },
        birthdate :       { type : Date },
        locale :          { type : String, trim : true, default : 'es' },
        sex :             { type : String, trim : true },
        phone :           { type : String, trim : true },
        uuid :            { type : String, trim : true, index : true },
        roles :           { type : Array, default : ['ROLE_USER'] }
        // calendarID :      { type : Schema.Types.ObjectId, ref : 'Calendar' },
        // superior :        { type : Schema.Types.ObjectId, ref : 'User' },
        // company :         { type : Schema.Types.ObjectId, ref : 'Enterprises' }
    }, { collection: 'users', timestamps: { createdAt: 'created_at' } });

// ********************************** ********************************** **********************************

UserSchema.methods.createNewUser = function( userData ) {
    let vm = this;
    vm.email         = userData.email;
    vm.admin         = userData.admin;
    vm.supplier      = userData.supplier;
    vm.active        = userData.active;
    vm.name          = userData.name;
    vm.contact       = userData.contact;
    vm.address       =  userData.address;
    vm.phone_numbers = userData.phone_numbers;
    vm.userDemand    = userData.userDemand;
    vm.setPassword( userData.password );
    return vm.save();
};

UserSchema.statics.setUserDemand = function( userInfo ) {
    let clientId = userInfo.clientID;
    let demandState = userInfo.demandState;
    let demandDate = userInfo.demandDate;
    return this.findByIdAndUpdate( clientId, { demandState : demandState, demandDate : demandDate } );
};

UserSchema.methods.setPassword = function( password ){
    this.salt = crypto.randomBytes( 16 ).toString( 'hex' );
    this.hash = crypto.pbkdf2Sync( password, this.salt, 1000, 64 ).toString( 'hex' );
};

UserSchema.methods.validPassword = function( password ) {
    let hash = crypto.pbkdf2Sync( password, this.salt, 1000, 64 ).toString( 'hex' );
    return this.hash === hash;
};

UserSchema.methods.generateJwt = function( user ) {
    return jwt.sign( user, config.pass.secret, { // create a token
        // expiresIn: 9600 // 3600 expires in 1 hour
    });
};

UserSchema.statics.setUser = function( user ) {
    return this.findByIdAndUpdate( user._id, user, { upsert : false });
};

UserSchema.statics.getSupplierName = function( user ) {
    return this.findOne( { 'supplier' : user.supplier, 'admin' : true }, { 'name' : 1,'_id' : 0 } );
};

module.exports = mongoose.model( 'User', UserSchema );
