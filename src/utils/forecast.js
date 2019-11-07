const request = require('request')


const forecast = (latitude,longitude, callback) => {
    const url = "https://api.darksky.net/forecast/2e9cd3d5445006424e93296f08e72dd5/"+ encodeURIComponent(latitude)+ ","+encodeURIComponent(longitude)+"?lang=es"
    //console.log(url)

    request({ url, json: true}, (error, { body }) => {
        
        if(error) {
            callback('Unable to connect to weather service', undefined)
        } else if(body.error){
            callback('Unable to find location', undefined)
        }else {
            const temperature = body.currently.temperature
            const precip = body.currently.precipProbability      
            const data = `${body.daily.data[0].summary} It is currently ${temperature} degrees out. There is a ${precip}% chance of rain`
            callback(undefined, data)
            
        }
    })
}

module.exports = forecast