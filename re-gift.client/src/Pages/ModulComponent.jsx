﻿import React, { useState, useContext } from 'react';
import { Modal, Button, Form, Spinner, Alert } from 'react-bootstrap';
import { AppContext } from '../context/AppContext'; 
import { ReceiptPage } from './Receipt';
import { useNavigate } from 'react-router-dom';

export function ItemModal({ title, items, show, handleClose, onRemove }) {
    const [isPaying, setIsPaying] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        zipCode: '',
        name: '',
        cvv: ''
    });
    const [isProcessing, setIsProcessing] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const { setCart } = useContext(AppContext);
    const [purchase, setPurchase] = useState(null);
    const navigate = useNavigate();


    const parsePrice = (priceStr) => {
        if (typeof priceStr === 'string') {
            const parsedPrice = priceStr
                .replace('Kr.', '')
                .replace(',', '.')
                .trim();
            return parseFloat(parsedPrice) || 0;
        }
        return typeof priceStr === 'number' ? priceStr : 0;
    };

    const totalPrice = items.reduce((total, item) => total + parsePrice(item.discountedPrice), 0).toFixed(2);

    const handlePaymentInputChange = (e) => {
        const { name, value } = e.target;
        setPaymentDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const validateCardDetails = () => {
        const errors = {};
        const { cardNumber, firstName, lastName, address, city, zipCode, name, cvv } = paymentDetails;

        if (!cardNumber || cardNumber.length !== 16 || !/^\d+$/.test(cardNumber)) {
            errors.cardNumber = 'Kortnumret måste vara exakt 16 siffror.';
        }

        if (!firstName || firstName.length < 2) {
            errors.firstName = 'Förnamn är obligatoriskt och måste vara minst 2 tecken.';
        }

        if (!lastName || lastName.length < 2) {
            errors.lastName = 'Efternamn är obligatoriskt och måste vara minst 2 tecken.';
        }

        if (!address || address.length < 5) {
            errors.address = 'Adress är obligatoriskt och måste vara minst 5 tecken.';
        }

        if (!city || city.length < 2) {
            errors.city = 'Stad är obligatoriskt och måste vara minst 2 tecken.';
        }

        if (!zipCode || zipCode.length !== 5 || !/^\d+$/.test(zipCode)) {
            errors.zipCode = 'Postnummer måste vara exakt 5 siffror.';
        }

        if (!name || name.length < 2) {
            errors.name = 'Namn på kortet är obligatoriskt och måste vara minst 2 tecken.';
        }

        if (!cvv || cvv.length !== 3 || !/^\d+$/.test(cvv)) {
            errors.cvv = 'CVV måste vara exakt 3 siffror.';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const simulatePayment = () => {
        setIsProcessing(true);

        setTimeout(() => {
            const isValid = validateCardDetails();
            if (isValid) {
                setPaymentSuccess(true);
                setIsProcessing(false);

                // Simulerar att köpet är säkert och sparas
                const newPurchase = {
                    date: new Date().toLocaleString(),
                    items: [...items],
                    totalPrice
                };
                console.log(newPurchase);
                setPurchase(newPurchase);
                setCart([]); // Tömmer kundvagnen
                localStorage.removeItem('cart'); // Rensar localStorage
                navigate('/receipt', { state: { purchase: newPurchase } });

            } else {
                setIsProcessing(false);
            }
        }, 2000);
    };

    const handlePayment = () => {
        const isValid = validateCardDetails();
        if (isValid) {
            simulatePayment();
        }
    };

    // Återställ tillståndet när modal stängs
    const resetStateAfterPayment = () => {
        setIsPaying(false);
        setPaymentSuccess(false);
        setPaymentDetails({
            cardNumber: '',
            firstName: '',
            lastName: '',
            address: '',
            city: '',
            zipCode: '',
            name: '',
            cvv: ''
        });
        setFormErrors({});
    };

    const handleCloseWithReset = () => {
        resetStateAfterPayment();
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleCloseWithReset} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {!isPaying && !paymentSuccess && (
                    <div>
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
                                            <Button variant="danger" onClick={() => onRemove(item)}>
                                                Ta bort
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-3">
                                    <strong>Total: {totalPrice} Kr.</strong>
                                </div>
                                <Button className="mt-3" variant="primary" onClick={() => setIsPaying(true)}>
                                    Till Betalning
                                </Button>
                            </>
                        ) : (
                            <p>Inga varor i {title}.</p>
                        )}
                    </div>
                )}

                {isPaying && !paymentSuccess && (
                    <div>
                        <h4>Betalningsuppgifter <span role="img" aria-label="lock">🔒</span></h4>
                        <p className="text-muted">Dina betalningsuppgifter är säkra och krypterade.</p>
                        <Form>
                            <Form.Group controlId="formFirstName">
                                <Form.Label>Förnamn</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ange förnamn"
                                    name="firstName"
                                    value={paymentDetails.firstName}
                                    onChange={handlePaymentInputChange}
                                    isInvalid={!!formErrors.firstName}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formErrors.firstName}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formLastName">
                                <Form.Label>Efternamn</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ange efternamn"
                                    name="lastName"
                                    value={paymentDetails.lastName}
                                    onChange={handlePaymentInputChange}
                                    isInvalid={!!formErrors.lastName}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formErrors.lastName}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formAddress">
                                <Form.Label>Adress</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ange adress"
                                    name="address"
                                    value={paymentDetails.address}
                                    onChange={handlePaymentInputChange}
                                    isInvalid={!!formErrors.address}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formErrors.address}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formCity">
                                <Form.Label>Stad</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ange stad"
                                    name="city"
                                    value={paymentDetails.city}
                                    onChange={handlePaymentInputChange}
                                    isInvalid={!!formErrors.city}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formErrors.city}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formZipCode">
                                <Form.Label>Postnummer</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ange postnummer"
                                    name="zipCode"
                                    value={paymentDetails.zipCode}
                                    onChange={handlePaymentInputChange}
                                    maxLength="5"
                                    isInvalid={!!formErrors.zipCode}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formErrors.zipCode}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formCardNumber">
                                <Form.Label>Kortnummer</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ange kortnummer"
                                    name="cardNumber"
                                    value={paymentDetails.cardNumber}
                                    onChange={handlePaymentInputChange}
                                    maxLength="16"
                                    isInvalid={!!formErrors.cardNumber}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formErrors.cardNumber}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formName">
                                <Form.Label>Namn på kortet</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ange namn"
                                    name="name"
                                    value={paymentDetails.name}
                                    onChange={handlePaymentInputChange}
                                    isInvalid={!!formErrors.name}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formErrors.name}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formCvv">
                                <Form.Label>CVV</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ange CVV"
                                    name="cvv"
                                    value={paymentDetails.cvv}
                                    onChange={handlePaymentInputChange}
                                    maxLength="3"
                                    isInvalid={!!formErrors.cvv}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formErrors.cvv}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Button className="mt-3" variant="success" onClick={handlePayment} disabled={isProcessing}>
                                {isProcessing ? <Spinner animation="border" size="sm" /> : 'Bekräfta Betalning'}
                            </Button>

                            {Object.keys(formErrors).length > 0 && (
                                <Alert variant="danger" className="mt-3">
                                    Kontrollera dina uppgifter noggrant innan du går vidare.
                                </Alert>
                            )}
                        </Form>
                    </div>
                )}

                {paymentSuccess && (
                    <div>
                        <h4>Tack för ditt köp!</h4>
                        <p>Din betalning har genomförts framgångsrikt.</p>
                        
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseWithReset}>
                    Stäng
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
