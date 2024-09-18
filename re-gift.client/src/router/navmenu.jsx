
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

    // Här är funktionen för att hantera betalningen
    const handleCheckout = () => {
        if (!user) {
            setShowCartModal(false);  // Stäng modalen
            navigate('/login', { state: { from: '/' } });  // Omdirigera direkt
        } else {
            navigate('/');
        }
    };

    return (
        <>
            <Navbar expand="lg" className="transparent-navbar" expanded={isNavOpen} style={{ position: 'relative' }}>
                <Navbar.Brand onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                    <div style={{ display: 'inline-block' }}>
                        <img src={regiftLogo} alt="Regift Logo" className="img-fluid" width={150} height={50} style={{ margin: 0, padding: 0, border: 'none' }} />
                        <style>
                            {`
                .navbar-brand:hover {
                    cursor: pointer;
                }
                `}
                        </style>
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


                    {/* Flyttad inloggningsikon hit för att fixa position */}
                    <NavDropdown
                        title={
                            <i
                                className="bi bi-person-circle"
                                style={{
                                    fontSize: '24px',
                                    cursor: 'pointer',
                                    color: user ? 'limegreen' : 'black'  // Grön om inloggad, svart om utloggad
                                }}
                            ></i>
                        }
                        id="user-nav-dropdown"
                        className="user-dropdown"
                        align="end"
                    >
                        {user ? (
                            <>
                                <NavDropdown.Item as="div">
                                    <LinkContainer to="/SellGiftCard">
                                        <Nav.Link onClick={closeNavMenu}>Sälj presentkort</Nav.Link>
                                    </LinkContainer>
                                </NavDropdown.Item>
                                <NavDropdown.Item as="div">
                                    <LinkContainer to="/UserHistory">
                                        <Nav.Link onClick={closeNavMenu}>Köp Historik</Nav.Link>
                                    </LinkContainer>
                                </NavDropdown.Item>
                                <NavDropdown.Item as="div" onClick={logoutHandler}>
                                    <Nav.Link>Logga ut</Nav.Link>
                                </NavDropdown.Item>
                            </>
                        ) : (
                            <NavDropdown.Item as="div">
                                <LinkContainer to="/login">
                                    <Nav.Link onClick={closeNavMenu}>Logga in</Nav.Link>
                                </LinkContainer>
                            </NavDropdown.Item>
                        )}
                    </NavDropdown>
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
                onCheckout={handleCheckout}
            />
        </>
    );
}

