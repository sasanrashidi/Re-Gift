import React, { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com'; // Import EmailJS
import '../css/receipt.css'
import { AppContext } from '../context/AppContext';

export function ReceiptPage() {
    const location = useLocation();
    const navigate = useNavigate();
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

            // First send the purchase data to the Trade API
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
                    fetchGiftCards(); // Update the context after successful post

                    // Prepare HTML for email using table-based layout and inline styles
                    const receiptHtml = `
                    <p><strong>Receipt from Re:Gift</strong></p>
                    <p><strong>Date:</strong> ${purchase.date}</p>
                    <p><strong>Items:</strong></p>
                    <ul>
                        ${purchase.items.map(item => `
                            <li>
                                <strong>${item.title}</strong><br />
                                Original Price: ${item.originalPrice} Kr<br />
                                Discounted Price: ${item.discountedPrice} Kr
                            </li>
                        `).join('')}
                    </ul>
                    <p><strong>Total:</strong> ${purchase.totalPrice} Kr</p>
                `;

                    // Send email using EmailJS
                    emailjs.send('service_aca0774', 'template_yyrnxiv', {
                        to_email: user.email,
                        from_name: 'Re:Gift',
                        message_html: receiptHtml
                    }, 'Comfd8MmT2ijJoJbm')
                        .then(response => {
                            console.log('Email sent successfully:', response);
                        })
                        .catch(error => {
                            console.error('Error sending email:', error);
                        });
                })
                .catch(error => {
                    console.error('Error making POST request:', error);
                });
        }
    }, [purchase, user]); // Dependency array: re-run effect when purchase or user changes

    if (!purchase) return <p>No receipt available</p>;

    const { date, items, totalPrice } = purchase;

    return (
        <div className="receipt-container">
            <p className="thank-you-message">Tack för ditt köp!</p> {/* Correct Swedish characters */}
            <div className="receipt-content">
                <h1>Kvitto</h1> {/* "Kvitto" in Swedish */}
                <p><strong>Datum:</strong> {date}</p>
                <ul className="receipt-list">
                    {items.map(item => (
                        <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <img src={item.imgSrc} alt={item.title} style={{ width: '50px', height: 'auto' }} />
                                <strong>{item.title}</strong><br />
                                <span>userId: {item.userId}</span><br />
                                <span>userId: {item.userId}</span><br />
                                <span style={{ textDecoration: 'line-through', color: 'red' }}>{item.originalPrice} Kr</span><br />
                                <span style={{ color: 'green' }}>{item.discountedPrice} Kr</span>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="mt-3">
                    <strong>Total: {totalPrice} Kr</strong>
                </div>
                <button className="home-button" onClick={() => navigate('/')}>Gå hem</button>
            </div>
        </div>
    );
}


