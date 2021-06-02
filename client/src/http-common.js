import axios from "axios";

export default axios.create({
    // baseURL: 'http://localhost:8080/api',
    baseURL: 'https://fierce-refuge-35923.herokuapp.com/api/',
    headers: {
        "Content-type": "application/json"
    }
})