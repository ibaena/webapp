var mysql = require("mysql");
var Sequelize = require('sequelize');


var sequelize = new Sequelize('socialdb', 'root', '@pril2488', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

module.exports = sequelize;
