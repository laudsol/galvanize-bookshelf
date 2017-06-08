'use strict';

const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();
const humps = require('humps');
const knex = require('../knex');

const bodyParser = require('body-parser');



router.get('/books',function(req,res,next){
  knex('books')
    .select(
      'id',
      'title',
      'author',
      'genre',
      'description',
      'cover_url AS coverUrl',
      'created_at AS createdAt',
      'updated_at AS updatedAt'
    )
    .orderBy('title')
    .then(function(books){
      return res.send(books);
    });
});

router.get('/books/:id',function(req,res,next){
  knex('books')
    .select(
      'id',
      'title',
      'author',
      'genre',
      'description',
      'cover_url AS coverUrl',
      'created_at AS createdAt',
      'updated_at AS updatedAt'
    )
    .where('id',req.params.id)
    .then(function(books){
      return res.send(books[0]);
    });
});

router.post('/books', function(req,res,next){

  const body = humps.decamelizeKeys(req.body);

  knex('books')
    .insert(body)
    .returning([
      'id',
      'title',
      'author',
      'genre',
      'description',
      'cover_url AS coverUrl',
      'created_at AS createdAt',
      'updated_at AS updatedAt'
    ])
    .then(function(books){
      return res.send(books[0]);
    });
});

router.patch('/books/:id', function(req,res,next){
  const body = humps.decamelizeKeys(req.body);

  knex('books')
    .update(body)
    .where('id',req.params.id)
    .returning([
      'id',
      'title',
      'author',
      'genre',
      'description',
      'cover_url AS coverUrl',
      'created_at AS createdAt',
      'updated_at AS updatedAt'
    ])
    .then(function(books){
      return res.send(books[0]);
      });
});

router.delete('/books/:id', function(req,res,next){
  const body = humps.decamelizeKeys(req.body);

  knex('books')
    .where('id',req.params.id)
    .del()
    .returning([
      'title',
      'author',
      'genre',
      'description',
      'cover_url AS coverUrl',
      'created_at AS createdAt',
      'updated_at AS updatedAt'
    ])
    .then(function(books){
      return res.send(books[0]);
      });
});





module.exports = router;
