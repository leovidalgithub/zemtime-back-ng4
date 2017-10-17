let validationsSecurity = require('../services/security.service');
let responseFunctions = require('./response.functions');

global.validationUserToken    = validationsSecurity.validationUserToken;
global.validationManagerToken = validationsSecurity.validationManagerToken;
global.responseFunctions      = responseFunctions;
