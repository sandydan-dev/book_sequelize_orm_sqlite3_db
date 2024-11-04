const { DataTypes, sequelize } = require("../lib/index");

// create book model

const book = sequelize.define("book", {
  name: DataTypes.TEXT,
  author: DataTypes.TEXT,
  title: DataTypes.TEXT,
  content: DataTypes.TEXT,
});

module.exports = book;
