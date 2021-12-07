const express = require('express');
const bodyParser = require('body-parser');
const Mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const fs = require("fs");

const PORT = process.env.PORT || 3001;
const MONGODB_URI = "mongodb+srv://helios:Asdfghjkl_456@helios.xiyur.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

//IMPORTING DB Models
const Movie = require('./models/movies');

const app = express();
// "mongodb://localhost:27017/streamingservice"
//MONGODB Connect URI
const dbURI = process.env.MONGODB_URI || MONGODB_URI;

//Connection Syntax
Mongoose.connect(dbURI,{useNewUrlParser:true, useUnifiedTopology:true})
 .then((result)=>{app.listen(PORT); console.log(`Running on port ${PORT}`)})
 .catch((err)=>console.log(err))


//Multer DiskStorage
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null,"./uploads");
    },
    filename:(req,file,cb)=>{
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({storage: fileStorageEngine});

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


//WORKING AND TESTED (ON POSTMAN) ENDPOINTS

//Add movie endpoint 
const uploadFields = [{
        name:'thumbnail',maxCount:1
    },
    {
        name:'video',maxCount:1
    }
]
app.post('/AddMovies',upload.fields(uploadFields),(req,resp)=>{
    const data = req.body;
    const movie = new Movie({
        name : data.name,
        year : data.year,
        lang : data.lang,
        thumb_path : req.files.thumbnail[0].path,
        vid_path : req.files.video[0].path
    });

    movie.save()
     .then((result)=>{
         resp.send("Success");
     })
     .catch((err)=>{
         resp.send(err);
     })
});

//Fetch all movies
app.get('/',(req,resp)=>{
    Movie.find()
     .then((result)=>{
         resp.send(result);
     })
     .catch((err)=>{
         console.log(err);
     })
})

//Fetching movie by ID
app.post('/',(req,resp)=>{
    console.log(req.body);
    Movie.findById(req.body._id)
     .then((result)=>{
         resp.send(result);
     })
     .catch((err)=>{
         console.log(err);
     })
})

app.get('/view/:id',(req,res)=>{
    // Ensure there is a range given for the video
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Requires Range header");
  }

  // get video stats
    Movie.findById(req.params.id)
    .then((result)=>{
        const videoPath = result.vid_path;
        const videoSize = fs.statSync(videoPath).size;
        // Parse Range
        const CHUNK_SIZE = 10 ** 6; // 1MB
        const start = Number(range.replace(/\D/g, ""));
        const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
        
        // Create headers
        const contentLength = end - start + 1;
        const headers = {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/mp4",
        };
        
        // HTTP Status 206 for Partial Content
        res.writeHead(206, headers);
        
        // create video read stream for this particular chunk
        const videoStream = fs.createReadStream(videoPath, { start, end });
        
        // Stream the video chunk to the client
        videoStream.pipe(res);
    })
    .catch((err)=>console.log(err))

})