const express = require('express')

// todo: create the teams.js model
const TeamsModel = require('./models/teams')

// Creating an instance of an Express application
const app = express()

// Instead of const teams = require('./teams.json') because it will only give you results in that json file
const models = require('./models')

// Middleware that takes a string and turns it into a JS object out of that string that we can use
const bodyParser = require('body-parser')
const Op = require('sequelize').Op

app.get('/teams', (request, response) => {
    models.Teams.findAll({ include: { model: models.Teams } }).then((teams) => {
        response.send(teams)
    })
})

app.get('/teams/:filter', (request, response) => {
    const { filter } = request.params
    const match = models.Teams.findOne({
        where: { [Op.or]: [{ id: filter },
                           { abbreviation: filter },
                           { division: filter }] }
    })
    if (match) {
        response.send(match) 
    } else {
        response.status(404).send('Please provide a valid id, abbreviation or division to look up team.')
    }
})

app.post('/teams', bodyParser.json(), (request, response) => {
    const body = request.body

    if (
       !body.location || 
       !body.mascot || 
       !body.abbreviation || 
       !body.conference || 
       !body.division
    ) {
      response.status(400).send('The following attributes are required: location, mascot, abbreviation, conference and division.')
    }

    const newTeam = models.Teams.create({ location,
                                          mascot,
                                          abbreviation,
                                          conference,
                                          division })

    response.status(201).send(newTeam);
})

app.listen(1337, () => {
    console.log('Server is up and running.')
})