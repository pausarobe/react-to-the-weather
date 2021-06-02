const City = require('./model/CityModel');
const Week = require('./model/WeekModel');

class Data {
    listAllCities() {
        return City.find().exec();
    }

    listWeekWeather(id) {
        return new Promise((resolve, reject) => {
            if (!id) {
                throw new Error('Miss city id');
            }

            return Week.find({cityId: id}).then(resolve).catch(reject);
        })
    }

    createCity(newCity, newWeek) {
        const city = new City({...newCity});

        return city.save()
            .then(() => {
                return this.createNewWeather(newWeek);
            });
    }

    deleteCity(id) {
        return City.remove({id})
            .then(() => {
                return this.deleteWeather(id);
            });
    }

    // Privates

    createNewWeather(newWeek) {
        const week = new Week(newWeek)
        return week.save();
    }

    deleteWeather(id) {
        return Week.remove({cityId: id});
    }
}

module.exports = Data