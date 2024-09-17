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
    const totalPrice = items.reduce((total, item) => total + parsePrice(item.discountedPrice), 0).toFixed(2);

    // Funktion för att flytta favoriter till varukorgen
    const moveFavoritesToCart = () => {
        const cartItemIds = new Set(cart.map(item => item.id));
        const newItemsToAdd = favorites.filter(favoriteItem => !cartItemIds.has(favoriteItem.id));
        setCart(prevCart => [...prevCart, ...newItemsToAdd]);
        setFavorites([]);
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
                                        <strong>{item.title}</strong><br />
                                        <span style={{ textDecoration: 'line-through', color: 'red' }}>{item.originalPrice} Kr</span><br />
                                        <span style={{ color: 'green' }}>{item.discountedPrice} Kr</span>
                                    </div>
                                    <div>
                                        <Button variant="danger" onClick={() => onRemove(item)}>Ta bort</Button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-3">
                            <strong>Total: {totalPrice} Kr.</strong>
                        </div>
                        {title !== 'Favoriter' && (
                            <Button
                                className="mt-3"
                                variant="primary"
                                onClick={() => {
                                    handleClose(); // Stäng modal
                                    setTimeout(() => {
                                        if (!user) {
                                            navigate('/login', { state: { from: '/checkout' } });
                                        } else {
                                            navigate('/checkout'); // Navigera till betalningssidan
                                        }
                                    }, 300);  // Fördröjning för att se till att modal stängs
                                }}
                            >
                                Till Betalning
                            </Button>
                        )}
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
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Stäng</Button>
            </Modal.Footer>
        </Modal>
    );
}
