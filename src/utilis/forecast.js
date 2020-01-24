const request = require("request")



const forecast= (latitude,longitude, callback)=>
{
    const url= 'https://api.darksky.net/forecast/3b4b53646fe75377eb4cb051e6610897/'+latitude+','+longitude+'?units=si'
    // 30.6942,76.8606?units=si'
    request({url: url, json:true},(error,response)=>
    {
        if(error)
        {
            callback('Unable to connect to weather service!',undefined)
        }
        else if(response.body.error)
        {
            callback('Unable to find location!',undefined)
        }
        else
        {
            callback(undefined, response.body.daily.data[0].summary+' It is currently '+response.body.currently.temperature+" degrees out. There is "+response.body.currently.precipProbability+"% chance of "+response.body.currently.precipType)
            /*   summary:  response.body.daily.data[0].summary,
               temperature: 'It is currently'+response.body.currently.temperature+" degrees out."
       /*       precip: if(response.body.currently.precipProbability!=0)
        {
            precip: 'There is '+response.body.currently.precipProbability+"% chance of "+response.body.currently.precipType
        } 
        */
            
        }
    })
}


module.exports = forecast