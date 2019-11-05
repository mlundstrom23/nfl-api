const express = require('express')
const app = express()
const teams = require('./teams.json')
const bodyParser = require('body-parser')

app.get('/teams', (request, response) => {
    response.send(teams)
})

app.get('/teams/:filter', (request, response) => {
    let team = teams.filter((team) => {
        let filter = request.params.filter
        return String(team.id) === filter || team.abbreviation === filter
    })
    response.send(team)
})

app.post('/teams', bodyParser.json(), (request, response) => {
    const { id, location, mascot, abbreviation, conference, division } = request.body

    if (!location || !mascot || !abbreviation || !conference || !division) {
        response.send('The following attributes are required: location, mascot, abbreviation, conference and division.')
    }

    const newTeam = { id, location, mascot, abbreviation, conference, division }

    if (!id) {
        newTeam.id = teams.length + 1;
    }

    teams.push(newTeam)
    console.log({newTeam})
    response.send(newTeam)
})

app.delete('/teams/:id', (request, response) => {
    // Look up the team
    // If it doesn't exist, return 404
    const team = teams.find(t => t.id === parseInt(request.params.id));
    if (!team) response.status(404).send('The team with the given ID does not exist.')

    // Otherwise, delete it
    const index = teams.indexOf(team);
    teams.splice(index, 1);

    // Return the same team
    response.send('Successfully deleted the team with ID: ' + team.id)
})

app.all('*', (request, response) => {
    response.send('404 - Not Found. Please be more specific.')
})

app.listen(5500, () => {
    console.log('Server is up and running.')
})