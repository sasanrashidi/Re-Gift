import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export function ReceiptPage() {
    const location = useLocation();
    const { purchase } = location.state || {};
    const { user, fetchGiftCards } = useContext(AppContext);

    useEffect(() => {
        if (purchase && user) {
            
            const sellerIds = purchase.items.map(item => item.userId);
            const giftCardIds = purchase.items.map(item => item.id);

            const postData = {
                sellerId: sellerIds,
                buyerId: user.id, 
                giftcardId: giftCardIds
            };

            
            fetch('https://re-gift-aeesgygqhsbaf8eh.eastus-01.azurewebsites.net/api/Trade', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('POST request successful:', data);
                    fetchGiftCards()
                })
                .catch(error => {
                    console.error('Error making POST request:', error);
                });
            
        }
    }, [purchase, user]);

    if (!purchase) return <p>No receipt available</p>;

    const { date, items, totalPrice } = purchase;

    return (
        <div>
            <h1>Kvitto</h1>
            <p><strong>Datum:</strong> {date}</p>
            <ul>
                {items.map(item => (
                    <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <img src={item.imgSrc} alt={item.title} style={{ width: '50px', height: 'auto' }} />
                            <strong>{item.title}</strong><br />
                            <span style={{ textDecoration: 'line-through', color: 'red' }}>{item.originalPrice} Kr</span><br />
                            <span style={{ color: 'green' }}>{item.discountedPrice} Kr</span>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="mt-3">
                <strong>Total: {totalPrice} Kr</strong>
            </div>
        </div>
    );
}
