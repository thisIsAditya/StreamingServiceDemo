import { Col, Container, Row } from "react-bootstrap";
import ReactPlayer from 'react-player';
import { useParams } from "react-router";
import useFetch from "../../customHooks/useFetch/useFetch";
import ErrorComponent from "../ErrorComponent/ErrorComponent";
import Loading from "../Loading/Loading";


const VideoArea = () => {
    const {id} = useParams();
    const fetch_string = `/view/${id}`
    const req = {
        method:"POST",
        body:JSON.stringify({
            _id : id
        }),
        headers: {
            "Content-type": "application/json"
        }
    }
    const {data : movies , isPending, err} = useFetch("/view/",req);
    
    return(
        <Container className=" py-4 rounded">
            {isPending && <Loading />}
            {err && <ErrorComponent err={err} />}
            {
                movies &&
                <Row className="justify-content-center">
                    <Col md={6} className="d-flex justify-content-center align-items-center border rounded border-2 mb-2 me-sm-2 border-light bg-light">
                        <ReactPlayer  style={{maxWidth:"100%"}} controls url={fetch_string}/>            
                    </Col>
                    <Col md={3} className="d-flex align-items-center p-4  border rounded border-2 mt-2 ms-sm-2 border-light bg-light">
                        <div> 
                            <h2>{movies.name}</h2>
                            <p>Year : {movies.year} | Language : {movies.lang}</p>
                        </div>
                    </Col>
                </Row>
            }
                
        </Container>
    );
}

export default VideoArea;