const path= require('path')
const express = require('express')
const hbs=require('hbs')
const geocode=require('./utilis/geocode')
const forecast=require('./utilis/forecast')

const app=express()

//Define paths for express config
const publicDirectoryPath= path.join(__dirname,'../public')
const viewsPath= path.join(__dirname,"../templates/views")
const partialsPath=path.join(__dirname,"../templates/partials")

//Setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup Static directory
app.use(express.static(publicDirectoryPath))

app.get('', (req,res)=>
{
    res.render('index',{
        title: 'Weather App',
        name1: 'Bharat',
        name2: 'Bhuvan'
    })
})

app.get('/about',(req,res)=>
{
    res.render('about',{
        title: 'ABOUT US',
        name1: 'Bharat',
        name2: 'Bhuvan'
    })
})

app.get('/help',(req,res)=>
{
    res.render('help',{
        
        helpText: 'This is some helpful information',
        title: 'Help',
        name1: 'Bharat',
        name2: 'Bhuvan'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
           // error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, fdata) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: fdata,
                location,
                address: req.query.address
            })
        })
    })
})

    
  





app.get('*',(req,res)=>
{
     res.render('404',{
         title: '404',
         name1: 'Bharat',
         name2: 'Bhuvan',
         errorMessage: 'Page Not Found'
     })
})


app.listen(3000,()=>
{
    console.log('Server is running')
})