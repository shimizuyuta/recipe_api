
require('dotenv').config();

module.exports = {
  'development': {
    'username': process.env.DB_USERNAME,
    'password': process.env.DB_PASS,
    'database': process.env.DB_DATABASE,
    'hostname': process.env.DB_HOST,
    // 'port': '3306',
    'dialect': 'mysql',
  },
};
