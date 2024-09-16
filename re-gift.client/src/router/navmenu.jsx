import React, { useState, useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import regiftLogo from '../IMG/REGIFT.png';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { ItemModal } from '../Pages/ModulComponent';
import { AppContext } from '../context/AppContext';
import '../css/Home.css';

export function NavMenu() {
    const { cart, setCart, favorites, setFavorites, user, setUser } = useContext(AppContext);
    const [showCartModal, setShowCartModal] = useState(false);
    const [showFavoritesModal, setShowFavoritesModal] = useState(false);
    const [isNavOpen, setIsNavOpen] = useState(false);
    const navigate = useNavigate();

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
        setUser(null);
        navigate("/"); // Navigate to the homepage after logout
        setIsNavOpen(false); // Close the menu after logout
    };

    const closeNavMenu = () => {
        setIsNavOpen(false); // Close the menu after selecting an item
    };

    const handleMarknadClick = () => {
        navigate('/BuyGiftCard', { state: { resetPage: true } });
        closeNavMenu();
    };

    return (
        <>
            <Navbar expand="lg" className="transparent-navbar" expanded={isNavOpen} style={{ position: 'relative' }}>
                <Navbar.Brand>
                    <div>
                        <img src={regiftLogo} alt="Regift Logo" className="img-fluid" width={150} height={50} style={{ margin: 0, padding: 0, border: 'none' }} />
                    </div>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setIsNavOpen(!isNavOpen)} />

                <div className="icons-container ml-auto d-flex align-items-center">
                    <span className="favorite-icon" onClick={handleFavoritesModalShow}>
                        <FaHeart size={24} />
                        {favorites.length > 0 && (
                            <span className="badge badge-pill badge-danger">{favorites.length}</span>
                        )}
                    </span>
                    <span className="cart-icon" onClick={handleCartModalShow}>
                        <FaShoppingCart size={24} />
                        {cart.length > 0 && (
                            <span className="badge badge-pill badge-danger">{cart.length}</span>
                        )}
                    </span>
                </div>

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <LinkContainer to="/" onClick={closeNavMenu}>
                            <Nav.Link>Hem</Nav.Link>
                        </LinkContainer>
                        <Nav.Link onClick={handleMarknadClick}>Marknad</Nav.Link>
                        <LinkContainer to="/Contact" onClick={closeNavMenu}>
                            <Nav.Link>Kontakt</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/About" onClick={closeNavMenu}>
                            <Nav.Link>Om oss</Nav.Link>
                        </LinkContainer>
                    </Nav>

                    {user ? (
                        <NavDropdown title={`Välkommen ${user.firstname}`} id="user-nav-dropdown">
                            <NavDropdown.Item onClick={logoutHandler}>
                                <span>Logga ut</span>
                            </NavDropdown.Item>

                            <NavDropdown.Item>
                            <LinkContainer to="/UserHistory">
                                <span>Köp Historik</span>
                            </LinkContainer>
                            </NavDropdown.Item>

                            <NavDropdown.Item>
                                <LinkContainer to="/SellGiftCard">
                                    <span>Sälj presentkort</span>
                                </LinkContainer>
                            </NavDropdown.Item>
                        </NavDropdown>
                    ) : (
                        <LinkContainer to="/login" onClick={closeNavMenu}>
                            <span className="ml-auto loggainKnapp">Logga in</span>
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

