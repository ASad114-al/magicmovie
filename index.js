require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())
const movieRoutes =require('./routes/movieRoutes')
app.use(express.static('public'))
app.set('view engine', 'ejs')
const { json } = require('express');

app.use(express.urlencoded({ extended: true }))
const mongoose = require('mongoose');

mongoose.connect(process.env.dburi, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        console.log('Connected to my DB')
        app.listen(process.env.PORT, () => console.log(`http://localhost:${process.env.PORT}`))
    })
    .catch(err => console.log(err))

    app.use(movieRoutes)
  
//     app.get('/', (req, res) => {  

//         fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=4f2d4313669b932746a7cbe1b3fff187')
//     .then(res => res.json())
//     .then((json)=>{
//         //  console.log(json) 
//         data=json.results
//         console.log(data);
//         res.render('index',{moviedata:data})
        
//     })
//     .catch(err => console.log(err))     
//     })


//     app.get('/details/:id' , (req, res) =>{
//     //    console.log(req.params.id);
//         fetch(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=4f2d4313669b932746a7cbe1b3fff187`)
       
//         .then(res => res.json())
//         .then(json => {
//             // console.log(json)
//             res.render("moviesdetails", { single: json })
//         })
//       .catch(err=>console.log(err))
//       })


//       app.get("/addfavourites/:id", (req, res) => {
//         fetch(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=4f2d4313669b932746a7cbe1b3fff187`)
//             .then(res => res.json())
//             .then(json => {
//                 console.log(json);
//                 const data1 = json
//                 movie.find({ id: data1.id })
//                     .then(result => {
//                         if (result.length > 0) {
//                             res.redirect("/favourites")
//                         } else {
//                             const newmovieItems = new movie({
//                                 id: data1.id,
//                                 title: data1.title,
//                                 overview: data1.overview,
//                                 genres: data1.genres,
    
//                                 poster_path: data1.poster_path,
//                                 backdrop_path: data1.backdrop_path,
    
//                                 vote_average: data1.vote_average,
//                                 popularity: data1.popularity,
//                                 original_title: data1.original_title,
//                                 release_date: data1.release_date,
//                                 status: data1.status
//                             })
//                             newmovieItems
//                                 .save()
//                                 .then(result => {
//                                     res.redirect("/favourites")
//                                 })
//                         }
//                     })
//             })
//     })    
//       app.get("/favourites", (req, res) => {
//         movie.find()
//             .then(result => {
//                 res.render('favourites', { Movies: result })
//             })
//             .catch(err => console.log(err))
//     })

// app.get('/removeFavourite/:id',(req,res)=>{
//     movie.findById(req.params.id)
//     .then(result =>{
//         res.render('removeFavourite', {removedata:result})
//     })
//     .catch(err=>console.log(err))
// })   


// app.get("/removefavourite/:id/delete", (req, res) => {
//     movie.findByIdAndDelete(req.params.id)
//         .then(result => {
//             console.log(req.params.id);
//             res.redirect('/favourites')
//         })
//         .catch(err => console.log(err))
// })