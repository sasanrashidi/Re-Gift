import React, { useState, useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';
import regiftLogo from '../IMG/REGIFT.png';
import { FaHeart, FaShoppingCart } from 'react-icons/fa'; // Importing icons from react-icons
import { ItemModal } from '../Pages/ModulComponent'; // Adjust path according to your file structure
import { AppContext } from '../context/AppContext'; // Adjust path according to your file structure

export function NavMenu() {
    const { cart, setCart, favorites, setFavorites } = useContext(AppContext);

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
            <Navbar bg="light" expand="lg" style={{ position: 'relative' }}>
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

                    {/* Right-side icons for Favorites and Cart */}
                    <Nav
                        className="ml-auto d-flex align-items-center"
                        style={{
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            marginLeft: 'auto',
                        }}
                    >
                        <Nav.Link
                            onClick={handleFavoritesModalShow}
                            style={{
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                margin: '0 10px',
                            }}
                        >
                            <FaHeart size={24} />
                            {favorites.length > 0 && (
                                <span
                                    className="badge badge-pill badge-danger"
                                    style={{
                                        position: 'absolute',
                                        top: '-5px',
                                        right: '-10px',
                                        backgroundColor: '#dc3545',
                                        color: 'white',
                                        padding: '2px 6px',
                                        borderRadius: '50%',
                                        fontSize: '12px',
                                    }}
                                >
                                    {favorites.length}
                                </span>
                            )}
                        </Nav.Link>
                        <Nav.Link
                            onClick={handleCartModalShow}
                            style={{
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                margin: '0 10px',
                            }}
                        >
                            <FaShoppingCart size={24} />
                            {cart.length > 0 && (
                                <span
                                    className="badge badge-pill badge-danger"
                                    style={{
                                        position: 'absolute',
                                        top: '-5px',
                                        right: '-10px',
                                        backgroundColor: '#dc3545',
                                        color: 'white',
                                        padding: '2px 6px',
                                        borderRadius: '50%',
                                        fontSize: '12px',
                                    }}
                                >
                                    {cart.length}
                                </span>
                            )}
                        </Nav.Link>
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
            />
        </>
    );
}
