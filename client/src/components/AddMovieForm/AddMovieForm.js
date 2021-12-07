import { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import ErrorComponent from "../ErrorComponent/ErrorComponent";


const AddMovieForm = () => {
    const [isPending, setIsPending] = useState(false);
    const [err, setErr] = useState(null);
    const history = useHistory();
    const [thumbnailFile,setThumbnailFile] = useState();
    const [videoFile, setVideoFile] = useState();
    const [movieName,setMovieName] = useState('');
    const [year,setYear] = useState('');
    const [lang, setLang] = useState('English');
    const thumbChangeHandler = (e)=>{
        setThumbnailFile(e.target.files[0]);
    }
    const vidChangeHandler = (e)=>{
        setVideoFile(e.target.files[0]);
    }

    const handleSubmit = (e)=>{
        setIsPending(true);
        e.preventDefault();
        const formData = new FormData();
        formData.append("name",movieName);
        formData.append("year",year);
        formData.append("lang",lang);
        formData.append("thumbnail",thumbnailFile);
        formData.append("video",videoFile);

        fetch('/api/AddMovies',{
            method : "POST",
            body: formData
        })
         .then(resp => {
             if(resp.status<400){
                setIsPending(false);
                history.push('/');
             }
             else{
                 throw "File type was invalid.";
             }
         })
         .catch(err=>{
             console.log(err, "This is error");
             setIsPending(false);
             setErr(err.message);
            })
    }
    return(
        <div className="d-flex align-items-center justify-content-center mt-4">
            <Card>
                <Card.Header className="text-center">Add Movie</Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Movie Name</Form.Label>
                            <Form.Control name="name" type="text" placeholder="Enter Movie Name" onChange={e => setMovieName(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Year of Release</Form.Label>
                            <Form.Control name="year" type="number"  placeholder="Enter Year of Release" onChange={e=>setYear(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Language</Form.Label>
                            <Form.Select name="lang" onChange={e=>setLang(e.target.value)}>
                                <option value="English">English</option>
                                <option value="Hindi">Hindi</option>
                                <option value="Tamil">Tamil</option>
                                <option value="Kannad">Kannad</option>

                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Upload Thumbnail</Form.Label>
                            <Form.Control name="thumbnail" type="file" onChange={thumbChangeHandler}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Upload Movie Video File</Form.Label>
                            <Form.Control type="file" name="video" onChange={vidChangeHandler}/>
                        </Form.Group>
                        {!isPending && <Button variant="primary" type="submit">
                            Submit
                        </Button>}
                        { isPending && <Button variant="primary" type="submit" disabled>
                            Uploading...
                        </Button>}
                    </Form>
                    {err && <ErrorComponent err={err} />}
                </Card.Body>
            </Card>
        </div>
    );
}

export default AddMovieForm;