import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export function ItemModal({ title, items, show, handleClose, onRemove }) {
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
                                        <span style={{ textDecoration: 'line-through', color: 'red' }}>{item.originalPrice}</span><br />
                                        <span style={{ color: 'green' }}>{item.discountedPrice}</span>
                                    </div>
                                    <Button variant="danger" onClick={() => onRemove(item)}>Ta bort</Button>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-3">
                            <strong>Total: {items.reduce((total, item) => total + parseFloat(item.discountedPrice.replace('Kr.', '').replace(',', '.')), 0).toFixed(2)} Kr.</strong>
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
