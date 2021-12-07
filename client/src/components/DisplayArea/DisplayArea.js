import useFetch from "../../customHooks/useFetch/useFetch";
import { Container } from "react-bootstrap";
import { ThumnailGrid } from "../ThumbnailGrid/ThumnailGrid";
import Loading from "../Loading/Loading";
import ErrorComponent from "../ErrorComponent/ErrorComponent";
import Scroll from "../Scroll/Scroll";
const DisplayArea = () => {
    const {data : movies, isPending, err}= useFetch("/api/")
    return(
        <Container className="p-4">
            {isPending && <Loading />}
            {movies &&
            <Scroll>
                <ThumnailGrid movies={movies}/>
            </Scroll> 
            }
            {err && <ErrorComponent err={err} />}
        </Container>
    );
}

export default DisplayArea;