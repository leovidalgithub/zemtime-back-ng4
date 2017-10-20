let router    = require('express').Router();
let myHandler = require('./handlers/calendars.holidays.handler');

router.get('/calendars', validationUserToken, (req, res, next) => {
    console.log('GET /calendars/calendars');
    myHandler.getCalendars(
        (newDocs) => {
            newDoc = utils.giveAnArray(newDocs); // returned object has to be an Array
            response.successResponse(res, newDocs);
        }, (status, err) => {
            response.errorResponse(res, status, err);
        })
});

router.post('/createCalendar', validationUserToken, (req, res, next) => {
    let data = req.body;
    console.log('GET /calendars/createCalendar/');
    myHandler.createCalendar(data,
        (newDoc) => {
            newDoc = utils.giveAnArray(newDoc);  // returned object has to be an Array
            response.successResponse(res, newDoc);
        }, (status, err) => {
            response.errorResponse(res, status, err);
        })
});

router.post('/updateCalendar', validationUserToken, (req, res, next) => {
    let calendar = req.body;
    console.log('GET /calendars/updateCalendar/');
    myHandler.updateCalendar(calendar,
        (updatedDoc) => {
            response.successResponse(res, updatedDoc);
        }, (status, err) => {
            response.errorResponse(res, status, err);
        });
});

router.get('/deleteCalendar/:id', validationUserToken, (req, res, next) => {
    let calendarId = req.params.id;
    console.log('GET /calendars/deleteCalendar/:id');
    myHandler.deleteCalendar(calendarId,
        (removedDoc) => {
            response.successResponse(res, removedDoc);
        }, (status, err) => {
            response.errorResponse(res, status, err);
        })
});

module.exports = router;
