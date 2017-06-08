'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/superhero1'
  },

  production: {
    client: 'pg',
    connection: 'process.env.DATABASE_URL'
  }
};
