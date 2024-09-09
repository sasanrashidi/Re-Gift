import React, { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';
import regiftLogo from '../IMG/REGIFT.png';

export function NavMenu({ UICartService }) {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        async function fetchCartItems() {
            const items = await UICartService.getCartItems();
            setCartItems(items);
        }
        fetchCartItems();
    }, [UICartService]);

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand>
                <div>
                    <img src={regiftLogo} alt="Regift Logo" className="img-fluid" width={150} height={50} style={{ margin: 0, padding: 0, border: 'none' }}></img>
                </div>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">


                    <NavDropdown title="Hem" id="home-nav-dropdown">
                        <LinkContainer to="/">
                            <NavDropdown.Item>Hem</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/login">
                            <NavDropdown.Item>Logga In</NavDropdown.Item>
                        </LinkContainer>
                    </NavDropdown>

                    <NavDropdown title="Marknad" id="basic-nav-dropdown">
                        <LinkContainer to="/BuyGiftCard">
                            <NavDropdown.Item>Köp</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/SellGiftCard">
                            <NavDropdown.Item>Sälj</NavDropdown.Item>
                        </LinkContainer>
                    </NavDropdown>

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
