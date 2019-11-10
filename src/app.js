const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'eliecer'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'help',
        name: 'Eliecer Arteaga'
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'ELiecer'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if(error) return res.send({error})        
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) return res.send({error})

            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })

            console.log(location)
            console.log(forecastData)
       })
    })
    

    
})

app.get('/products', (req, res) => {
    console.log(req.query.search)
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found',
        title: 'Error',
        name: 'Eliecer'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'My 404 page',
        title: 'Error',
        name: 'Eliecer'
    })
})

//start server
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})