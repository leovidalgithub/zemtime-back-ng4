let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

module.exports = function (mongoose,varr) {
   
    let CalendarsHolidaysSchema = new Schema({
        name: { type: String, trim: true, required: true, index: { unique: false } },
        type: { type: Number, required: true, default: 1 },
        years: { type: Array, required: false }
    }, { collection: 'calendarsholidays', timestamps: { createdAt: 'created_at' } });

    return {
        CalendarsHolidays: mongoose.model('CalendarsHolidays', CalendarsHolidaysSchema)
    }
}
