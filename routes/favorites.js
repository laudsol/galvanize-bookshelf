'use strict';

const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const humps = require('humps');

//verify at top of page



  router.get('/favorites', (req, res, next) => {
    var token = req.cookies.token;
    if (!req.user) {
      res.set('Content-Type','text/plain')
      res.status(401).send('Unauthorized');
    } else {
      knex('favorites')
      .innerJoin('books','books.id','favorites.book_id')
      .then(function(result){
        return res.send(humps.camelizeKeys(result));
      });
    }

  });

  router.get('/favorites/check', (req, res, next) => {
    var token = req.cookies.token;
    if (!req.user) {
      res.set('Content-Type','text/plain')
      res.status(401).send('Unauthorized');
    } else {
        let someId = req.query.bookId

        knex('favorites')
        .where('book_id','=',someId)
        .then(function(result){
          if(result.length>0) {
            return res.send(true);
          } else {
            return res.send(false);
          }
        });
    }
  });

  router.post('/favorites',(req, res, next) => {
    var token = req.cookies.token;
    if (!req.user) {
      res.set('Content-Type','text/plain')
      res.status(401).send('Unauthorized');
    } else {
      knex('favorites')
        .insert({book_id:req.body.bookId,user_id:1},'*')
        .then(function(result){
          return res.status(200).send(humps.camelizeKeys(result[0]))
        });
    };
  });


  router.delete('/favorites',(req, res, next) => {
    var token = req.cookies.token;
    if (!req.user) {
      res.set('Content-Type','text/plain')
      res.status(401).send('Unauthorized');
    } else {
        knex('favorites')
          .where('book_id',req.body.bookId)
          .returning(['user_id','book_id'])
          .del()
          .then(function(result){
            return res.status(200).send(humps.camelizeKeys(result[0]))
          });
    };
  });

module.exports = router;
