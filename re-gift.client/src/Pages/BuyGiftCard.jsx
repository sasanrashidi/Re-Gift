import React, { useState, useContext } from 'react';
import SimpleGiftCardComponent from '../services/GiftCardService';
import Nikeimg from '../img/Nike2.jpg';
import Adidasimg from '../img/Adidas.jpg';
import Elgigantenimg from '../img/Elgiganten.jpg';
import BattleNetimg from '../img/BattleNet.jpg';
import PSNimg from '../img/PSN.jpg';
import Steamimg from '../img/Steam.jpg';
import Ikeaimg from '../img/Ikea.jpg';
import Icaimg from '../img/Ica.jpg';
import Logitechimg from '../img/Logitech.jpg';
import Webhallenimg from '../img/Webhallen.jpg';
import Akademibokimg from '../img/Akademibok.png';
import BurgerKingimg from '../img/BurgerKing.jpg';
import { AppContext } from '../context/AppContext'; // Import the context

export function BuyGiftCard() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    const { cart, setCart, favorites, setFavorites, giftCards } = useContext(AppContext); // Access context

    const companyImageMap = {
        'Nike': Nikeimg,
        'Adidas': Adidasimg,
        'Elgiganten': Elgigantenimg,
        'BattleNet': BattleNetimg,
        'PSN': PSNimg,
        'Steam': Steamimg,
        'Ikea': Ikeaimg,
        'Ica': Icaimg,
        'Logitech': Logitechimg,
        'Webhallen': Webhallenimg,
        'AkademiBokhandeln': Akademibokimg,
        'BurgerKing': BurgerKingimg
    };

    // Map the gift cards to create a list of card images with properties.
    const giftCardImages = (giftCards || []).map(giftCard => ({
        id: giftCard.id,
        title: giftCard.company,
        originalPrice: giftCard.balance,
        imgSrc: companyImageMap[giftCard.company] || 'default-image.jpg',
        details: giftCard.company,
        discountedPrice: giftCard.discountedBalance,
        expiryDate: giftCard.expireDate
    }));

    // Handle search input change.
    const handleSearchChange = (e) => setSearchQuery(e.target.value);

    // Filter the giftCardImages based on the search query.
    const filteredGiftCardImages = giftCardImages.filter(image =>
        image.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleImageClick = (image) => setSelectedImage(image);

    const addToCart = (image) => {
        setCart([...cart, image]);
        closeModal(); // Close modal after adding to cart
    };

    const addToFavorites = (image) => {
        setFavorites([...favorites, image]);
        closeModal(); // Close modal after adding to favorites
    };

    const closeModal = () => setSelectedImage(null);

    return (
        <div style={{ textAlign: 'center', paddingTop: '50px' }}>
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
                {filteredGiftCardImages.map(image => (
                    <div key={image.id} style={{ cursor: 'pointer', textAlign: 'center' }} onClick={() => handleImageClick(image)}>
                        <img src={image.imgSrc} alt={image.title} style={{ width: '150px', height: '150px', borderRadius: '15px', transition: 'transform 0.3s ease', }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'} // Zoom in on hover
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} />
                        <p>
                            <span>{image.title.split(' - ')[0]}</span><br />
                            <span style={{ textDecoration: 'line-through', color: 'red' }}>{image.originalPrice} Kr</span><br />
                            <span style={{ color: 'green' }}>{image.discountedPrice} Kr</span>
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
                        <img src={selectedImage.imgSrc} alt={selectedImage.title} style={{ width: '200px', height: '200px', borderRadius: '15px', }} />
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
