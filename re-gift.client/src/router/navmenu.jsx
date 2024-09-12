import React, { useState, useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';  // För att navigera programmatisk
import regiftLogo from '../IMG/REGIFT.png';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { ItemModal } from '../Pages/ModulComponent';
import { AppContext } from '../context/AppContext';
import '../css/Home.css';

export function NavMenu() {
    const { cart, setCart, favorites, setFavorites, user, setUser } = useContext(AppContext);
    const [showCartModal, setShowCartModal] = useState(false);
    const [showFavoritesModal, setShowFavoritesModal] = useState(false);
    const navigate = useNavigate();  // Används för att navigera efter inloggning/utloggning

    const handleCartModalShow = () => setShowCartModal(true);
    const handleCartModalClose = () => setShowCartModal(false);

    const handleFavoritesModalShow = () => setShowFavoritesModal(true);
    const handleFavoritesModalClose = () => setShowFavoritesModal(false);

    const removeFromCart = (item) => {
        setCart(cart.filter(cartItem => cartItem.id !== item.id));
    };

    const removeFromFavorites = (item) => {
        setFavorites(favorites.filter(favoriteItem => favoriteItem.id !== item.id));
    };

    const logoutHandler = () => {
        // Logga ut användaren
        setUser(null);
        navigate("/");  // Navigera till startsidan efter utloggning
    };

    return (
        <>
            <Navbar expand="lg" className="transparent-navbar" style={{ position: 'relative' }}>
                <Navbar.Brand>
                    <div>
                        <img src={regiftLogo} alt="Regift Logo" className="img-fluid" width={150} height={50} style={{ margin: 0, padding: 0, border: 'none' }} />
                    </div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">

                        <LinkContainer to="/">
                            <Nav.Link>Hem</Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/BuyGiftCard">
                            <Nav.Link>Marknad</Nav.Link>
                        </LinkContainer>


                        <LinkContainer to="/Contact">
                            <Nav.Link>Kontakt</Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/About">
                            <Nav.Link>Om oss</Nav.Link>
                        </LinkContainer>
                    </Nav>

                    {/* Icons Container */}
                    <div className="icons-container ml-auto d-flex align-items-center">
                        <span
                            className="favorite-icon"
                            onClick={handleFavoritesModalShow}
                        >
                            <FaHeart size={24} />
                            {favorites.length > 0 && (
                                <span className="badge badge-pill badge-danger">
                                    {favorites.length}
                                </span>
                            )}
                        </span>
                        <span
                            className="cart-icon"
                            onClick={handleCartModalShow}
                        >
                            <FaShoppingCart size={24} />
                            {cart.length > 0 && (
                                <span className="badge badge-pill badge-danger">
                                    {cart.length}
                                </span>
                            )}
                        </span>
                    </div>

                    {user ? (
                        <NavDropdown title={user.email} id="user-nav-dropdown">
                            <NavDropdown.Item onClick={logoutHandler}>
                                <span>Logga ut</span>
                            </NavDropdown.Item>
                        </NavDropdown>
                    ) : (
                        <LinkContainer to="/login">
                            <span className="ml-auto">Logga in</span>
                        </LinkContainer>
                    )}

                </Navbar.Collapse>
            </Navbar>

            {/* Modals */}
            <ItemModal
                title="Favoriter"
                items={favorites}
                show={showFavoritesModal}
                handleClose={handleFavoritesModalClose}
                onRemove={removeFromFavorites}
            />
            <ItemModal
                title="Varukorg"
                items={cart}
                show={showCartModal}
                handleClose={handleCartModalClose}
                onRemove={removeFromCart}
            />
        </>
    );
}
