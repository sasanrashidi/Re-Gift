import React, { useState, useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';
import regiftLogo from '../IMG/REGIFT.png';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { ItemModal } from '../Pages/ModulComponent';
import { AppContext } from '../context/AppContext';
import '../css/Home.css';

export function NavMenu() {
    const { cart, setCart, favorites, setFavorites, user } = useContext(AppContext);
    const [showCartModal, setShowCartModal] = useState(false);
    const [showFavoritesModal, setShowFavoritesModal] = useState(false);

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

                    {user ? (
                        <span className="ml-auto">Logged in as: {user.email}</span>
                    ) : (
                        <span className="ml-auto">Not logged in</span>
                    )}

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
