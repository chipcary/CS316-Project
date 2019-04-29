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
//get all users. for testing only
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
		console.log(results);
		res.send(results);
	})
	.catch(error => {
		res.send(error);
	});
});
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
		console.log(results);
		res.send(results);
	})
	.catch(error => {
		res.send(error);
	});
});
//validate user password
userRouter.route('/login/:email&:password').get((req, res) => {
	UserCreds.findByPk(req.params.email)
	.then(creds => {
		bcrypt.compare(req.params.password, creds.hash, function(err, match) {
		  if(match) {
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

//create a new user
userRouter.route('/:email&:name&:city&:state').post((req, res) => {
	console.log(req.params);
	User.create({
		email: req.params.email,
		name: req.params.name,
		city: req.params.city,
		state: req.params.state
	})
	.then(task =>{
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
userRouter.route('/:email/interests/:i1&:i2&:i3').put((req, res) => {
	email = req.params.email
	var values ={
		email: email,
		interest1: req.params.i1,
		interest2: req.params.i2,
		interest3: req.params.i3
	};
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

//add timeslots
// userRouter.route('/:email/timeslots/:dotw&:start_time&:end_time').post((req, res) => {
// 	var values ={
// 		email: req.params.email,
// 		day_of_the_week: req.params.dotw,
// 		start_time: req.params.start_time,
// 		end_time: req.params.end_time
// 	};
// 	UserTimeSlots.create(values)
// 	.then(task =>{
// 		res.status(200).send(task);
// 	})
// 	.catch(task =>{
// 		res.status(500).send(task);
// 	});
// });

//delete timeslot
// userRouter.route('/:email/timeslots/:dotw&:start_time&:end_time').delete((req, res) => {
// 	var values ={
// 		email: req.params.email,
// 		day_of_the_week: req.params.dotw,
// 		start_time: req.params.start_time,
// 		end_time: req.params.end_time
// 	};
// 	UserTimeSlots.destroy({
// 		where: values
// 	})
// 	.then(task =>{
// 		res.sendStatus(200);
// 	})
// 	.catch(task =>{
// 		res.status(500).send(task);
// 	});
// });

module.exports = userRouter;