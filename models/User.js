const { DataTypes } = require('sequelize')
const db = require('../db/connection')

const User = db.define('User', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    require: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true
  },
})

module.exports = User
