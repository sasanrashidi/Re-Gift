import React, { useState } from 'react';

export const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [success, setSuccess] = useState('');  // För att visa framgångsmeddelande
    const [error, setError] = useState('');      // För att visa felmeddelande

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
                setSuccess('Registrering lyckades!');  // Framgångsmeddelande
                setError('');  // Nollställ felmeddelande
            } else {
                const errorResult = await response.text();
                setError(errorResult);  // Visa API-felmeddelande
                setSuccess('');  // Nollställ framgångsmeddelande
            }
        } catch (err) {
            setError('Ett oväntat fel inträffade.');  // Fångar oväntade fel
            setSuccess('');  // Nollställ framgångsmeddelande
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>First Name:</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setfirstName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setlastName(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>

            {/* Visa framgångs- eller felmeddelanden */}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Register;
