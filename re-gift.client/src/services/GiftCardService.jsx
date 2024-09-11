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


/*

  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
                {filteredImages.map(image => (
                    <div key={image.id} style={{ cursor: 'pointer', textAlign: 'center' }} onClick={() => handleImageClick(image)}>
                        <img src={image.imgSrc} alt={image.title} style={{ width: '150px', height: '150px', borderRadius: '15px', transition: 'transform 0.3s ease', }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'} // Förstora vid hover
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        />
                        <p>
                            <span>{image.title.split(' - ')[0]}</span><br />
                            <span style={{ textDecoration: 'line-through', color: 'red' }}>{image.originalPrice}</span><br />
                            <span style={{ color: 'green' }}>{image.discountedPrice}</span>
                        </p>
                    </div>
                ))}
            </div>


*/
