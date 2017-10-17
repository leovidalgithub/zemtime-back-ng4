let mongoose = require('mongoose');
let myModel  = require('../../db/models/calendars.holidays')(mongoose);

// API
// RETURNS ALL CALENDARS
function getCalendars(onSuccess, onError) {
    myModel.CalendarsHolidays.find({}, function (err, docs) {
        if (err) {
            onError('400', err);
        } else {
            onSuccess(docs);
        }
    })
}

module.exports = {
    getCalendars: getCalendars
}