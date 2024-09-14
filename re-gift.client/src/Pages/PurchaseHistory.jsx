import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export function PurchaseHistory() {
    const { purchaseHistory } = useContext(AppContext);

    return (
        <div>
            <h2>Köphistorik</h2>
            {purchaseHistory.length === 0 ? (
                <p>Ingen köphistorik tillgänglig.</p>
            ) : (
                <ul className="list-group">
                    {purchaseHistory.map((purchase, index) => (
                        <li key={index} className="list-group-item">
                            <strong>Köpdatum:</strong> {purchase.date}
                            <ul>
                                {purchase.items.map((item, idx) => (
                                    <li key={idx}>
                                        {item.title} - {item.discountedPrice} Kr
                                    </li>
                                ))}
                            </ul>
                            <strong>Totalpris:</strong> {purchase.totalPrice} Kr
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
