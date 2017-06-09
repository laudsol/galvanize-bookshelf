'use strict';

const express = require('express');
const router = express.Router();
const humps = require('humps');
const knex = require('../knex');
const bodyParser = require('body-parser');
const saltRounds = 10;
const bcrypt = require('bcrypt');

router.post('/users', function(req,res,next){ //runs when a new user logs in

  const body = req.body;

  body.password = bcrypt.hashSync(body.password, saltRounds);

  knex('users')
    .returning([
      'id',
      'first_name AS firstName',
      'last_name AS lastName',
      'email'
    ])
    .insert({first_name:body.firstName,last_name:body.lastName,email:body.email, hashed_password: body.password})
    .then(function(users){
      return res.send(users[0]);
    });
});


module.exports = router;
