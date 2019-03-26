//barebones implementation of app.js

var express = require('express');
var app = express();
//TODO: port should probably be specified in a config file
var port = 1000;
//just hello world for now
app.get('/', (req, res) => res.send('Hello World!'));

//TODO: setup db (I like sequelize so far as an ORM)

//setup routing for the future
var projectRouter = require('./src/routes/project');
var userRouter = require('./src/routes/user')
app.use('/project', projectRouter);
app.use('/user', userRouter);

app.listen(port, () => console.log(`started server on port ${port}`));