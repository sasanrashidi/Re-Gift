// ModulComponent.jsx

import React, { useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export function ItemModal({ title, items, show, handleClose, onRemove }) {
    const { cart, setCart, favorites, setFavorites, user } = useContext(AppContext);
    const navigate = useNavigate();

    // Funktion för att tolka pris från sträng
    const parsePrice = (priceStr) => {
        if (typeof priceStr === 'string') {
            const parsedPrice = priceStr.replace('Kr.', '').replace(',', '.').trim();
            return parseFloat(parsedPrice) || 0;
        }
        return typeof priceStr === 'number' ? priceStr : 0;
    };

    // Totalpris för alla varor i varukorgen
    const originalTotal = items.reduce((acc, item) => acc + parsePrice(item.originalPrice), 0); // Sum of original prices
    const discountedTotal = items.reduce((acc, item) => acc + parsePrice(item.discountedPrice), 0); // Sum of discounted prices
    const savings = originalTotal - discountedTotal; // Savings calculation

    // Funktion för att flytta favoriter till varukorgen
    const moveFavoritesToCart = () => {
        const cartItemIds = new Set(cart.map(item => item.id));
        const newItemsToAdd = favorites.filter(favoriteItem => !cartItemIds.has(favoriteItem.id));
        setCart(prevCart => [...prevCart, ...newItemsToAdd]);
        setFavorites([]);
    };

    const handleDetailView = (item) => {
        // Navigate to BuyGiftCard component with state for detail view
        navigate('/BuyGiftCard', { state: { selectedGiftCard: item } });
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
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
                                                {item.originalPrice} Kr
                                            </span>
                                            <span style={{ color: 'green' }}>
                                                {item.discountedPrice} Kr
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <Button variant="danger" onClick={() => onRemove(item)}>
                                            Ta bort
                                        </Button>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-3" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <strong style={{ color: 'green' }}>Total: {discountedTotal} Kr</strong>
                            {savings > 0 && <strong>Du har sparat {savings} Kr!</strong>}
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
                            <Button variant="secondary" onClick={handleClose}>
                                Stäng
                            </Button>
                        </div>

                        {title === 'Favoriter' && (
                            <Button className="mt-3" variant="success" onClick={moveFavoritesToCart}>
                                Flytta till varukorg
                            </Button>
                        )}
                    </>
                ) : (
                    <p>Inga varor i {title}.</p>
                )}
            </Modal.Body>
        </Modal>
    );
}
