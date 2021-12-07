const express = require('express');
const bodyParser = require('body-parser');
const Mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/api');

const PORT = process.env.PORT || 3001;
const MONGODB_URI = "mongodb+srv://helios:Asdfghjkl_456@helios.xiyur.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

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
app.use(cors());
app.use('/uploads',express.static('uploads'));
console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV === "production"){
    app.use(express.static('client/build'));
    const path = require("path");
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
}
app.use('/api', routes);


