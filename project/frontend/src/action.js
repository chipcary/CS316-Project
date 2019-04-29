import jwt_decode from "jwt-decode";
import axios from "axios";
import setAuthToken from "./setAuthToken"
import {SET_CURRENT_USER} from "./reducers/actionTypes";


export const loginUser = userData => dispatch => {
  var path = "/api/users/login/" + userData.email + "&" + userData.password;
  axios
    .get(path, userData)
    .then( res => {
      if(res.data.success == true) {
      
        const { token } = res;
        localStorage.setItem("jwtToken", token);

        setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded));
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

export const setCurrentUser = (decoded) => {
  return {
    payload: decoded,
    type: SET_CURRENT_USER,
  };
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");

  setAuthToken(false);
  dispatch(setCurrentUser({}));
};


