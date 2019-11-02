let express = require('express')
let app = express()
let teams = require('./teams.json')

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

app.all('*', (request, response) => {
    response.send('404 - Not Found. Please be more specific.')
})

app.listen(1337, () => {
    console.log('Server is up and running')
})