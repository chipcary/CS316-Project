import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import  * as Constants from './Constants';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import UsersSearchPage from "./UsersSearchPage"
import ProjectSearchPage from "./ProjectsSearchPage"
import DifferentUserPage from "./DifferentUserPage"
import DifferentProjectPage from "./DifferentProjectPage"
import LoginPage from "./LoginPage"
import jwt_decode from "jwt-decode";
import axios from 'axios';
import {setCurrentUser, logoutUser, setAuthToken} from './action';
import configureStore from "./store";

var store = configureStore();

class App extends Component {

  constructor() {
    super();

    this.state = {
      current_user: {},
    }

    this.detemineUser = this.determineUser.bind();
    this.determineUser();
  }

  determineUser = async () => {
    if (localStorage.jwtToken) {
        const token = localStorage.jwtToken;
        const decoded = jwt_decode(token);
        var user_email = decoded.email;
        setAuthToken(token);
        

        // Set user and isAuthenticated
        store.dispatch(setCurrentUser(decoded));
        // Check for expired token
        const currentTime = Date.now() / 1000; // to get in milliseconds
        var path = '/api/users/' + user_email;

        var response = await fetch(path, {method: 'GET'})
          .then(data => data.json())
          .then((res) => {
            if(decoded.exp < currentTime){
              store.dispatch(this.logoutUser());
              this.setState = {
                user: false,
              }
              window.location.href="./login";
            } else {
              this.setState({
                current_user: res[0]
              });
            }
        });
    }
  }

  render() {
    return (
      <div>
          <Router>
            <div className = "App">
              <Route exact path="/login" component={LoginPage}/>
              <Route exact path="/userSearch" component={UsersSearchPage}/>
              <Route exact path="/projectSearch" component={ProjectSearchPage}/>
              <Route path="/users/:user_email" component={DifferentUserPage}/>
              <Route path="/projects/:pid" component={DifferentProjectPage}/>
            </div>
          </Router>
      </div>
    );
  }
}

export default App;
