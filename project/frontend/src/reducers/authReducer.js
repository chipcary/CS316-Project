import * as Constants from './../Constants';
import {SET_CURRENT_USER} from "./actionTypes";

const isEmpty = require("is-empty");

const initialState = {
	isAuthenticated: false,
	user: {},
};

export default function(state = initialState, action){
	switch(action.type) {
		case SET_CURRENT_USER:
		    		console.log('22FUCK THIS SHIT');
			return {
				...state,
				isAuthenticated: !isEmpty(action.payload),
				user: action.payload
			};
		default:
			console.log('FUCK THIS SHIT');
			return state;
	}
}