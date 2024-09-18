import '../css/CheckoutPage.css';

import React, { useState, useContext } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export function CheckoutPage() {
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
    const [formErrors, setFormErrors] = useState({});
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const { cart, setCart, user } = useContext(AppContext);
    const navigate = useNavigate();

    const checkIfSold = async (id) => {
        try {
            const response = await fetch(`https://re-gift-aeesgygqhsbaf8eh.eastus-01.azurewebsites.net/api/GiftCard/SoldCard${id}`);
            if (!response.ok) throw new Error('Network response was not ok.');
            const isSold = await response.json();
            console.log(`Gift card ${id} sold status:`, isSold);
            return isSold;
        } catch (error) {
            console.error('Error checking sold status:', error);
            return true; // Assume sold if there's an error
        }
    };


    const parsePrice = (priceStr) => {
        if (typeof priceStr === 'string') {
            const parsedPrice = priceStr.replace('Kr.', '').replace(',', '.').trim();
            return parseFloat(parsedPrice) || 0;
        }
        return typeof priceStr === 'number' ? priceStr : 0;
    };

    const totalPrice = cart.reduce((total, item) => total + parsePrice(item.discountedPrice), 0).toFixed(2);

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

    const simulatePayment = async () => {
        setIsProcessing(true);

        // Log the cart items and their IDs
        console.log('Cart items:', cart);

        // Check if any gift card in the cart is sold
        const soldStatusChecks = await Promise.all(
            cart.map(item => {
                console.log(`Checking if gift card ${item.id} is sold`);
                return checkIfSold(item.id);
            })
        );

        console.log('Sold status checks:', soldStatusChecks);

        const hasSoldItems = soldStatusChecks.some(isSold => isSold);

        if (hasSoldItems) {
            setIsProcessing(false);
            alert('Some gift cards in your cart have already been sold.');
            return;
        }

        setTimeout(() => {
            const isValid = validateCardDetails();
            if (isValid) {
                setPaymentSuccess(true);
                setIsProcessing(false);

                const newPurchase = {
                    date: new Date().toLocaleString(),
                    items: [...cart],
                    totalPrice
                };
                setCart([]);
                localStorage.removeItem('cart');
                navigate('/receipt', { state: { purchase: newPurchase } });
            } else {
                setIsProcessing(false);
            }
        }, 2000);
    };


    const handlePayment = () => {
        if (!user) {
            navigate('/login', { state: { from: '/checkout' } });
        } else {
            const isValid = validateCardDetails();
            if (isValid) {
                simulatePayment();
            }
        }
    };

    return (
        <div className="checkout-page">
            <h2>Betalning</h2>
            {!paymentSuccess ? (
                <div>
                    <Form>
                        <Form.Group controlId="formFirstName">
                            <Form.Label>Förnamn</Form.Label>
                            <Form.Control
                                type="text"
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
                                name="zipCode"
                                value={paymentDetails.zipCode}
                                onChange={handlePaymentInputChange}
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
                                name="cardNumber"
                                value={paymentDetails.cardNumber}
                                onChange={handlePaymentInputChange}
                                isInvalid={!!formErrors.cardNumber}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formErrors.cardNumber}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formNameOnCard">
                            <Form.Label>Namn på kortet</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={paymentDetails.name}
                                onChange={handlePaymentInputChange}
                                isInvalid={!!formErrors.name}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formErrors.name}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formCVV">
                            <Form.Label>CVV</Form.Label>
                            <Form.Control
                                type="text"
                                name="cvv"
                                value={paymentDetails.cvv}
                                onChange={handlePaymentInputChange}
                                isInvalid={!!formErrors.cvv}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formErrors.cvv}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button
                            className="mt-3"
                            variant="success"
                            onClick={handlePayment}
                            disabled={isProcessing}
                        >
                            {isProcessing ? <Spinner as="span" animation="border" size="sm" /> : 'Betala'}
                        </Button>
                    </Form>
                </div>
            ) : (
                <div>
                    <h4>Betalning slutförd!</h4>
                    <p>Din betalning har genomförts framgångsrikt.</p>
                </div>
            )}
        </div>
    );
}
