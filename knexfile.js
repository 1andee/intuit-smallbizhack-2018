if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  };
  
  module.exports = {
  
    development: {
      client: 'postgresql',
      connection: {
        host     : process.env.DB_HOST,
        user     : process.env.DB_USER,
        password : process.env.DB_PASS,
        database : process.env.DB_NAME,
        port     : process.env.DB_PORT
      },
      migrations: {
        directory: './db/migrations',
        tableName: 'migrations'
      },
      seeds: {
        directory: './db/seeds'
      }
    },
  
    test: {
      client: 'postgresql',
      connection: {
        host     : process.env.TEST_DB_HOST,
        user     : process.env.TEST_DB_USER,
        password : process.env.TEST_DB_PASS,
        database : process.env.TEST_DB_NAME,
        port     : process.env.TEST_DB_PORT
      },
      migrations: {
        directory: './db/migrations',
        tableName: 'migrations'
      },
      seeds: {
        directory: './db/seeds'
      }
    },
    
    production: {
      client: 'postgresql',
      connection: process.env.DATABASE_URL,
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        directory: './db/migrations',
        tableName: 'migrations'
      },
      seeds: {
        directory: './db/seeds'
      }
    }
  
  };