import { Component } from "react";
import { HashRouter, Switch, Route } from "react-router-dom";

import Footer from "./components/core/Footer";
import Navbar from "./components/core/Navbar";
import WeatherHome from "./components/features/home/WeatherHome";
import Backoffice from "./components/features/backoffice/Backoffice";

class Main extends Component {
    render() {
        return(<HashRouter>
            <div id="main">
                <Navbar/>
                <Switch>
                    <Route exact path="/" component={WeatherHome}></Route>
                    <Route exact path="/backoffice" component={Backoffice}></Route>
                </Switch>
                <Footer/>
            </div>
        </HashRouter>)
    }
}

export default Main