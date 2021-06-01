const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const uri = 'mongodb+srv://pausarobe:mongodb08012021@cluster0.stbfy.mongodb.net/RTTW_DB?retryWrites=true&w=majority';

app.use(require('./cors'));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useFindAndModify: false })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// mongoose.set("debug", function(coll, method, query, doc) {
//     console.log(
//         new Date(),
//         coll +
//         " " +
//         method +
//         " " +
//         JSON.stringify(query) +
//         " " +
//         JSON.stringify(doc)
//     );
// });

const logic = new(require('./logic/Logic'));

app.get('/api/allCities', (req, res) => {
    logic.listAllCities()
        .then(cities => res.json(cities))
        .catch(err => res.json(err))
});

app.get('/api/week/:id', (req, res) => {
    const {id} = req.params;

    logic.listWeekWeather(id)
        .then(week => res.json(week))
        .catch(err => res.json(err))
})

app.post('/api/city', (req, res) => {
    const {newCity} = req.body;

    logic.createCity(newCity)
        .then(city => {
            return res.json(city)
        })
        .catch(err => res.json(err))
})

app.delete('/api/city/:id', (req, res) => {
    const {id} = req.params;

    logic.deleteCity(id)
        .then(city => res.json(city))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json(err.message)
            } else {
                res.status(500).json(err)
            }
        })
})

app.listen(8080, () => console.log('API is up on port 8080'));