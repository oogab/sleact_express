require('dotenv').config();

module.exports = {
  "development": {
    "username": "admin",
    "password": process.env.MARIA_PASSWORD,
    "database": "sleact_development",
    "host": process.env.MARIA_ADDRESS,
    "dialect": "mariadb",
    "dialectOptions": {connectTimeout: 1000}
  },
  "test": {
    "username": "admin",
    "password": process.env.MARIA_PASSWORD,
    "database": "sleact",
    "host": process.env.MARIA_ADDRESS,
    "dialect": "mariadb",
    "dialectOptions": {connectTimeout: 1000}
  },
  "production": {
    "username": "admin",
    "password": process.env.MARIA_PASSWORD,
    "database": "sleact",
    "host": process.env.MARIA_ADDRESS,
    "dialect": "mariadb",
    "dialectOptions": {connectTimeout: 1000}
  }
}