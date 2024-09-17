import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/LoggaIn.css'; // Ensure the CSS is linked correctly

export const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [success, setSuccess] = useState('');  // For success messages
    const [error, setError] = useState('');      // For error messages
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://re-gift-aeesgygqhsbaf8eh.eastus-01.azurewebsites.net/api/User', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, firstName, lastName }),
            });

            if (response.ok) {
                const result = await response.json();
                setSuccess('Registrering lyckades!');  // Success message
                setError('');  // Clear error message
                resetForm();  // Reset the form

                // Navigate to login after 2 seconds
                setTimeout(() => {
                    navigate('/login');
                }, 2500);
            } else {
                const errorResult = await response.text();
                setError(errorResult);  // Show API error message
                setSuccess('');  // Clear success message
            }
        } catch (err) {
            setError('Ett oväntat fel inträffade.');  // Handle unexpected errors
            setSuccess('');  // Clear success message
        }
    };


    const resetForm = () => {
        setEmail('');
        setPassword('');
        setFirstName('');
        setLastName('');
    };

    return (
        <div className="register-page">
            <div className="register-content">
                <div className="register-form">
                    <form onSubmit={handleRegister}>
                        {/* Show "Registrering lyckades!" instead of "Register" when registration is successful */}
                        <h2>{success ? success : 'Registrera'}</h2>

                        {!success && ( // Only show the form if registration hasn't succeeded
                            <>
                                <div className="form-group">
                                    <label>Förnamn:</label>
                                    <input
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Efternamn:</label>
                                    <input
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Lösenord:</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <button type="submit">Skapa användare</button>
                            </>
                        )}

                        {error && <p className="error-message">{error}</p>}
                    </form>
                </div>
                <div className="intro-container">
                    <p className="intro-text">
                        Här kan du enkelt registrera dig som säljare och börja sälja dina oanvända eller
                        <br />
                        delvis använda presentkort till köpare som letar efter bra erbjudanden.
                    </p>
                </div>
            </div>
        </div>
    );

};

export default Register;
