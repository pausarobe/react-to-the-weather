import { Component } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar } from "@material-ui/core";

import logo from "../../images/logo.png";
import "../../styles/Navbar.css";
 
class Navbar extends Component {
    render() {
        return (<AppBar position="static">
            <Toolbar className="navbar">
                <div className="navbar__left">
                    <Link to={"/"}>
                        <img className="logo" src={logo} alt="React to the weather logo"></img>
                    </Link>
                    <Link to={"/"} className="navbar-title">React to the Weather</Link>
                </div>
                <Link to={"/backoffice"} className="navbar-backoffice">Backoffice</Link>
            </Toolbar>
        </AppBar>)
    }
}

export default Navbar