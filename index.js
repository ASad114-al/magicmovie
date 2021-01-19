require('dotenv').config()
const fetch = require('node-fetch');
const express = require('express')
const app = express()
const movie= require('./models/Items')
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const mongoose = require('mongoose');

mongoose.connect(process.env.dburi, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        console.log('Connected to my DB')
        app.listen(process.env.PORT, () => console.log(`http://localhost:${process.env.PORT}`))
    })
    .catch(err => console.log(err))

    app.get('/', (req, res) => {
        fetch('https://api.themoviedb.org/3/trending/movie/550?api_key=4f2d4313669b932746a7cbe1b3fff187')
    .then(res => res.json())
    .then((json)=>{
        //  console.log(json) 
        data=json.results
        res.render('index',{moviedata:data})
        
    })
    .catch(err => console.log(err))     
    })