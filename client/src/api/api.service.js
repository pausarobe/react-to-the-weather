import http from '../http-common';

class ApiService {
    getAllCities() {
        return http.get('/allCities').then(res => res.data);
    }

    getWeatherWeek(id) {
        return http.get(`/week/${id}`).then(res => res.data);
    }

    createCity(newCity) {
        return http.post(`/city`, {newCity}).then(res => res.data);
    }

    deleteCity(id) {
        return http.delete('/city/' + id).then(res => res.data);
    }
}

export default new ApiService();