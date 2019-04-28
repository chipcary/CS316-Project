import * as Constants from './../Constants';

const isEmpty = require("is-empty");

const initialState = {
	isAuthenticated: false,
	user: {},
};

export default function(state = initialState, action){
	return {
		...state,
		isAuthenticated: !isEmpty(action.payload),
		user: action.payload
	};
}