const express = require('express')

// Instead of const teams = require('./teams.json') because it will only give you results in that json file
const models = require('./models')

// Middleware that takes a string and turns it into a JS object out of that string that we can use
const bodyParser = require('body-parser')

// Operator that can be used to make more complex comparisons
const Op = require('sequelize').Op

// Creating an instance of an Express application
const app = express()

// this is required to tell express where static content can be delivered from
// such as css and js for the client
app.use('/client', express.static('client'))

// used for sendFile
app.use(express.static('client'))

// To extract the form data, we use the express.urlencoded() middleware
app.use(express.urlencoded())

app.get('/', (request, response) => {
    // this sendFile function works when we have used the static configuration first
    response.sendFile('./client/index.html')
})

app.get('/api/teams', async (request, response) => {
    const teams = await models.Teams.findAll()
    response.send(teams)
})

app.get('/api/teams/:filter', async (request, response) => {
    // Short-hand for const filter = request.params.filter
    const { filter } = request.params
    const match = await models.Teams.findOne({
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

app.post('/basic-info', (request, response) => {
    console.log(request.body)
    response.send(`Got it! Thank you, ${request.body.username}`)
})

app.post('/api/teams', bodyParser.json(), async (request, response) => {
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

    const newTeam = await models.Teams.create({ location,
                                                mascot,
                                                abbreviation,
                                                conference,
                                                division })

    response.status(201).send(newTeam);
})

app.listen(1337, () => {
    console.log('Server is up and running.')
})