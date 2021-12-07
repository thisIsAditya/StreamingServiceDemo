const express = require('express');
const bodyParser = require('body-parser');
const Mongoose = require('mongoose');
const routes = require('./routes/api');

const PORT = process.env.PORT || 3001;
const dbName = "myFirstDatabase";
const clusterName = "helios";

const MONGODB_URI = `mongodb+srv://${clusterName}:${process.env.DB_PASS}@helios.xiyur.mongodb.net/${dbName}?retryWrites=true&w=majority`;

//IMPORTING DB Models

const app = express();
// "mongodb://localhost:27017/streamingservice"
//MONGODB Connect URI
const dbURI = process.env.MONGODB_URI || MONGODB_URI;

//Connection Syntax
Mongoose.connect(dbURI,{useNewUrlParser:true, useUnifiedTopology:true})
 .then((result)=>{app.listen(PORT); console.log(`Running on port ${PORT}`)})
 .catch((err)=>console.log(err))

//Middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/uploads',express.static('uploads'));
console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV === "production"){
    app.use(express.static('client/build'));
}
app.use('/api', routes);


