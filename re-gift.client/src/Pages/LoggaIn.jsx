import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import '../css/LoggaIn.css';

function LoggaIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = (event) => {
        event.preventDefault();

        // kontrollera att både e-post och lösenord är ifyllda
        if (!email || !password) {
            setErrorMessage('Vänligen fyll i både e-post och lösenord');
        } else {
            // vi skickar inloggningsuppgifter till API 
            console.log("E-post:", email);
            console.log("Lösenord:", password);

            // Återställer felmeddelande om allt går bra
            setErrorMessage('');
        }
    };

    return (
        <Container className="login-container">
            <Row className="justify-content-md-center login-row">
                <Col xs={12} md={6} className="login-col">
                    <h2 className="login-header">Logga In</h2>

                    {/* felmeddelande om inmatningsfel finns */}
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
                </Col>
            </Row>
        </Container>
    );
}

export default LoggaIn;
