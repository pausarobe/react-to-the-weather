const data = new(require('../data/Data'));

class Logic {
    listAllCities() {
        return data.listAllCities();
    }

    listWeekWeather(id) {
        return data.listWeekWeather(id);
    }

    createCity(newCity) {
        // TODO: mejorar forma de generar un id unico
        newCity.id = new Date();
        return data.createCity(newCity, this.createWeekWeather(newCity.id));
    }

    deleteCity(id) {
        return data.deleteCity(id);
    }

    // Private

    createWeekWeather(id) {
        const icons = ['sunny', 'partly', 'cloud', 'rainy', 'wind', 'storm'];

        return {
            cityId: id,
            weather: [
                {
                    id: 1,
                    date: '25/01/2069',
                    icon: icons[Math.floor(Math.random() * icons.length)],
                    minTemperature: -10,
                    maxTemperature: 50,
                    description: icons[Math.floor(Math.random() * icons.length)] + ' day',
                    precipitation: Math.floor((Math.random() * (100 - 0) + 0)),
                    wind: Math.round((Math.random() * (10 - 1) + 1) *10) / 10
                },
                {
                    id: 2,
                    date: '26/01/2069',
                    icon: icons[Math.floor(Math.random() * icons.length)],
                    minTemperature: -10,
                    maxTemperature: 50,
                    description: icons[Math.floor(Math.random() * icons.length)] + ' day',
                    precipitation: Math.floor((Math.random() * (100 - 0) + 0)),
                    wind: Math.round((Math.random() * (10 - 1) + 1) *10) / 10
                },
                {
                    id: 3,
                    date: '27/01/2069',
                    icon: icons[Math.floor(Math.random() * icons.length)],
                    minTemperature: -10,
                    maxTemperature: 50,
                    description: icons[Math.floor(Math.random() * icons.length)] + ' day',
                    precipitation: Math.floor((Math.random() * (100 - 0) + 0)),
                    wind: Math.round((Math.random() * (10 - 1) + 1) *10) / 10
                },
                {
                    id: 4,
                    date: '28/01/2069',
                    icon: icons[Math.floor(Math.random() * icons.length)],
                    minTemperature: -10,
                    maxTemperature: 50,
                    description: icons[Math.floor(Math.random() * icons.length)] + ' day',
                    precipitation: Math.floor((Math.random() * (100 - 0) + 0)),
                    wind: Math.round((Math.random() * (10 - 1) + 1) *10) / 10
                },
                {
                    id: 5,
                    date: '29/01/2069',
                    icon: icons[Math.floor(Math.random() * icons.length)],
                    minTemperature: -10,
                    maxTemperature: 50,
                    description: icons[Math.floor(Math.random() * icons.length)] + ' day',
                    precipitation: Math.floor((Math.random() * (100 - 0) + 0)),
                    wind: Math.round((Math.random() * (10 - 1) + 1) *10) / 10
                },
                {
                    id: 6,
                    date: '30/01/2069',
                    icon: icons[Math.floor(Math.random() * icons.length)],
                    minTemperature: -10,
                    maxTemperature: 50,
                    description: icons[Math.floor(Math.random() * icons.length)] + ' day',
                    precipitation: Math.floor((Math.random() * (100 - 0) + 0)),
                    wind: Math.round((Math.random() * (10 - 1) + 1) *10) / 10
                },
                {
                    id: 7,
                    date: '31/01/2069',
                    icon: icons[Math.floor(Math.random() * icons.length)],
                    minTemperature: -10,
                    maxTemperature: 50,
                    description: icons[Math.floor(Math.random() * icons.length)] + ' day',
                    precipitation: Math.floor((Math.random() * (100 - 0) + 0)),
                    wind: Math.round((Math.random() * (10 - 1) + 1) *10) / 10
                }
            ]
        }
    }
}

module.exports = Logic