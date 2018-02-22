'use strict';

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const httpStatus = require('http-status');

const AppError = require('./helpers/app-error');

// var index = require('./routes/index');
// var users = require('./routes/users');

const app = express();


app.disable('x-powered-by');

app.use(morgan('dev', {
  skip: (req, res) => res.statusCode < 400, stream: process.stderr
}));

app.use(morgan('dev', {
  skip: (req, res) => res.statusCode >= 400, stream: process.stdout
}));

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', index);
// app.use('/users', users);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new AppError(
    {
      name: 'RouterError',
      httpCode: httpStatus.NOT_FOUND
    },
    httpStatus[404]
  );
  next(err);
});

// error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.error(err); // eslint-disable-line no-console
  res.status(err.httpCode || httpStatus.INTERNAL_SERVER_ERROR);
  res.send(res.locals.message);
});

module.exports = app;
