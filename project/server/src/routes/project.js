var express = require('express');
var app = express();
var projectRouter = express.Router();
const Project = require('../models').Project;
const User = require('../models').User;
const UserJoinsProject = require('../models').UserJoinsProject;
var Sequelize = require('sequelize');
const Op = Sequelize.Op

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
projectRouter.route('/search-substr/:sub').get((req, res) => {
	Project.findAll({
		where:{
			project_name: {
				[Op.like]: '%' + req.params.sub + '%'
			}
		}
	})
	.then(projects => {
		res.send(projects);
	})
	.catch(error => {
		res.send(error);
	});
});
projectRouter.route('/search-tag/:tag').get((req, res) => {
	Project.findAll({
		where:{
			tag : req.params.tag
		}
	})
	.then(projects => {
		res.send(projects);
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

//get projects joined by a user
projectRouter.route('/:email/joined').get((req, res) => {
	UserJoinsProject.findAll({
		where: {
			user_email: req.params.email
		},
		include: [Project]
	})
	.then(results => {
		res.send(results);
	})
	.catch(error => {
		res.send(error);
	});
});

//get specific project
projectRouter.route('/:pid').get((req, res) => {
	Project.findByPk(req.params.pid)
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
projectRouter.route('/:pid/users/:user_email').post((req, res) => {
	UserJoinsProject.create({
		user_email: req.params.user_email,
		pid: req.params.pid
	})
	.then(results => {
		res.send(results);
	})
	.catch(error => {
		res.send(error);
	});
});

//remove user from project
projectRouter.route('/:pid/users/:user_email').delete((req, res) => {
	UserJoinsProject.destroy({
		where: {
			user_email: req.params.user_email,
			pid: req.params.pid
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
projectRouter.route('/')
.post((req, res) => {
	project_data = req.body;
	//drop the pid so the db can auto increment
	fields = Object.keys(Project.rawAttributes).slice(1);
	Project.create(project_data, {fields: fields})
	.then(results => {
		res.send(results);
	})
	.catch(error => {
		res.status(500).send(error);
	});
});

//update project
projectRouter.route('/:pid')
.put((req, res) => {
	console.log(req.body);
	Project.findByPk(req.params.pid)
	.then(project => {
		project_data = req.body;

		//update matching keys
		for (var key in project_data){
			project[key] = project_data[key];
		}
		console.log(project);
		project.save()
		.then(task =>{
			res.status(200).send(task);
		})
		.catch(task =>{
			res.status(500).send(task);
		});
	})
	.catch(error => {
		res.status(500).send(error);
	});
});

//delete project
projectRouter.route('/:pid').delete((req, res) => {
	Project.destroy({
		where: {
			pid: req.params.pid
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