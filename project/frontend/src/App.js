import React from 'react';
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
import {Provider} from 'react-redux';
import {setCurrentUser, logoutUser} from './action';
import setAuthToken from './setAuthToken';
import configureStore from "./configureStore";
import RegisterPage from "./RegisterPage";

const store = configureStore();

class App extends React.Component {

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
      

      store.dispatch(setCurrentUser(decoded));
      const currentTime = Date.now() / 1000; // to get in milliseconds
      var path = '/api/users/' + user_email;

      var response = await fetch(path);
      var res = await response.json();
      if(decoded.exp < currentTime){
        store.dispatch(logoutUser());
        this.setState = {
          user: false,
        }
        window.location.href="./login";
      } else {
        this.setState({
          current_user: res[0]
        });
      }
    }
  }

  render() {
    let props ={};
    return (
      <div>
          <Provider store={store}>
          <Router>
            <div className = "App">
              <Route exact path="/" component={RegisterPage}/>
              <Route exact path="/login" component={LoginPage}/>
              <Route exact path="/userSearch" component={UsersSearchPage}/>
              <Route exact path="/projectSearch" component={ProjectSearchPage}/>
              <Route path="/users/:user_email" component={DifferentUserPage}/>
              <Route path="/projects/:pid" component={DifferentProjectPage}/>
            </div>
          </Router>
          </Provider>
      </div>
    );
  }
}

export default App;
