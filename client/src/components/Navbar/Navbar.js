import { Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
const NavbarComponent = () => {
    return(
        <Navbar variant="dark" bg="dark">
            <Container>
                <Navbar.Brand href="/">Streaming Service</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    <Link to="/" style={{textDecoration:"none",padding:"8px"}}>Home</Link>
                    <Link to="/AddMovie" style={{textDecoration:"none",padding:"8px"}}>Add a Movie</Link>
                </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarComponent;