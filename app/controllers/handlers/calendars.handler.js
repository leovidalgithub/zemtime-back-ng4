let mongoose = require('mongoose');
let ObjectId = require('mongoose').Types.ObjectId;
let myModel  = require('../../db/models/calendars.holidays')(mongoose);

// API
// RETURNS ALL CALENDARS
function getCalendars(onSuccess, onError) {
    myModel.CalendarsHolidays.find({}, (err, docs) => {
        if (err) {
            onError('400', err);
        } else {
            onSuccess(docs);
        }
    })
}

// API
// CREATES AND RETURNS A NEW CALENDAR
function createCalendar(data, onSuccess, onError) {    
    let newCalendar = new myModel.CalendarsHolidays({
        name: data.name,
        type: data.type,
        years: [
            {
                year: data.year,
                days: []
            }
        ]
    });
    newCalendar.save( (err, newDoc) => {
            if (err) {
                console.log('err', err);
                onError('400', err);
            } else {
                onSuccess(newDoc);
            }
    });
}

// API
// UPDATES A CALENDAR
function updateCalendar(calendar, onSuccess, onError) {
    myModel.CalendarsHolidays.findByIdAndUpdate({ _id: new ObjectId(calendar.id) }, calendar, { new : true, upsert : true },
        (err, updatedDoc) => {
            if (err || !updatedDoc) {
                onError('400', err);
            } else {
                onSuccess(updatedDoc);
            }
        })
}

// API
// DELETES A CALENDAR
function deleteCalendar(calendarId, onSuccess, onError) {
    myModel.CalendarsHolidays.findByIdAndRemove( { _id: new ObjectId(calendarId) },
        (err, removedDoc) => {
            if(err || !removedDoc) {
                onError('400', err);
            } else {
                onSuccess(removedDoc);
            }
        })
}

module.exports = {
    getCalendars: getCalendars,
    createCalendar: createCalendar,
    updateCalendar: updateCalendar,
    deleteCalendar: deleteCalendar
}

