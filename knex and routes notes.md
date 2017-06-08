**Express Setup**

-  create server.js file

- npm init -y //to default settings

- echo node_modules >> .gitignore

- git init

- npm install express —save

- set up server:

- ```
  const express = require('express');
  const app = express();
  const port = process.env.PORT || 3000;

  app.get('/',function(req,res,next){
    res.send('hello world');
  });

  app.listen(3000, function(){
    console.log("listening on port",port);
  });
  ```

- test by going to localhost:3000/



**Knex and Postgres**

-  npm install knex pg —save

- knex init //will create knexfile.js

- edit file:

  ```
  'use strict';

  module.exports = {
    development: {
      client: 'pg',
      connection: 'postgres://localhost/superhero_db'
    },

    production: {
      client: 'pg',
      connection: 'process.env.DATABASE_URL'
    }
  };
  ```

- create knex.js file

- ```
  var env = process.env.NODE_ENV || 'development';
  var config = require('./knexfile.js')[env];
  var knex = require('knex')(config);

  module.exports = knex;
  ```

- go back to server.js and add to top

- ```
  const knex = require('./knex.js'); //can be checked by adding log(knex)
  ```



**Migration**

- create database : createdb database_name

- create migration file:  knex migrate:make table_name

  ```
  exports.up = function(knex, Promise) {
    return knex.schema.createTable('hero',function(table){
      table.increments('id');
      table.string('name');
      table.string('power');
    });
  };

  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('hero');
  };
  ```


**Seed**

- ​
- ​





