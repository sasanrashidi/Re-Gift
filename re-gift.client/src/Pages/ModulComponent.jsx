import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export function ItemModal({ title, items, show, handleClose, onRemove }) {
    // Helper function to parse the discounted price safely, handling edge cases.
    const parsePrice = (priceStr) => {
        if (typeof priceStr === 'string') {
            const parsedPrice = priceStr
                .replace('Kr.', '') 
                .replace(',', '.')  
                .trim();
            return parseFloat(parsedPrice) || 0; 
        }
        // If priceStr is not a string, assume it's already a valid number or 0
        return typeof priceStr === 'number' ? priceStr : 0;
    };

    // Calculate the total discounted price of all items
    const totalPrice = items.reduce((total, item) => total + parsePrice(item.discountedPrice), 0).toFixed(2);

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {items.length > 0 ? (
                    <div>
                        <ul className="list-group">
                            {items.map(item => (
                                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <div>
                                        <strong>{item.title}</strong><br />
                                        <span style={{ textDecoration: 'line-through', color: 'red' }}>{item.originalPrice} Kr</span><br />
                                        <span style={{ color: 'green' }}>{item.discountedPrice} Kr</span>
                                    </div>
                                    <Button variant="danger" onClick={() => onRemove(item)}>
                                        Ta bort
                                    </Button>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-3">
                            <strong>Total: {totalPrice} Kr.</strong>
                        </div>
                    </div>
                ) : (
                    <p>Inga varor i {title}.</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Stäng
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
