const jwt_decode = require('jwt-decode');
const isEmpty = require('is-empty');

export default class AuthRoleValidation{
	
	constructor(){
		this.state = {
			current_user: {}
		};
		this.determineUser = this.determineUser.bind(this);
	}

	static async determineUser(){
		console.log('gets here');
		if(localStorage != null){
			const decoded = jwt_decode(localStorage.getItem("jwtToken"));
			const email = decoded.email;
			var path = '/api/users/' + email;
			var res = await fetch(path, {method: 'GET' });
			var response = await res.json();
			return response;
		}
		return null;
	}
}