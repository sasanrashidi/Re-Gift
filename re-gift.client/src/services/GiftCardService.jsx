import React, { useEffect, useState } from 'react';

const SimpleGiftCardComponent = () => {
    const [giftCards, setGiftCards] = useState([]);

    useEffect(() => {
        // Fetch data from the API
        fetch("https://localhost:7049/api/Giftcard")
            .then((response) => response.json()) // Parse the JSON from the response
            .then((data) => setGiftCards(data)) // Store the data in state
            .catch((error) => console.error("Error fetching data:", error)); // Log any errors
    }, []); // Empty dependency array to run only once when the component mounts

    return (
        <div>
            
            <ul>
                {giftCards.map((giftCard, index) => (
                    <li key={index}>{giftCard.company} - ${giftCard.balance.toFixed(2)}</li>
                ))}
            </ul>
        </div>
    );
};

export default SimpleGiftCardComponent;
