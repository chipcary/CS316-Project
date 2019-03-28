//barebones implementation of app.js

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//setup routing for the future
var projectRouter = require('./src/routes/project');
var userRouter = require('./src/routes/user');

app.use('/api/projects', projectRouter);
app.use('/api/users', userRouter);

module.exports = app;