const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WeekSchema = new Schema({
    cityId: Number,
    weather: [
        { 
            id: Number,
            date: String,
            icon: String,
            minTemperature: Number,
            maxTemperature: Number,
            description: String,
            precipitation: Number,
            wind: Number
        }
    ]
})

module.exports = mongoose.model('weather', WeekSchema, 'weather')