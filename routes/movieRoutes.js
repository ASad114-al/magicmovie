
const { Router } = require('express')
const express=require('express')
const fetch = require('node-fetch');
const router=express.Router()
const movie= require('../models/Items')
const { json } = require('express');
 const movieControllers = require('../controllers/movieControllers');



router.get('/', movieControllers.movie_index )
router.get('/details/:id' ,movieControllers.movie_details )
router.get("/addfavourites/:id",movieControllers.movie_addfavourites ) 
router.get("/favourites",movieControllers.movie_favourites )
router.get('/removeFavourite/:id', movieControllers.movie_remoefavourite)   
router.get("/removefavourite/:id/delete", movieControllers.movie_removefavourite_single)






module.exports=router

