import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export function PurchaseHistory() {
    const { user } = useContext(AppContext);
    const [purchaseHistory, setPurchaseHistory] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            // Fetch the purchase history for the user
            fetch(`https://re-gift-aeesgygqhsbaf8eh.eastus-01.azurewebsites.net/${user.id}`)
                .then(response => response.json())
                .then(data => {
                    setPurchaseHistory(data);
                    console.log('Fetched purchase history:', data); 
                })
                .catch(error => console.error('Error fetching purchase history:', error));
        }
    }, [user]);

    if (!user) {
        return <p>Ingen köphistorik tillgänglig.</p>;
    }

    return (
        <div className="receipt-container">
            <p className="thank-you-message">Din köphistorik</p>
            <div className="receipt-content">
                <h1>Historik</h1>
                {purchaseHistory.length === 0 ? (
                    <p>Ingen köphistorik tillgänglig.</p>
                ) : (
                    <ul className="receipt-list">
                        {purchaseHistory.map((item, index) => (
                            <li key={index} className="list-group-item">
                                <div className="list-group-item d-flex justify-content-between align-items-center">
                                    <div>
                                        <strong>{item.company}</strong><br />
                                        <span style={{ textDecoration: 'line-through', color: 'red' }}>{item.balance} Kr</span><br />
                                        <span style={{ color: 'green' }}>{item.discountedBalance} Kr</span><br />
                                        <strong>Utgångsdatum:</strong> {new Date(item.expireDate).toLocaleDateString()}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
                <button className="home-button" onClick={() => navigate('/')}>Gå hem</button>
            </div>
        </div>
    );
}


