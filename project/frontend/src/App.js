import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructur() {
    super();

    this.state = {
      navbar_items: [Constants.CurrentUserPage, Constants.ProjectsSearchPage, Constants.UsersSearchPage, Constants.SettingsPage]
    }

    this.determineUser();
  }

  determineUser = async () => {
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
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
      <div>
        <Provider store ={store}>
          <div className = "App">
            <Route exact path="/login" component={Login}/>
            <PrivateRoute exact path="/currentUser" component={CurrentUser}/>
            <PrivateRoute exact path="/projectsSearch" component={ProjectSearch}/>
            <PrivateRoute exact path="/usersSearch" component={UsersSearch}/>
            <PrivateRoute exact path="/settings" component={SettingsPage}/>
          </div>
        </Provider>
      </div>
    );
  }
}

export default App;
