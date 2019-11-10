const express = require('express')

// Creating an instance of an Express application
const app = express()
const teams = require('./teams.json')

// Middleware that takes a string and turns it into a JS object out of that string that we can use
const bodyParser = require('body-parser')

app.get('/teams', (request, response) => {
    response.send(teams)
})

app.get('/teams/:filter', (request, response) => {
    let filter = request.params.filter
    let result = teams.filter((team) => {
        
        // Or else String(team.id) === filter
        return team.id == filter || 
               team.abbreviation === filter ||
               team.division === filter                  
    })

    // Just sends back locations when inputting any of the fields above
    /*let locations = result.map((team) => {
        return team.location
    })*/
    response.send(result) // response.send(locations) to just send back location and uncomment lines 25-27
    console.log(filter)
})

app.post('/teams', bodyParser.json(), (request, response) => {
    const body = request.body

    if (!body.id) {
        body.id = teams.length + 1
    }

    if (
       !body.location || 
       !body.mascot || 
       !body.abbreviation || 
       !body.conference || 
       !body.division
    ) {
      response.status(400).send('The following attributes are required: location, mascot, abbreviation, conference and division.')
    }

    const newTeam = teams.concat(body)

    console.log({body})
    response.send(newTeam)
})

app.delete('/teams/:id', (request, response) => {
    // Look up the team
    // If it doesn't exist, return 404
    const team = teams.find(t => t.id === parseInt(request.params.id));

    if (!team) {
        response.status(404).send('The team with the given ID does not exist.')

    } else {
    // Otherwise, delete it
        const index = teams.indexOf(team);
        teams.splice(index, 1);
    }

    // Return successful delete attempt message
    response.send('Successfully deleted the team with ID: ' + team.id)
})

app.all('*', (request, response) => {
    response.send('404 - Not Found. Please be more specific.')
})

app.listen(1337, () => {
    console.log('Server is up and running.')
})