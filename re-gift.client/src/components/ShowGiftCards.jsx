import React from 'react';

const ShowGiftCards = ({ giftCards }) => {
    return (
        <ul>
            {giftCards.map((giftCard, index) => (
                <li key={index}>{giftCard.company} - ${giftCard.balance.toFixed(2)}</li>
            ))}
        </ul>
    );
};

export default ShowGiftCards;

