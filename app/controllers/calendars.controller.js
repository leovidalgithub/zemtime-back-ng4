let router = require('express').Router();
let myHandler = require('./handlers/calendars.handler');

router.get('/', validationUserToken, function (req, res, next) {
    console.log('GET /calendars');

    myHandler.getCalendars(
        function (docs) {
            responseFunctions.successResponse(res, docs);
        }, function (status, err) {
            responseFunctions.errorResponse(res, status, err);
        })

});

module.exports = router;
