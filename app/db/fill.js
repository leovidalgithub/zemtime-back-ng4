let router = require('express').Router(),
    mongoose = require('mongoose'),
    ObjectId = require('mongoose').Types.ObjectId;
let model = require('./models/calendars.holidays')(mongoose);

router.get('/test', validationUserToken, function (req, res, next) {
    console.log('\033c');

    model.CalendarsHolidays.find({}, function (err, docs) {
        console.log(docs);
        // res.json(docs);
        res.send(docs);
    });

    // let nt = new model.CalendarsHolidays({
    //     name: 'USA',
    //     type: 1,
    //     days: [7,13,24,29]
    // });
    // nt.save(function (err, data) {
    //     if (err) console.log('err', err);
    //     console.log('saved!');
    //     res.send(data);
    // });
    // res.send('Hi there asshole!!!');
});

module.exports = router;

