import React, { useState, useContext } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Importera useNavigate
import '../css/LoggaIn.css';
import { AppContext } from '../context/AppContext';
import Register from '../Pages/Register';

function LoggaIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { setUser } = useContext(AppContext);
    const navigate = useNavigate(); // Använd useNavigate för omdirigering

    const handleLogin = async (event) => {
        event.preventDefault();

        // Kontrollera att både e-post och lösenord är ifyllda
        if (!email || !password) {
            setErrorMessage('Vänligen fyll i både e-post och lösenord');
        } else {
            try {
                // Skicka inloggningsuppgifter till API
                const response = await fetch('https://re-gift-aeesgygqhsbaf8eh.eastus-01.azurewebsites.net/api/User/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        password,
                        firstName: "dummyFirstName",
                        lastName: "dummyLastName"
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('Inloggning lyckades!', data);

                    // Uppdatera user i context
                    setUser({
                        email: data.user.email,
                        id: data.user.id, 
                        firstname: data.user.firstName
                    });
                    setErrorMessage(''); // Återställer felmeddelande

                    // Omdirigera till hemsidan efter inloggning
                    navigate('/');  // Omdirigera till startsidan
                } else {
                    setErrorMessage('Inloggning misslyckades. Kontrollera dina uppgifter.');
                }
            } catch (error) {
                setErrorMessage('Ett fel uppstod vid inloggningen. Försök igen senare.');
            }
        }
    };

    return (
        <Container className="login-container">
            <Row className="justify-content-md-center login-row">
                <Col xs={12} md={6} className="login-col">
                    <h2 className="login-header">Logga In</h2>

                    {/* Felmeddelande om inmatningsfel finns */}
                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                    <Form onSubmit={handleLogin} className="login-form">
                        {/* Fält för e-postadress */}
                        <Form.Group controlId="formBasicEmail" className="form-group">
                            <Form.Label className="form-label">E-postadress</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Ange din e-postadress"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                isInvalid={!!errorMessage && !email}
                                className="form-control"
                            />
                            <Form.Control.Feedback type="invalid" className="feedback">
                                Vänligen fyll i en giltig e-postadress.
                            </Form.Control.Feedback>
                        </Form.Group>

                        {/* Fält för lösenord */}
                        <Form.Group controlId="formBasicPassword" className="form-group">
                            <Form.Label className="form-label">Lösenord</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Ange ditt lösenord"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                isInvalid={!!errorMessage && !password}
                                className="form-control"
                            />
                            <Form.Control.Feedback type="invalid" className="feedback">
                                Vänligen fyll i ditt lösenord.
                            </Form.Control.Feedback>
                        </Form.Group>

                        {/* Logga In-knapp */}
                        <Button variant="primary" type="submit" className="login-button">
                            Logga In
                        </Button>
                    </Form>
                    {/* Länk för att skapa ett nytt konto */}
                    <div className="signup-prompt">
                        <p>Har du inget konto?&nbsp;
                            <span
                                className="signup-link"
                                onClick={() => navigate('/Register')} // Direkt navigering till registreringssidan
                                style={{ cursor: 'pointer', color: 'blue' }}>
                                Skapa ett här!
                            </span>
                        </p>
                    </div>

                </Col>
            </Row>
        </Container>
    );
}

export default LoggaIn;
