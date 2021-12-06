const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    "name": {
        type:String,
        required:true
    },
    "year":{
        type:String,
        required:true
    },
    "lang":{
        type:String,
        required:true
    },
    "thumb_path":{
        type:String,
        required:true
    },
    "vid_path" :{
        type:String,
        required:true
    }
},{
    timestamps:true
});

const Movie = mongoose.model('Movie',movieSchema);
module.exports = Movie;