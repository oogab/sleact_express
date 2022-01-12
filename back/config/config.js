require('dotenv').config();

module.exports = {
  "development": {
    "username": "admin",
    "password": process.env.MYSQL_PASSWORD,
    "database": "sleact_development",
    "host": process.env.MYSQL_ADDRESS,
    "dialect": "mysql"
  },
  "test": {
    "username": "admin",
    "password": process.env.MYSQL_PASSWORD,
    "database": "sleact",
    "host": process.env.MYSQL_ADDRESS,
    "dialect": "mysql"
  },
  "production": {
    "username": "admin",
    "password": process.env.MYSQL_PASSWORD,
    "database": "sleact",
    "host": process.env.MYSQL_ADDRESS,
    "dialect": "mysql"
  }
}
