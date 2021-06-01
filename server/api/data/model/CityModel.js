const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CitySchema = new Schema({
    id: Number,
    name: String,
    ca: String
})

module.exports = mongoose.model('cities', CitySchema)