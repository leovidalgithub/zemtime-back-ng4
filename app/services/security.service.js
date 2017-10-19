// let jwt = require('jsonwebtoken');
// let passwordHash = require('password-hash');
// let mailService = require('./mailService');
// let uuid = require('node-uuid');
// let moment = require('moment');

let validationUserToken = function (req, res, next) {
    console.log('validationUserToken');
    validateToken(req, res, next, 'ROLE_USER');
}
let validationManagerToken = function (req, res, next) {
    console.log('validationManagerToken');
    validateToken(req, res, next, 'ROLE_MANAGER');
}

let validateToken = function (req, res, next, role) {
    // checking token
    // let token = req.query.api_key || req.params.token || req.headers['x-auth-token'];
    if (next) next(); // everything is ok
}

module.exports = {
    validateToken:          validateToken,
    validationUserToken:    validationUserToken,
    validationManagerToken: validationManagerToken
};
