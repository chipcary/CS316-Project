var express = require('express');
var app = express();
var projectRouter = express.Router();
const Project = require('../models').Project;
const User = require('../models').User;
const UserJoinsProject = require('../models').UserJoinsProject;

//all projects
projectRouter.route('/').get((req, res) => {
	Project.findAll()
	.then(results => {
		res.send(results);
	})
	.catch(error => {
		res.send(error);
	});
});
//get all projects created by a user
projectRouter.route('/:creator_email/created').get((req, res) => {
	Project.findAll({
		where: {
			creator_email: req.params.creator_email
		}
	})
	.then(results => {
		res.send(results);
	})
	.catch(error => {
		res.send(error);
	});
});

//get specific project
projectRouter.route('/:creator_email&:project_name').get((req, res) => {
	Project.findAll({
		where: {
			creator_email: req.params.creator_email,
			project_name: req.params.project_name
		}
	})
	.then(results => {
		res.send(results);
	})
	.catch(error => {
		res.send(error);
	});
});

//reccomended projects for a user
projectRouter.route('/:email/best').get((req, res) => {
	User.getRecProjects(req.params.email, res);
});

//add user to project
projectRouter.route('/:creator_email&:project_name/add_user/:user_email').post((req, res) => {
	UserJoinsProject.create({
		user_email: req.params.user_email,
		creator_email: req.params.creator_email,
		project_name: req.params.project_name
	})
	.then(results => {
		res.send(results);
	})
	.catch(error => {
		res.send(error);
	});
});

//remove user from project
projectRouter.route('/:creator_email&:project_name/destroy/:user_email').get((req, res) => {
	UserJoinsProject.destroy({
		where: {
			user_email: req.params.user_email,
			creator_email: req.params.creator_email,
			project_name: req.params.project_name
		}
	})
	.then(results => {
		res.sendStatus(200);
	})
	.catch(error => {
		res.send(error);
	});
});

//create new project
projectRouter.route('/:creator_email&:project_name&:tag&:project_date&:day_of_the_week&:start_time&:end_time&:curr_capacity&:goal_capacity&:city&:state')
.post((req, res) => {
	Project.create({
		creator_email: req.params.creator_email,
		tag: req.params.tag,
		project_date: req.params.project_date,
		day_of_the_week: req.params.day_of_the_week,
		start_time: req.params.start_time,
		end_time: req.params.end_time,
		curr_capacity: req.params.curr_capacity,
		goal_capacity: req.params.goal_capacity,
		city: req.params.city,
		state: req.params.state
	})
	.then(results => {
		res.send(results);
	})
	.catch(error => {
		res.send(error);
	});
});

//update project
projectRouter.route('/:creator_email&:project_name&:tag&:project_date&:day_of_the_week&:start_time&:end_time&:curr_capacity&:goal_capacity&:city&:state')
.put((req, res) => {
	Project.findOne({
		where: {
			creator_email: req.params.creator_email,
			project_name: req.params.project_name
		}
	})
	.then(project => {
		project.creator_email = req.params.creator_email;
		project.tag = req.params.tag;
		project.project_date = req.params.project_date;
		project.day_of_the_week = req.params.day_of_the_week;
		project.start_time = req.params.start_time;
		project.end_time = req.params.end_time;
		project.curr_capacity = req.params.curr_capacity;
		project.goal_capacity = req.params.goal_capacity;
		project.city = req.params.city;
		project.state = req.params.state;
		project.save()
		.then(task =>{
			res.status(200).send(task);
		})
		.catch(task =>{
			res.status(500).send(task);
		});
	})
	.catch(error => {
		res.send(error);
	});
});

//delete project
projectRouter.route('/destroy/:creator_email&:project_name').get((req, res) => {
	Project.destroy({
		where: {
			creator_email: req.params.creator_email,
			project_name: req.params.project_name
		}
	})
	.then(results => {
		res.sendStatus(200);
	})
	.catch(error => {
		res.send(error);
	});
});


module.exports = projectRouter;