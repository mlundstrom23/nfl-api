const express = require('express')

// Instead of const teams = require('./teams.json') because it will only give you results in that json file
const models = require('./models')

// Middleware that takes a string and turns it into a JS object out of that string that we can use
const bodyParser = require('body-parser')

// Operator that can be used to make more complex comparisons
const Op = require('sequelize').Op

// Creating an instance of an Express application
const app = express()


app.get('/teams', async (request, response) => {
    // Teams is from module.exports = { Teams, } in ./models/index.js 
    const teams = await models.Teams.findAll()
    response.send(teams)
})

app.get('/teams/:filter', async (request, response) => {
    // Short-hand for const filter = request.params.filter
    const { filter } = request.params
    const match = await models.Teams.findAll({
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

app.post('/teams', bodyParser.json(), async (request, response) => {
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

    const newTeam = await models.Teams.create( body )

    response.status(201).send(newTeam);
})

app.listen(1337, () => {
    console.log('Server is up and running.')
})