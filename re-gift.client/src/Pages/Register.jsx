import React, { useState } from 'react';
import '../css/LoggaIn.css'; // Ensure the CSS is linked correctly

export const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [success, setSuccess] = useState('');  // For success messages
    const [error, setError] = useState('');      // For error messages

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://localhost:7049/api/User', {
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

    return (
        <div className="register-page">
            <div className="register-content">
                <div className="register-form">
                    <form onSubmit={handleRegister}>
                        <h2>Register</h2>
                        <div className="form-group">
                            <label>First Name:</label>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Last Name:</label>
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
                            <label>Password:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit">Register</button>

                        {success && <p className="success-message">{success}</p>}
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
