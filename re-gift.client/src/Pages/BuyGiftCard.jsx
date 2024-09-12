import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SimpleGiftCardComponent from '../services/GiftCardService';
import Amazon2 from '../img/Amazon2.jpg';
import Nike2 from '../img/Nike2.jpg';
import HM2 from '../img/HM2.jpg';
import Apple from '../img/Apple.jpg';
import Apple1 from '../img/Apple1.jpg';
import Bio1 from '../img/Bio1.jpg';
import { AppContext } from '../context/AppContext'; // Import the context

export function BuyGiftCard() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    const { cart, setCart, favorites, setFavorites, user } = useContext(AppContext); // Access context
    const navigate = useNavigate();

    const images = [
        { id: 1, title: 'Amazon', originalPrice: '200 Kr.', imgSrc: Amazon2, details: 'Amazon', discountedPrice: '100 Kr.', expiryDate: '2024-12-31' },
        { id: 2, title: 'Nike', originalPrice: '150 Kr.', imgSrc: Nike2, details: 'Nike', discountedPrice: '50 Kr.', expiryDate: '2024-06-30' },
        { id: 3, title: 'H&M', originalPrice: '60 Kr.', imgSrc: HM2, details: 'H&M', discountedPrice: '30 Kr.', expiryDate: '2025-01-15' },
        { id: 4, title: 'Apple', originalPrice: '250 Kr.', imgSrc: Apple, details: 'Apple', discountedPrice: '100 Kr.', expiryDate: '2024-09-10' },
        { id: 5, title: 'Apple', originalPrice: '75 Kr.', imgSrc: Apple1, details: 'Apple', discountedPrice: '50 Kr.', expiryDate: '2024-11-22' },
        { id: 6, title: 'Bio', originalPrice: '85 Kr.', imgSrc: Bio1, details: 'Bio', discountedPrice: '60 Kr.', expiryDate: '2025-02-01' },
    ];

    const handleSearchChange = (e) => setSearchQuery(e.target.value);

    const handleImageClick = (image) => setSelectedImage(image);

    // Add selected image to cart
    const addToCart = (image) => {
        setCart([...cart, image]);
        closeModal(); // Close modal after adding to cart
    };

    // Add selected image to favorites
    const addToFavorites = (image) => {
        setFavorites([...favorites, image]);
        closeModal(); // Close modal after adding to favorites
    };

    const filteredImages = images.filter(image =>
        image.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const closeModal = () => setSelectedImage(null);

    const handleSellClick = () => {
        if (user) {
            navigate('/SellGiftCard');  // Navigate to SellGiftCard if user is logged in
        } else {
            navigate('/login');  // Navigate to LoggaIn if user is not logged in
        }
    };

    return (
        <div style={{ textAlign: 'center', paddingTop: '50px' }}>
            <SimpleGiftCardComponent />

            {/* Text och knapp för att navigera till SellGiftCard eller LoggaIn-sidan beroende på användarstatus */}
            <div style={{ marginBottom: '20px', fontSize: '18px' }}>
                Är du intresserad av att sälja dina presentkort?
                <button
                    onClick={handleSellClick}
                    style={{ color: '#007bff', textDecoration: 'none', marginLeft: '5px', border: 'none', background: 'transparent', cursor: 'pointer' }}>
                    Klicka här!
                </button>
            </div>

            <p style={{ padding: '20px' }}>Här kan du köpa presentkort från privatpersoner. Logga in för att se mer av sortimentet.</p>
            

            <div className="d-flex justify-content-center mb-4">
                <div className="input-group" style={{ width: '300px' }}>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Sök efter ett presentkort..."
                        aria-label="Search"
                        aria-describedby="basic-addon1"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>

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

            {selectedImage && (
                <div style={{
                    position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center'
                }}>
                    <div style={{
                        backgroundColor: 'white', padding: '20px', borderRadius: '10px',
                        maxWidth: '500px', textAlign: 'center'
                    }}>
                        <img src={selectedImage.imgSrc} alt={selectedImage.title} style={{ width: '200px', height: '200px', borderRadius: '15px',}} />
                        <p>{selectedImage.details}</p>
                        <p>
                            <span style={{ textDecoration: 'line-through', color: 'red' }}>{selectedImage.originalPrice}</span><br />
                            <span style={{ color: 'green' }}>{selectedImage.discountedPrice}</span>
                        </p>
                        <p>Utgångsdatum: {selectedImage.expiryDate}</p>

                        <button onClick={() => addToCart(selectedImage)} style={{ marginTop: '20px', padding: '10px' }}>
                            Lägg i Korg
                        </button>
                        <button onClick={() => addToFavorites(selectedImage)} style={{ marginTop: '20px', padding: '10px' }}>
                            Lägg till Favoriter
                        </button>
                        <button onClick={closeModal} style={{ marginTop: '20px', padding: '10px' }}>
                            Stäng
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BuyGiftCard;
