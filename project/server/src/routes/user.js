var express = require('express');
var app = express();
var userRouter = express.Router();
const User = require('../models').User;
const UserInterests = require('../models').UserInterests;
const UserJoinsProject = require('../models').UserJoinsProject;
const UserCreds = require('../models').UserCreds;
var Sequelize = require('sequelize');
const Op = Sequelize.Op

var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const LIMIT = 100;

/*
get all users
query params: 
page - specifies the page of results to return

results:
count - the number of rows in users
rows
pages - the number of pages
*/
userRouter.route('/').get((req, res) => {
	var page = req.query.page;
	var options = {limit: LIMIT};
	if(page){
		options["offset"] = (page-1)*LIMIT;
	}
	User.findAndCountAll(options)
	.then(results => {
		var pages = Math.ceil(results.count/LIMIT);
		results["pages"] = pages;
		res.send(results);
	})
	.catch(error => {
		res.send(error);
	});
});

/*
search all user names for a substring
query params: 
page - specifies the page of results to return

results:
count - the number of matching rows
rows - the matching tuples
pages - the number of pages
*/
userRouter.route('/search-substr/:sub').get((req, res) => {
	var page = req.query.page;
	var options = {
		where:{
			name: {
				[Op.iLike]: '%' + req.params.sub + '%'
			}
		},
		limit: LIMIT
	};
	if(page){
		options["offset"] = (page-1)*LIMIT;
	}
	User.findAndCountAll(options)
	.then(results => {
		var pages = Math.ceil(results.count/LIMIT);
		results["pages"] = pages;
		res.send(results);
	})
	.catch(error => {
		res.send(error);
	});
});

//validate user password
//returns 403 on failure
userRouter.route('/login/:email&:password').get((req, res) => {
	UserCreds.findByPk(req.params.email)
	.then(creds => {
		bcrypt.compare(req.params.password, creds.hash, function(err, match) {
		  if(match) {
		  	const payload = {
		  		email: req.params.email,
		  	};
		  	jwt.sign(
		  		payload,
		  		"secret",
		  		{
		  			expiresIn: 31556926
		  		},
		  		(err, token) => {
		  			var toSend = {};
		  			toSend.success = true;
		  			toSend.token = "Bearer " + token;
		  			res.send(toSend);
		  		}
		  	);
		  } else {
		  	console.log('hello');
		  	res.status(403).send(false);
		  } 
		});
	})
	.catch(error => {
		console.log('hello22')
		var toSend = {};
		toSend.success = false;
		res.send(toSend);
	});
});

//set or update user password
userRouter.route('/login/:email&:password').put((req, res) => {
	//bcrypt automatically salts and hashes passwords
	//done async bc hashing takes a lot of CPU
	bcrypt.hash(req.params.password, 10, function(err, hash){
		UserCreds.findByPk(req.params.email)
		.then(user => {
			if(!user){
				UserCreds.create({
					email: req.params.email,
					hash: hash
				})
				.then(task =>{
					var toSend = {}
					toSend.success = true;
					toSend.create = true;
					res.send(toSend);
				})
				.catch(task =>{
					res.status(500).send(task);
				});
			}
			else{
				user.hash = hash;
				user.save()
				.then(task =>{
					var toSend = {}
					toSend.success = true;
					toSend.update = true;
					res.send(toSend);
				})
				.catch(task =>{
					res.status(500).send(task);
				});
			}
		})
		.catch(error => {
			res.status(500).send(error);
		});
	});
});
//get attributes associated with a user
userRouter.route('/:email').get((req, res) => {
	var email = req.params.email;
	User.findAll({
		where: {
			email: email
		},
		include: [UserInterests]
	})
	.then(email => {
		res.send(email);
	})
	.catch(error => {
		res.send(error);
	});
});

/*get users with matching interests

query params:
substr - filter by matching substring in name
loc - only include results with matching city, state when true
page - specify which page to return
*/
userRouter.route('/:email/match').get((req, res) => {
	var substr = req.query.substr;
	var match_location = req.query.loc;
	var email = req.params.email;
	User.findOne({
		where: {
			email: email
		},
		include: [UserInterests]
	})
	.then(user => {
		var valid_interests = [];
		if(user.UserInterest.interest1 && user.UserInterest.interest1 !== ''){
			valid_interests.push(user.UserInterest.interest1);
		}
		if(user.UserInterest.interest2 && user.UserInterest.interest2 !== ''){
			valid_interests.push(user.UserInterest.interest2);
		}
		if(user.UserInterest.interest3 && user.UserInterest.interest3 !== ''){
			valid_interests.push(user.UserInterest.interest3);
		}
		console.log(valid_interests);
		var page = req.query.page;
		var options = {
			limit: LIMIT,
			where: {
				email: {
					[Op.ne] : email
				}
			},
			include: {
				model: UserInterests,
				where: {
					[Op.or]: [{interest1: {[Op.in] : valid_interests}}, {interest2: {[Op.in] : valid_interests}}, {interest3: {[Op.in] : valid_interests}}]
				}
			}
		};
		if(substr){
			options["where"]["name"] = {[Op.iLike] : '%' + substr + '%'};
		}
		if(match_location){
			options["where"]["city"] = user.city;
			options["where"]["state"] = user.state;
		}
		if(page){
			options["offset"] = (page-1)*LIMIT;
		}
		console.log(options);
		User.findAndCountAll(options)
		.then(results => {
			var pages = Math.ceil(results.count/LIMIT);
			results["pages"] = pages;
			res.send(results);
		})
		.catch(error => {
			res.send(error);
		});
	})
	.catch(error => {
		res.send(error);
	});
});


//create a new user
// userRouter.route('/:email&:name&:city&:state').post((req, res) => {
// 	User.create({
// 		email: req.params.email,
// 		name: req.params.name,
// 		city: req.params.city,
// 		state: req.params.state
// 	})
// 	.then(task =>{
// 		const payload = {
// 			email: req.params.email,
// 		}
// 		jwt.sign(
// 			payload,
// 			"secret",
// 			{
// 				expiresIn: 31556926
// 			},
// 			(err, token) => {
// 				var toSend = {};
// 				toSend.success = true;
// 				toSend.token = "Bearer " + token;
// 				console.log(toSend);
// 				res.send(toSend);
// 			}
// 		);
// 	})
// 	.catch(task =>{
// 		var toSend = {};
// 		toSend.success = false;
// 		res.send(toSend);
// 	});
// });

//create a new user with a password included
userRouter.route('/:email&:name&:city&:state&:password').post((req, res) => {
	bcrypt.hash(req.params.password, 10, function(err, hash){
		User.create({
			email: req.params.email,
			name: req.params.name,
			city: req.params.city,
			state: req.params.state
		})
		.then(task =>{
			UserCreds.create({
				email: req.params.email,
				hash: hash
			})
			.then(results =>{
				const payload = {
				email: req.params.email,
				}
				jwt.sign(
					payload,
					"secret",
					{
						expiresIn: 31556926
					},
					(err, token) => {
						var toSend = {};
						toSend.success = true;
						toSend.token = "Bearer " + token;
						console.log(toSend);
						res.send(toSend);
					}
				);
			})
			.catch(task =>{
				var toSend = {};
				toSend.success = false;
				res.send(toSend);
			});
		})
		.catch(task =>{
			var toSend = {};
			toSend.success = false;
			res.send(toSend);
		});
	});
});

//update user info
userRouter.route('/:email/:name&:city&:state').put((req, res) => {
	var email = req.params.email;
	User.findByPk(email)
	.then(user =>{
		user.name = req.params.name;
		user.city = req.params.city;
		user.state = req.params.state;
		user.save()
		.then(task =>{
			res.status(200).send(task);
		})
		.catch(task =>{
			res.status(500).send(task);
		});
	})
	.catch(task =>{
		res.status(500).send(task);
	});
});

//delete a user
userRouter.route('/:email').delete((req, res) => {
	var email = req.params.email;
	User.destroy({
		where: {
			email: email
		}
	})
	.then(email => {
		res.sendStatus(200);
	})
	.catch(error => {
		res.status(500).send(error)
	});
});

//update user interests
userRouter.route('/:email/interests').put((req, res) => {
	email = req.params.email
	var values =req.body;
	values["email"] = email
	UserInterests.findByPk(email)
	.then(user =>{
		if(user){
			user.update(values)
			.then(task =>{
				res.status(200).send(task);
			})
			.catch(task =>{
				res.status(500).send(task);
			});
		}
		else{
			UserInterests.create(values)
			.then(task =>{
				res.status(200).send(task);
			})
			.catch(task =>{
				res.status(500).send(task);
			});
		}	
	})
	.catch(task =>{
		res.status(500).send(task);
	});
});


module.exports = userRouter;