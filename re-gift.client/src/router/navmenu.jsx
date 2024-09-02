import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { LinkContainer } from 'react-router-bootstrap';

export function NavMenu() {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand>Re-GiftCard</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <LinkContainer to="/">
                        <Nav.Link>Home</Nav.Link>
                    </LinkContainer>

                    <LinkContainer to="/BuyGiftCard">
                        <Nav.Link>BuyGiftCard</Nav.Link>
                    </LinkContainer>

                    <LinkContainer to="/SellGiftCard">
                        <Nav.Link>SellGiftCard</Nav.Link>
                    </LinkContainer>

                    <LinkContainer to="/Contact">
                        <Nav.Link>Contact</Nav.Link>
                    </LinkContainer>

                    <LinkContainer to="/Sidebar">
                        <Nav.Link>Sidebar</Nav.Link>
                    </LinkContainer>

                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}


                      

