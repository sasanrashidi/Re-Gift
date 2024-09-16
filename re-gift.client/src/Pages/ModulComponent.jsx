import React, { useState, useContext } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import { AppContext } from '../context/AppContext';
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
    const { cart, setCart, favorites, setFavorites, user } = useContext(AppContext);
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
        if (!user) {
            // Stäng popup-fönstret först och vänta tills det har stängts
            handleClose();

            // Fördröjning för att säkerställa att modalen stängs innan omdirigering
            setTimeout(() => {
                navigate('/login', { state: { from: '/BuyGiftCard' } });
            }, 300);  // Anpassa fördröjningen om det behövs
        } else {
            const isValid = validateCardDetails();
            if (isValid) {
                simulatePayment();
            }
        }
    };

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
        setTimeout(() => {
            handleClose();
        }, 200);  // Liten fördröjning för att se till att återställningen körs först
    };

    const moveFavoritesToCart = () => {
        // Get the IDs of items already in the cart
        const cartItemIds = new Set(cart.map(item => item.id));

        // Filter favorites to include only those not in the cart
        const newItemsToAdd = favorites.filter(favoriteItem => !cartItemIds.has(favoriteItem.id));

        // Add only new items to the cart
        setCart(prevCart => [...prevCart, ...newItemsToAdd]);

        // Clear the favorites list after moving items
        setFavorites([]);
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
                                {title === 'Favoriter' && (
                                    <Button className="mt-3" variant="success" onClick={moveFavoritesToCart}>
                                        Flytta till varukorg
                                    </Button>
                                )}
                               

                                {/* Modifierad knapp som kontrollerar om användaren är inloggad */}
                                <Button
                                    className="mt-3"
                                    variant="primary"
                                    onClick={() => {
                                        if (!user) {
                                            // Om användaren inte är inloggad, omdirigera till inloggningssidan
                                            navigate('/login', { state: { from: '/BuyGiftCard' } });
                                        } else {
                                            // Om användaren är inloggad, sätt isPaying till true
                                            setIsPaying(true);
                                        }
                                    }}
                                >
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
                            <Form.Group controlId="formName">
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
                            <Form.Group controlId="formCvv">
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
                            <Button variant="secondary" onClick={handleCloseWithReset}>
                                Avbryt
                            </Button>
                            <Button className="ms-2" variant="primary" onClick={handlePayment} disabled={isProcessing}>
                                {isProcessing ? <Spinner animation="border" size="sm" /> : 'Betala'}
                            </Button>
                        </Form>
                    </div>
                )}

                {paymentSuccess && (
                    <div>
                        <h4>Betalning lyckades!</h4>
                        <p>Du kommer nu att skickas till kvittosidan.</p>
                        <Button variant="secondary" onClick={handleCloseWithReset}>
                            Stäng
                        </Button>
                    </div>
                )}
            </Modal.Body>
        </Modal>
    );
}
