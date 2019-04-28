import * as Constants from './Constants'

export default class SubmitRequest{
	
	static async getAllUsers(){
		console.log('gets here');
		var users = await fetch('/api/users/' , { method: 'GET' })
		.then((res) => {
			console.log(res)
			console.log(JSON.stringify(res));
			return { success: true , data: res }
		});
	}
}