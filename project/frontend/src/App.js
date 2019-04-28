import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import  * as Constants from './Constants';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import UsersSearchPage from "./UsersSearchPage"

class App extends Component {

  constructor() {
    super();

    this.state = {
      navbar_items: [Constants.CurrentUserPage, Constants.ProjectsSearchPage, Constants.UsersSearchPage, Constants.SettingsPage]
    }

   // this.determineUser();
  }

 /* determineUser = async () => {
    if (localStorage.jwtToken) {
        // Set auth token header auth
        const token = localStorage.jwtToken;
        //check user still exists
        const decoded = jwt_decode(token);
        var user_id = decoded.id;
        setAuthToken(token);
        
        // Decode token and get user info and exp
        if(decoded.admin==true){
          setAdminToken(token);
          this.state = {
            user: true,
          }
        }
        // Set user and isAuthenticated
        store.dispatch(setCurrentUser(decoded));
        // Check for expired token
        const currentTime = Date.now() / 1000; // to get in milliseconds
        var response = await SubmitRequest.submitGetUserByID(user_id);

        if (decoded.exp < currentTime || !response.success) {
          // Logout user
          store.dispatch(logoutUser());
          this.state = {
            user: false,
          }
      
          // Redirect to login
          window.location.href = "./login";
        }
    }
  }*/

  render() {
    return (
      <div>
          <Router>
            <div className = "App">
              <Route exact path="/" component={UsersSearchPage}/>
            </div>
          </Router>
      </div>
    );
  }
}

export default App;
