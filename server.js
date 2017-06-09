'use strict';

if (process.env.NODE_ENV !== 'production') { //checks for production mode. run config method on dotenv file. dotenv file makes the token not accessible to the user. Config sets up dotenv file to accept, store and use tokens
  require('dotenv').config();
}

const express = require('express');
const app = express();

app.disable('x-powered-by'); //disbales the express watermark on the page

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const morgan = require('morgan');
const jwt = require('jsonwebtoken');

switch (app.get('env')) {
  case 'development':
    app.use(morgan('dev'));
    break;

  case 'production':
    app.use(morgan('short'));
    break;

  default:
}

app.use(bodyParser.json());
app.use(cookieParser());

app.use(function (req,res,next) {
  if (req.cookies.token) { //if user comes to page without making account or logging in
    jwt.verify(req.cookies.token,process.env.JWT_SECRET, function (err,decoded) //checks cookie with the secret jwt {
      if (err) { //if err, remove the cookie
        res.clearCookie('token');
        return next(err);
      }
      req.user = decoded; // if matches, then set req.user to decoded so that it can be accessed in the server
      next();
    });
  } else {
    next(); // if no cookie then next
  }
});


const path = require('path');

app.use(express.static(path.join('public'))); // public folder holds anything that can be accessed directly by the client

// CSRF protection
app.use((req, res, next) => { //checks for json format
  if (/json/.test(req.get('Accept'))) {
    return next();
  }

  res.sendStatus(406);
});

const books = require('./routes/books');
const favorites = require('./routes/favorites');
const token = require('./routes/token');
const users = require('./routes/users');

app.use(books);
app.use(favorites);
app.use(token);
app.use(users);
// app.use('/secret', secret);

app.use((_req, res) => { // underscore is a naming convention to denote a private command
  res.sendStatus(404);
});

// eslint-disable-next-line max-params
app.use((err, _req, res, _next) => { //error handling, overides linter commands
  if (err.output && err.output.statusCode) {
    return res
      .status(err.output.statusCode)
      .set('Content-Type', 'text/plain')
      .send(err.message);
  }

  // eslint-disable-next-line no-console
  console.error(err.stack);
  res.sendStatus(500);
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  if (app.get('env') !== 'test') {
    // eslint-disable-next-line no-console
    console.log('Listening on port', port);
  }
});

module.exports = app;
