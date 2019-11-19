// Require node module called Sequelize
const Sequelize = require('sequelize')

// need to create this:
const allConfigs = require('../config/sequelize')
const TeamsModel = require('./teams')

const config = allConfigs['development']

// create a connection
const connection = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
})

//connection.authenticate()

const Teams = TeamsModel(connection, Sequelize)

// export an instance of the team model
module.exports = {
    Teams,
}