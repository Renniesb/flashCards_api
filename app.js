var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const { NODE_ENV } = require('./config');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');

var app = express();

app.use(logger((NODE_ENV === 'production') ? 'tiny' : 'common'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/users', usersRouter);

module.exports = app;

app.listen(5000);