import { Component } from "react";

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import Week from "./Week";
import "../../../styles/WeatherHome.css";
import ApiService from "../../../api/api.service";

class WeatherHome extends Component {

    constructor() {
        super()

        this.state = {
            allCities: [],
            citySelected: '',
            showWeek: false
        }
    }

    componentWillMount() {
        ApiService.getAllCities()
            .then(res => {
                this.setState({allCities: this.sortCities(res)})
            })
            .catch(err => console.error(err))
    }

    sortCities(cities) {
        return cities.sort((a, b) => {
            if (a.name < b.name) { return -1 };
            if (a.name > b.name) { return 1 };
            return 0;
        })
    }

    onSelectedValue(newValue) {
        if (newValue) {
            const selectedCity = this.state.allCities.find(f => f.name === newValue);
            this.setState({citySelected: selectedCity, showWeek: true});
        } else {
            this.setState({citySelected: newValue, showWeek: false});
        }
    }

    render() {
        return (<div className="weather-home">
            <div className="weather-home__city">
                <div>
                    <p>If you want to know the weather in your city, use our application!</p>
                    <Autocomplete
                        onChange={(event, newValue) => {
                            this.onSelectedValue(newValue)
                        }}
                        options={this.state.allCities.map((option) => option.name)}
                        style={{ width: 300 }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Search a city"
                                margin="normal"
                                variant="outlined"
                            />
                        )}
                    />
                </div>
                {this.state.citySelected ? <div>
                    <div className="weather-home__city__name">{this.state.citySelected.name.toUpperCase()}</div>
                    <div className="weather-home__city__ca">{this.state.citySelected.ca}</div>
                </div> : null}
            </div>
            {this.state.showWeek ? <Week selectedCity={this.state.citySelected}/> : null}
        </div>)
    }
}

export default WeatherHome