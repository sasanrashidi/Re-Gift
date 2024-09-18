import React, { useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export function ItemModal({ title, items, show, handleClose, onRemove }) {
    const { cart, setCart, favorites, setFavorites, user } = useContext(AppContext);
    const navigate = useNavigate();

    // Function to parse price from a string
    const parsePrice = (priceStr) => {
        if (typeof priceStr === 'string') {
            const parsedPrice = priceStr.replace('Kr.', '').replace(',', '.').trim();
            return parseFloat(parsedPrice) || 0;
        }
        return typeof priceStr === 'number' ? priceStr : 0;
    };

    // Total prices for all items in the modal
    const originalTotal = items.reduce((acc, item) => acc + parsePrice(item.originalPrice), 0);
    const discountedTotal = items.reduce((acc, item) => acc + parsePrice(item.discountedPrice), 0);
    const savings = originalTotal - discountedTotal;

    // Move a specific favorite item to cart
    const moveFavoriteToCart = (item) => {
        const isItemInCart = cart.some(cartItem => cartItem.id === item.id);
        if (!isItemInCart) {
            setCart([...cart, item]);
            setFavorites(favorites.filter(favItem => favItem.id !== item.id)); // Remove from favorites after moving
        }
    };

    // Move all favorites to the cart (existing functionality)
    const moveFavoritesToCart = () => {
        const cartItemIds = new Set(cart.map(item => item.id));
        const newItemsToAdd = favorites.filter(favoriteItem => !cartItemIds.has(favoriteItem.id));
        setCart(prevCart => [...prevCart, ...newItemsToAdd]);
        setFavorites([]);
    };

    const handleDetailView = (item) => {
        navigate('/BuyGiftCard', { state: { selectedGiftCard: item } });
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {items.length > 0 ? (
                    <>
                        <ul className="list-group">
                            {items.map(item => (
                                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <div>
                                        <strong>
                                            <a
                                                href="#"
                                                style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}
                                                onClick={(e) => {
                                                    e.preventDefault(); // Prevent default link behavior
                                                    handleDetailView(item); // Open the detailed view
                                                }}
                                            >
                                                <img
                                                    src={item.imgSrc}
                                                    alt={item.title}
                                                    style={{ width: '50px', height: '50px', marginRight: '10px', objectFit: 'cover' }}
                                                />
                                                {item.title}
                                            </a>
                                        </strong>
                                        <div>
                                            <span style={{ textDecoration: 'line-through', color: 'red', marginRight: '10px' }}>
                                                {math.floor(item.originalPrice} Kr
                                            </span>
                                            <span style={{ color: 'green' }}>
                                                {math.floor(item.discountedPrice)} Kr
                                            </span>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-column">
                                        {title === 'Favoriter' && (
                                            <Button
                                                variant="success"
                                                onClick={() => moveFavoriteToCart(item)}
                                                style={{ marginBottom: '10px' }} // Add margin to place it above "Ta bort"
                                            >
                                                Flytta till korg
                                            </Button>
                                        )}
                                        <Button variant="danger" onClick={() => onRemove(item)}>
                                            Ta bort
                                        </Button>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        {/* Total price and savings */}
                        <div className="mt-3" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <strong style={{ color: 'green', fontSize: '17px' }}>Total: {Math.floor(discountedTotal)} Kr</strong>
                          {savings > 0 && <strong style={{ fontSize: '17px' }}>Du har sparat {Math.floor(savings)} Kr!</strong>}
                        </div>

                        {/* Flexbox container for buttons */}
                        <div className="mt-3" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            {title !== 'Favoriter' && (
                                <Button
                                    variant="primary"
                                    onClick={() => {
                                        handleClose(); // Close modal
                                        setTimeout(() => {
                                            if (!user) {
                                                navigate('/login', { state: { from: '/checkout' } });
                                            } else {
                                                navigate('/checkout'); // Navigate to checkout page
                                            }
                                        }, 300); // Adjust delay if needed
                                    }}
                                >
                                    Till Betalning
                                </Button>
                            )}
                            {title === 'Favoriter' && (
                                <Button variant="success" onClick={moveFavoritesToCart}>
                                    Flytta alla till korg
                                </Button>
                            )}
                            <Button variant="secondary" onClick={handleClose}>
                                Stäng
                            </Button>
                        </div>
                    </>
                ) : (
                    <p>Inga varor i {title}.</p>
                )}
            </Modal.Body>
        </Modal>
    );
}
