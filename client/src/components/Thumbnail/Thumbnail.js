import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Thumbnail = ({id, name, lang, year, thumb_path}) => {
    const thumbnailSrc = `http://localhost:3001/${thumb_path}`;
    return(
        <Link to={`/view/${id}`}>
            <Card className="bg-dark text-white m-2" style={{width:"18rem"}} >
                <Card.Img src={thumbnailSrc} alt="Card image" style={{opacity:0.4,maxHeight:"9rem", objectFit:"cover"}} />
                <Card.ImgOverlay className="center">
                    <Card.Title className="display-7"><b>{name}</b></Card.Title>
                    <Card.Text>
                        Year : {year} | Language : {lang}
                    </Card.Text>
                </Card.ImgOverlay>
            </Card>
        </Link>
    );
}

export default Thumbnail;