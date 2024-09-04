import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { LinkContainer } from 'react-router-bootstrap';
import regiftLogo from '../IMG/REGIFT.png';


export function NavMenu() {
    return (

        <Navbar bg="light" expand="lg">
            <Navbar.Brand>
                <div>
                    <img src={regiftLogo} alt="Regift Logo" className="img-fluid" width={250} height={100} style={{ margin: 0, padding: 0, border: 'none' }}></img>
                </div>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <LinkContainer to="/">
                        <Nav.Link>Hem</Nav.Link>
                    </LinkContainer>

                    <LinkContainer to="/BuyGiftCard">
                        <Nav.Link>Köpa presentkort</Nav.Link>
                    </LinkContainer>

                    <LinkContainer to="/SellGiftCard">
                        <Nav.Link>Sälja presentkort</Nav.Link>
                    </LinkContainer>

                    <LinkContainer to="/Contact">
                        <Nav.Link>Kontakt</Nav.Link>
                    </LinkContainer>

                    <LinkContainer to="/About">
                        <Nav.Link>Om oss</Nav.Link>
                    </LinkContainer>

                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}



                      

