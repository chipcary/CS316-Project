import jwt_decode from "jwt-decode";
import axios from "axios";
import setAuthToken from "./setAuthToken"
import {SET_CURRENT_USER} from "./reducers/actionTypes";



export const loginUser = userData => dispatch => {
  var path = "/api/users/login/" + userData.email + "&" + userData.password;
  axios
    .get(path, userData)
    .then( res => {
      console.log(res);
      if(res.data.success == true) {
        console.log('hello')
        var token = res.data.token;
        console.log(token);
        localStorage.setItem("jwtToken", token);
        console.log('helo2');
        setAuthToken(token);
        console.log('helo4');
        const decoded = jwt_decode(token);
        console.log('helo5');
        dispatch(setCurrentUser(decoded));
        alert('User succesfully created!');
      } else {
        alert('Invalid Email/Password');
      }
    })
    .catch(err => {
      dispatch({
        payload: err.response.data
      })
    });
};

export const associatePassword = userData => dispatch => {
  var path = "/api/users/login/" + userData.email + "&" + userData.password;
  axios
    .put(path, userData)
    .then(res =>{
      console.log(res.data)
      if(res.data.success == true){
        alert('User successfully created');
      }
    })
}

export const registerUser = userData => dispatch => {
  var path = "/api/users/" + userData.email + "&" + userData.name + "&" + userData.city + "&" + userData.state;
  axios
    .post(path, userData)
    .then( res => {
      console.log(res.data);
      if(res.data.success == true) {
        console.log('hello')
        var token = res.data.token;
        console.log(token);
        localStorage.setItem("jwtToken", token);
        console.log('helo2');
        setAuthToken(token);
        console.log('helo4');
        const decoded = jwt_decode(token);
        console.log('helo5');
        dispatch(setCurrentUser(decoded));
        alert('Account successfully created!')
      } else {
        alert('An account with this email already exists. Please choose a different email.');
      }
    })
    .catch(err => {
      dispatch({
        payload: err.response.data
      })
    });

    console.log('DOES THIS GET HERE I HOPE IT DOES');
};



export const setCurrentUser = (decoded) => {
  console.log('i hope this even works');
  return {
    payload: decoded,
    type: SET_CURRENT_USER,
  };
};

export const logoutUser = () => dispatch => {
  console.log('hello');
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};


