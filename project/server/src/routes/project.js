var express = require('express');
var app = express();
var projectRouter = express.Router();
const Project = require('../models').Project;
const User = require('../models').User;
const UserJoinsProject = require('../models').UserJoinsProject;
var Sequelize = require('sequelize');
const Op = Sequelize.Op

const LIMIT = 100;

/*
all projects
query params: 
page - specifies the page of results to return

results:
count - the number of rows in projects
rows
pages - the number of pages
*/
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

/*
search all project_names for a substring
query params: 
page - specifies the page of results to return

results:
count - the number of rows in projects
rows - the matching tuples
pages - the number of pages
*/
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

/*
search all project tags for a substring
query params: 
page - specifies the page of results to return

results:
count - the number of rows in projects
rows - the matching tuples
pages - the number of pages
*/
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

/*
get recommended projects for a user
matches city, state
only returns projects that happen in the future
only return projects with remaining capacity
sort by weighting matching tags

query params:
substr - filter project name by substr
*/
projectRouter.route('/:email/best').get((req, res) => {
	var substr = req.query.substr;
	if(substr){
		User.getRecProjectsForSubstring(req.params.email, '%' + substr + '%', res);
	}
	else{
		User.getRecProjects(req.params.email, res);
	}
});


//get all users that are part of the project
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

/*
create project
request data format
Note: only description can be omitted
	{
        "project_name":"test_project",
        "tag" : "b",
        "start_date": "2019-10-10",
        "end_date": "2019-10-11",
        "curr_capacity": "0",
        "goal_capacity": "10",
        "city": "Durham",
        "state": "NC",
        "description": "example desc"
    }
*/
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

/*
update project
request data format
Note: any field can be omitted
	{
        "project_name":"test_project",
        "tag" : "b",
        "start_date": "2019-10-10",
        "end_date": "2019-10-11",
        "curr_capacity": "0",
        "goal_capacity": "10",
        "city": "Durham",
        "state": "NC",
        "description": "example desc"
    }
*/
projectRouter.route('/:pid')
.put((req, res) => {
	Project.findByPk(req.params.pid)
	.then(project => {
		project_data = req.body;

		//update matching keys
		for (var key in project_data){
			project[key] = project_data[key];
		}
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