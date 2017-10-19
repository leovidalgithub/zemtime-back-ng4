let router = require('express').Router(),
    mongoose = require('mongoose'),
    ObjectId = require('mongoose').Types.ObjectId;
let model = require('./models/calendars.holidays')(mongoose);

router.get('/test', validationUserToken, function (req, res, next) {
    console.log('\033c');
    getCalendars(req, res);
    // let items = ['USA', 'España', 'Venezuela', 'Colombia'];
    // let items = ['Florida', 'Madrid', 'Cataluña', 'País Vasco', 'Cundinamarca', 'Miranda'];
    // let items = ['Barcelona', 'Caracas', 'Bogotá', 'Miami', 'Bilbao'];
    // for( let i = 0; i < items.length; i++) {
    //     createCalendar(req, res, items[i], 3);
    // }
    // res.end('Done!');
});

function getCalendars(req, res) {
    model.CalendarsHolidays.find({}, function (err, docs) {
        res.status(200).json(docs);
    });
}
function createCalendar(req, res, name, type) {
    let myDates = [];
    let numberOfDays = Math.floor((Math.random() * (56 - 16 + 1)) + 12);
    for (let i = 1; i < numberOfDays; i++) {
        let randomMonth = Math.floor((Math.random() * 12) + 1);
        let randomDay = Math.floor((Math.random() * 28) + 1);
        let myDate = new Date(2017, randomMonth, randomDay).getTime();
        if (myDates.indexOf(myDate) === -1) {
            myDates.push(myDate);
        }
    }
    
    // create new document ant save it
    let nt = new model.CalendarsHolidays({
        name: name,
        type: type,
        years: [
            {
                year : 2017,
                days : myDates
            }            
        ]
    });
    nt.save(function (err, data) {
        if (err) console.log('err', err);
        console.log('saved!');
        // res.send(data);
    });
}

module.exports = router;

