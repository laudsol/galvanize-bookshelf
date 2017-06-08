'use strict';

const environment = process.env.NODE_ENV || 'development';
const knexConfig = require('./knexfile')[environment];
const knex = require('knex')(knexConfig);

// knex('books').then(function(result){
//   console.log(result);
//   knex.destroy();
// })
//   .catch(function(err){
//     console.error(err);
//     knex.destroy();
//     process.exit(1);
// });

module.exports = knex;
