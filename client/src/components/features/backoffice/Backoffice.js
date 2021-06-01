import { React, Component } from "react";
import { Paper } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import LinearProgress from '@material-ui/core/LinearProgress';

import '../../../styles/Backoffice.css';
import AddModal from "./AddModal";
import ApiService from "../../../api/api.service";

class Backoffice extends Component {

    constructor () {
        super()

        this.state = {
            allCities: [],
            loading: false
        }
    }

    componentWillMount() {
        this.load();
    }

    sortCities(cities) {
        return cities.sort((a, b) => {
            if (a.name < b.name) { return -1 };
            if (a.name > b.name) { return 1 };
            return 0;
        })
    }

    onSubmitToParent = (newCity) => {
        this.setState({loading: true});
        ApiService.createCity(newCity)
            .then(res => {
                this.load();
            })
            .catch(err => console.error(err))
    }

    onDelete = (row) => {
        this.setState({loading: true});
        ApiService.deleteCity(row.id)
            .then(res => {
                this.load();
            })
            .catch(err => console.error(err))
    }

    load() {
        this.setState({loading: true});
        ApiService.getAllCities()
            .then(res => {
                this.setState({allCities: this.sortCities(res), loading: false})
            })
            .catch(err => console.error(err))
    }

    render() {
        return (<div className="backoffice">
            <h2>Your cities</h2>
            <p>Customize your list of cities. Here you can add, edit or delete them.</p>
            <div>
                <TableContainer component={Paper} elevation={3}>
                    <Table size="small" aria-label="Table of cities">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Community</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.allCities.map(row => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">{row.name}</TableCell>
                                    <TableCell>{row.ca}</TableCell>
                                    <TableCell>
                                        {/* <IconButton aria-label="edit" size="small">
                                            <EditIcon />
                                        </IconButton> */}
                                        <IconButton aria-label="delete" size="small" onClick={() => this.onDelete(row)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {this.state.loading ? <LinearProgress /> : null}
            </div>
            <AddModal onSubmitToParent={this.onSubmitToParent}/>
        </div>)
    }
}

export default Backoffice