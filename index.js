require('dotenv').config()
const fetch = require('node-fetch');
const express = require('express')
const app = express()
app.use(express.json())
const movie= require('./models/Items')
app.use(express.static('public'))
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }))
const mongoose = require('mongoose');
const { json } = require('express');

mongoose.connect(process.env.dburi, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        console.log('Connected to my DB')
        app.listen(process.env.PORT, () => console.log(`http://localhost:${process.env.PORT}`))
    })
    .catch(err => console.log(err))
  
    app.get('/', (req, res) => {  

        fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=4f2d4313669b932746a7cbe1b3fff187')
    .then(res => res.json())
    .then((json)=>{
        //  console.log(json) 
        data=json.results
        console.log(data);
        res.render('index',{allmoviedata:data})
        
    })
    .catch(err => console.log(err))     
    })


    app.get('/details/:id' , (req, res) =>{
    //    console.log(req.params.id);
        fetch(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=4f2d4313669b932746a7cbe1b3fff187`)
       
        .then(res => res.json())
        .then(json => {
            // console.log(json)
            res.render("moviesdetails", { single: json })
        })
      .catch(err=>console.log(err))
      })


      app.get('/addfavourites/:id' , (req, res) =>{
    
        fetch(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=4f2d4313669b932746a7cbe1b3fff187`)
        
        .then(res => res.json())
        .then(json => {
          const newFavItem = new movie({
            id: json.id,
            title: json.title,
            overview: json.overview,
            genres: json.genres,

            poster_path: json.poster_path,
            backdrop_path: json.backdrop_path,

            vote_average: json.vote_average,
            popularity: json.popularity,
            original_title: json.original_title,
            release_date: json.release_date,
            status: json.status
          });
          newFavItem.save()
            
            .then((result) => {
              console.log("new Fav saved");
              res.redirect("/favourites");
            })
      .catch(err=>console.log(err))
      })
      });    
      app.get("/favourites", (req, res) => {
        movie.find()
            .then(result => {
                res.render('favourites', { myMovies: result })
            })
            .catch(err => console.log(err))
    })