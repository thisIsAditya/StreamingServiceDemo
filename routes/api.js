const express = require('express');
const router = express.Router();
const multer = require('multer');
const Movie = require('./models/movies');
const fs = require("fs");





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

//WORKING AND TESTED (ON POSTMAN) ENDPOINTS

//Add movie endpoint 
const uploadFields = [{
    name:'thumbnail',maxCount:1
},
{
    name:'video',maxCount:1
}
]
router.post('/AddMovies',upload.fields(uploadFields),(req,resp)=>{
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
router.get('/',(req,resp)=>{
Movie.find()
 .then((result)=>{
     resp.send(result);
 })
 .catch((err)=>{
     console.log(err);
 })
})

//Fetching movie by ID
router.post('/',(req,resp)=>{
console.log(req.body);
Movie.findById(req.body._id)
 .then((result)=>{
     resp.send(result);
 })
 .catch((err)=>{
     console.log(err);
 })
})

router.get('/view/:id',(req,res)=>{
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
module.exports = router;