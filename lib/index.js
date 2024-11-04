// require sequelize , database , and creating instance of sequelize
const sq = require("sequelize");

// initialize sequelize instance with database

const sequelize = new sq.Sequelize({
  dialect: "sqlite",
  storage: "./db/database.sqlite",
});

module.exports = { DataTypes: sq.DataTypes, sequelize };
