import { Component } from 'react';
import { Paper } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';

import '../../../styles/Week.css';
import sunny from '../../../images/SUNNY.png';
import partly from '../../../images/PARTLY-SUNNY.png';
import cloud from '../../../images/CLOUDY.png';
import rainy from '../../../images/RAINY.png';
import wind from '../../../images/WINDY.png';
import storm from '../../../images/THUNDERSTORM.png';
import ApiService from "../../../api/api.service";

const hours = ['24:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];

class Week extends Component {

    constructor(props) {
        super(props)

        this.state = {
            selectedCity: this.props.selectedCity,
            weekWeather: null,
            detailInfo: '',
            showWeekDetail: false,
            dataTable: [],
            activePaper: null,
            allWindDay: [],
            allPrecipitationDay: []
        }
    }

    componentDidMount() {
        ApiService.getWeatherWeek(this.props.selectedCity.id)
            .then(res => {
                console.log('res', res);
                this.setState({weekWeather: res[0].weather})
            })
            .catch(err => console.error(err))
    }

    onWeekDetail(detail) {
        console.log('onWeekDetail', detail);
        const hourlyData = [];
        hours.forEach(hour => {
            hourlyData.push({
                hour,
                temp: Math.round((Math.random() * (detail.maxTemperature - detail.minTemperature) + detail.minTemperature) *10) / 10,
                wind: Math.round((Math.random() * (10 - 1) + 1) *10) / 10,
                precipitation: Math.floor((Math.random() * (100 - 0) + 0))
            })
        })
        console.log('hourlyData', hourlyData);
        const allWindDay = [];
        const allPrecipitationDay = [];
        hourlyData.forEach(item => {
            allWindDay.push(item.wind);
            allPrecipitationDay.push(item.precipitation);
        })

        this.setState({
            detailInfo: detail,
            showWeekDetail: true,
            dataTable: hourlyData,
            activePaper: detail.id,
            allWindDay,
            allPrecipitationDay
        });

        setTimeout(() => {
            const topPosition = document.getElementById('day').offsetTop;
            window.scrollTo({left: 0, top: topPosition, behavior: 'smooth'});
        }, 10)
    }

    getDay(date) {
        const day = moment(date, 'DD/MM/YYYY').format('dddd');
        return day;
    }

    getMonth(date) {
        const day = moment(date, 'DD/MM/YYYY').format('MMMM');
        return day;
    }

    getIcon(data) {
        let icon;

        if (data === 'sunny') {
            icon = sunny;
        }

        if (data === 'partly') {
            icon = partly;
        }

        if (data === 'cloud') {
            icon = cloud;
        }

        if (data === 'rainy') {
            icon = rainy;
        }

        if (data === 'wind') {
            icon = wind;
        }

        if (data === 'storm') {
            icon = storm;
        }

        return icon;
    }

    render() {
        return (
            <div>
                <div className="week">
                    {this.state.weekWeather && this.state.weekWeather.map(weekDetail => {
                        return (
                            <Paper key={weekDetail.id} elevation={3}
                                className={`week-detail ${this.state.activePaper === weekDetail.id ? 'week-detail--selected' : ''}`}
                                onClick={() => this.onWeekDetail(weekDetail)}
                            >
                                <div>
                                    <div className="week-detail__day">{this.getDay(weekDetail.date)}</div>
                                    <div>{this.getMonth(weekDetail.date)}, {weekDetail.date.split('/')[0]}</div>
                                </div>
                                <div className="week-detail__icon">
                                    <img className="icon-weather" src={this.getIcon(weekDetail.icon)} alt="weather icon"></img>
                                </div>
                                <div className="week-detail__minMax">{weekDetail.minTemperature}ºC / {weekDetail.maxTemperature}ºC</div>
                            </Paper>
                        )
                    })}
                </div>
                <div id="day" className="day">
                    {this.state.showWeekDetail ? <div>
                        <div className="day__wrapper">
                            <div className="day__wrapper__left">
                                <div className="day__title">{this.getDay(this.state.detailInfo.date)}</div>
                                <div>{this.state.detailInfo.date}</div>
                                <div>We're going to have a <strong>{this.state.detailInfo.description}</strong></div>
                                <div className="day__details">
                                    <div className="day__details__section">
                                        <div>Min temp: <strong>{this.state.detailInfo.minTemperature}ºC</strong></div>
                                        <div>Max temp: <strong>{this.state.detailInfo.maxTemperature}ºC</strong></div>
                                    </div>
                                    <div className="day__details__section">
                                        <div>Min wind: <strong>{Math.min(...this.state.allWindDay)} km/h</strong></div>
                                        <div>Max wind: <strong>{Math.max(...this.state.allWindDay)} km/h</strong></div>
                                    </div>
                                    <div className="day__details__section">
                                        <div>Min precipitation: <strong>{Math.min(...this.state.allPrecipitationDay)}%</strong></div>
                                        <div>Max precipitation: <strong>{Math.max(...this.state.allPrecipitationDay)}%</strong></div>
                                    </div>
                                </div>
                            </div>
                            <div className="day__wrapper__right">
                                <img className="icon-weather" src={this.getIcon(this.state.detailInfo.icon)} alt="weather icon"></img>
                            </div>
                        </div>
                        <div>
                            <TableContainer component={Paper} elevation={3}>
                                <Table size="small" aria-label="Weather table of day">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Hours</TableCell>
                                            <TableCell>Tempterature</TableCell>
                                            <TableCell>Wind</TableCell>
                                            <TableCell>Precipitation</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.dataTable.map(row => (
                                            <TableRow key={row.hour}>
                                                <TableCell component="th" scope="row">{row.hour}</TableCell>
                                                <TableCell>{row.temp}ºC</TableCell>
                                                <TableCell>{row.wind} km/h</TableCell>
                                                <TableCell>{row.precipitation} %</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </div> : null}
                </div>
            </div>
        )
    }
}

export default Week