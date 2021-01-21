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

    //   app.get('/addfavourites/:id' , (req, res) =>{
    //     //    console.log(req.params.id);
    //         fetch(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=4f2d4313669b932746a7cbe1b3fff187`)
           
    //         .then(res => res.json())
    //         .then(json => {
    //             // console.log(json)
    //             res.render("moviesdetails", { single: json })
    //         })
    //       .catch(err=>console.log(err))
    //       })

        //   favourites
    app.get('/addfavourites/:id',(req,res)=>{
        fetch(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=4f2d4313669b932746a7cbe1b3fff187&language=en-US`)
       
        .then(res=> res.json())
        .then(json=>{
            // console.log(json);
            favouritesData=json
            console.log(favouritesData);
            movie.find({id:favouritesData.id})
            .then(result=>{
                if(result.length > 0){
                    res.redirect('/favourites')
                }else{
                    const NewmovieItems= new movie({
                        id: favouritesData.id,
                        title: favouritesData.title,
                        overview: favouritesData.overview,
                        genres: favouritesData.genres,
                        poster_path: favouritesData.poster_path,
                        backdrop_path: favouritesData.backdrop_path,
                        vote_average: favouritesData.vote_average,
                        popularity: favouritesData.popularity,
                        original_title: favouritesData.original_title,
                        release_date: favouritesData.release_date,
                        status: favouritesData.status
                    })
                    NewmovieItems.save()
                    .then(result=>{
                        res.redirect('/favourites')
                    })
                }
            })

        })
    })
    

app.get('favourites',(res,req)=>{
    movie.find()
    .then(result => {
        res.render('favourites', { myMovies: result })
    })
    console.log( myMovies)
    .catch(err => console.log(err))


})