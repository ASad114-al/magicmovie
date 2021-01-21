require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())
const movieRoutes =require('./routes/movieRoutes')
app.use(express.static('public'))
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }))
const mongoose = require('mongoose');

mongoose.connect(process.env.dburi, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        console.log('Connected to my DB')
        app.listen(process.env.PORT, () => console.log(`http://localhost:${process.env.PORT}`))
    })
    .catch(err => console.log(err))

    app.use(movieRoutes)
  