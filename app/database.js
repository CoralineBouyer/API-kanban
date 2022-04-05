require('dotenv').config();
const { Sequelize } = require('sequelize');

// const client = new Sequelize('postgres://okanban:okanban@localhost:5432/okanban');

const client = new Sequelize(process.env.PG_URL, {
  // on précise au client Sequelize qu'on a des nom de champs avec des underscores
  // define: {
  //     updatedAt: 'updated_at',
  //     createdAt: 'created_at'
  // }
});


module.exports = client;