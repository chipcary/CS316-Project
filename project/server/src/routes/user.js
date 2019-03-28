var express = require('express');
var app = express();
var userRouter = express.Router();
const User = require('../models').User;
const UserInterests = require('../models').UserInterests;
const UserTimeSlots = require('../models').UserTimeSlots;
const UserJoinsProject = require('../models').UserJoinsProject;

//get all users. for testing only
userRouter.route('/').get((req, res) => {
	User.findAll()
	.then(email => {
		res.send(email);
	})
	.catch(error => {
		res.send(error);
	});
});
//get attributes associated with a user
userRouter.route('/:email').get((req, res) => {
	var email = req.params.email;
	User.findAll({
		where: {
			email: email
		},
		include: [UserTimeSlots, UserInterests]
	})
	.then(email => {
		res.send(email);
	})
	.catch(error => {
		res.send(error);
	});
});

//create a new user
//TODO: hash and store password
userRouter.route('/:email&:name&:city&:state').post((req, res) => {
	console.log(req.params);
	User.create({
		email: req.params.email,
		name: req.params.name,
		city: req.params.city,
		state: req.params.state
	})
	.then(task =>{
		res.status(200).send(task);
	})
	.catch(task =>{
		res.status(500).send(task);
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
userRouter.route('/destroy/:email').get((req, res) => {
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
	var values ={
		email: req.params.email,
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
			User.create(values)
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
userRouter.route('/:email/timeslots/:dotw&:start_time&:end_time').post((req, res) => {
	var values ={
		email: req.params.email,
		day_of_the_week: req.params.dotw,
		start_time: req.params.start_time,
		end_time: req.params.end_time
	};
	User.create(values)
	.then(task =>{
		res.status(200).send(task);
	})
	.catch(task =>{
		res.status(500).send(task);
	});
});

//delete timeslot
userRouter.route('/:email/timeslots/destroy/:dotw&:start_time&:end_time').get((req, res) => {
	var values ={
		email: req.params.email,
		day_of_the_week: req.params.dotw,
		start_time: req.params.start_time,
		end_time: req.params.end_time
	};
	User.destroy(values)
	.then(task =>{
		res.status(200).send(task);
	})
	.catch(task =>{
		res.status(500).send(task);
	});
});

module.exports = userRouter;