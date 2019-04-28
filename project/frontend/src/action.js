import jwt_decode from "jwt-decode";
import axios from "axios";


export const loginUser = userData => dispatch => {
  var path = "/api/users/login/" + userData.email + "&" + userData.password;
  axios
    .get(path, userData)
    .then( res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);

      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      dispatch({
        payload: err.response.data
      })
    });
};

export const setCurrentUser = (decoded) => {
  return {
    payload: decoded
  };
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");

  setAuthToken(false);
  dispatch(setCurrentUser({}));
};

export const setAuthToken = token => {
  if(token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};


