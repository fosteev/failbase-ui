import React, {Component} from 'react'
// import { Button } from 'antd';
// import {Provider} from 'react-redux';
// import {store} from "./store";
import Home from "./screens/home";

import './App.css';
import {Redirect, BrowserRouter} from "react-router-dom";

class Root extends Component {
    render() {
        return (
            <BrowserRouter>
                <Home />
                <Redirect to={'/home'}></Redirect>
            </BrowserRouter>
        );
    }

}

export default Root;
