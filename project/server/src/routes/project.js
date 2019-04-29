var express = require('express');
var app = express();
var projectRouter = express.Router();
const Project = require('../models').Project;
const User = require('../models').User;
const UserJoinsProject = require('../models').UserJoinsProject;
var Sequelize = require('sequelize');
const Op = Sequelize.Op

const LIMIT = 100;
//all projects
projectRouter.route('/').get((req, res) => {
	var page = req.query.page;
	var options = {limit: LIMIT};
	if(page){
		options["offset"] = (page-1)*LIMIT;
	}
	Project.findAndCountAll(options)
	.then(results => {
		var pages = Math.ceil(results.count/LIMIT);
		results["pages"] = pages;
		res.send(results);
	})
	.catch(error => {
		res.send(error);
	});
});

projectRouter.route('/search-substr/:sub').get((req, res) => {
	var page = req.query.page;
	var options = {
		where:{
			project_name: {
				[Op.iLike]: '%' + req.params.sub + '%'
			}
		},
		limit: LIMIT
	};
	if(page){
		options["offset"] = (page-1)*LIMIT;
	}
	Project.findAndCountAll(options)
	.then(results => {
		var pages = Math.ceil(results.count/LIMIT);
		results["pages"] = pages;
		res.send(results);
	})
	.catch(error => {
		res.send(error);
	});
});
projectRouter.route('/search-tag/:tag').get((req, res) => {
	var page = req.query.page;
	var options = {
		where:{
			tag: {
				[Op.iLike]: '%' + req.params.tag + '%'
			}
		},
		limit: LIMIT
	};
	if(page){
		options["offset"] = (page-1)*LIMIT;
	}
	Project.findAndCountAll(options)
	.then(results => {
		var pages = Math.ceil(results.count/LIMIT);
		results["pages"] = pages;
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

//get all users that belong to a certain project
projectRouter.route('/:pid/members').get((req, res) =>{
	UserJoinsProject.findAll({
		where: {
			pid: req.params.pid
		},
		include: [User]
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

projectRouter.route('/:pid/users/').get((req, res) => {
	UserJoinsProject.findAll({
		where: {
			pid: req.params.pid
		},
		include: [User],
		attributes: ['User.email']
	})
	.then(results => {
		res.send(results);
	})
	.catch(error => {
		res.send(error);
	});
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