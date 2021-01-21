const { Router } = require('express')
const express=require('express')
const fetch = require('node-fetch');
const router=express.Router()
// const movieControllers =require('../controllers/movieControllers')
const movie= require('../models/Items')
const { json } = require('express');




router.get('/',  (req, res) => {  
    fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=4f2d4313669b932746a7cbe1b3fff187')
.then(res => res.json())
.then((json)=>{
    //  console.log(json) 
    data=json.results
    console.log(data);
    res.render('index',{moviedata:data})

})
.catch(err => console.log(err))   
}  )


router.get('/details/:id' , (req, res) =>{
//    console.log(req.params.id);
    fetch(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=4f2d4313669b932746a7cbe1b3fff187`)
   
    .then(res => res.json())
    .then(json => {
        // console.log(json)
        res.render("moviesdetails", { single: json })
    })
  .catch(err=>console.log(err))
  })


  router.get("/addfavourites/:id", (req, res) => {
    fetch(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=4f2d4313669b932746a7cbe1b3fff187`)
        .then(res => res.json())
        .then(json => {
            console.log(json);
            const data1 = json
            movie.find({ id: data1.id })
                .then(result => {
                    if (result.length > 0) {
                        res.redirect("/favourites")
                    } else {
                        const newmovieItems = new movie({
                            id: data1.id,
                            title: data1.title,
                            overview: data1.overview,
                            genres: data1.genres,

                            poster_path: data1.poster_path,
                            backdrop_path: data1.backdrop_path,

                            vote_average: data1.vote_average,
                            popularity: data1.popularity,
                            original_title: data1.original_title,
                            release_date: data1.release_date,
                            status: data1.status
                        })
                        newmovieItems
                            .save()
                            .then(result => {
                                res.redirect("/favourites")
                            })
                    }
                })
        })
})    
  router.get("/favourites", (req, res) => {
    movie.find()
        .then(result => {
            res.render('favourites', { Movies: result })
        })
        .catch(err => console.log(err))
})

router.get('/removeFavourite/:id',(req,res)=>{
movie.findById(req.params.id)
.then(result =>{
    res.render('removeFavourite', {removedata:result})
})
.catch(err=>console.log(err))
})   


router.get("/removefavourite/:id/delete", (req, res) => {
movie.findByIdAndDelete(req.params.id)
    .then(result => {
        console.log(req.params.id);
        res.redirect('/favourites')
    })
    .catch(err => console.log(err))
})






module.exports=router

