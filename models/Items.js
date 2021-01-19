const mongoose =require('mongoose');
const Schema = mongoose.Schema
const movieSchema= new Schema({
    id:{
        type: Number,
        required: true
    },
    poster_path:{
        type:String,
        required:true
    },
    backdrop_path:{
        type:String,
        required:true

    },
    genres:{
        type:Array,
        required:true
    },
    homepage:{
        type:String,
        required:true
    },
    overview:{
        type:String,
        required:true
    },
    spoken_languages:{
        type:Array,
        required:true
    },
    production_companies:{
        type:Array,
        required:true
    },
    original_title: {
        type:Array,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    popularity: {
        type: Number,
        required: true
    },
    


},{timestamps:true})

const movie= mongoose.model('movieMagic',movieSchema);
module.exports=movie;