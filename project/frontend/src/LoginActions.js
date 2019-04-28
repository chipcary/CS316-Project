import axios from 'axios';
//import setAuthToken from './setAuthToken'
import jwt_decode from "jwt-decode";

export const loginUser = userData => {
	var path = "/api/users/login/" + userData.email + "&" userData.password;
	axios
		.get(path, userData)
		.then( res=> {
			const{token} = res.data;
			localStorage.setItem("jwtToken", token);
			setAuthToken(token);
			const decode = jwt_decode(token);

			dispatch(setCurrentUser(decoded));
		})
		.catch(err => 
			dispatch({
				payload: err.response.data
			})
		);
};

export const setCurrentUser = (decoded) => {
	return {
		payload: decoded
	};
};

export const setAuthToken = token => {
	if (token) {
    // Apply authorization token to every request if logged in
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};
