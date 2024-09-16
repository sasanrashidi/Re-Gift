import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Nikeimg from '../img/Nike2.jpg';
import Adidasimg from '../img/Adidas.jpg';
import Elgigantenimg from '../img/Elgiganten.jpg';
import BattleNetimg from '../img/BattleNet1.PNg';
import PSNimg from '../img/PSN.jpg';
import Steamimg from '../img/Steam.jpg';
import Ikeaimg from '../img/Ikea.jpg';
import Icaimg from '../img/Ica.jpg';
import Logitechimg from '../img/Logitech.jpg';
import Webhallenimg from '../img/Webhallen.jpg';
import Akademibokimg from '../img/Akademibok.png';
import BurgerKingimg from '../img/BurgerKing.jpg';
import { AppContext } from '../context/AppContext';
import '../css/Home.css';
import { Tab } from 'bootstrap';

export function BuyGiftCard() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); // Track the current page

    const { cart, setCart, favorites, setFavorites, giftCards, user } = useContext(AppContext);
    const navigate = useNavigate();
    const location = useLocation();

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

    const ITEMS_PER_PAGE = 12;

    const giftCardImages = (giftCards || []).map(giftCard => ({
        id: giftCard.id,
        title: giftCard.company,
        originalPrice: giftCard.balance,
        imgSrc: companyImageMap[giftCard.company] || 'default-image.jpg',
        details: giftCard.company,
        discountedPrice: giftCard.discountedBalance,
        expiryDate: giftCard.expireDate,
        userId: giftCard.userId
    }));

    const filteredGiftCardImages = giftCardImages.filter(image =>
        image.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredGiftCardImages.length / ITEMS_PER_PAGE);

    const paginatedGiftCardImages = filteredGiftCardImages.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    useEffect(() => {
        if (location.state?.resetPage) {
            setCurrentPage(1); // Reset to page 1 if resetPage is true
        }
    }, [location.state]);

    const handleSearchChange = (e) => setSearchQuery(e.target.value);

    const handleImageClick = (image) => setSelectedImage(image);

    const addToCart = (image) => {
        setCart(prevCart => {
            if (!prevCart.some(item => item.id === image.id)) {
                return [...prevCart, image];
            } else {
                alert('Detta presentkort finns redan i din kundkorg.');
                return prevCart;
            }
        });
        closeModal();
    };

    const addToFavorites = (image) => {
        setFavorites(prevFavorites => {
            if (!prevFavorites.some(item => item.id === image.id)) {
                return [...prevFavorites, image];
            } else {
                alert('Detta presentkort finns redan i dina favoriter.');
                return prevFavorites;
            }
        });
        closeModal();
    };

    const closeModal = () => setSelectedImage(null);

    const handleSellClick = () => {
        if (user) {
            navigate('/SellGiftCard');
        } else {
            navigate('/login');
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(prevPage => prevPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(prevPage => prevPage - 1);
    };

    return (
        <div style={{ textAlign: 'center', paddingTop: '50px' }}>
            <div style={{ marginBottom: '20px', fontSize: '18px' }}></div>

            <p style={{ padding: '20px', fontSize: '25px', fontStyle: 'italic' }}>
                Här kan du köpa presentkort från privatpersoner.
                <br />
                Om du vill sälja, tryck här:
                <button className="btn btn-secondary mx-2"
                    style={{ backgroundColor: 'lightgreen', color: 'black', border: "none" }}
                    onClick={handleSellClick}>
                    Sälj Presentkort
                </button>
            </p>
            <br />

            <div className="d-flex justify-content-center mb-4">
                <div className="input-group" style={{ width: '500px' }}>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Sök efter ett presentkort..."
                        aria-label="Search"
                        aria-describedby="basic-addon1"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        style={{
                            fontSize: '18px',
                            height: '50px',
                            padding: '10px'
                        }}
                    />
                </div>
            </div>
            <br />
            <br />

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 400px)',
                gap: '20px',
                justifyContent: 'center',
                maxWidth: '1250px',
                margin: '0 auto'
            }}>
                {paginatedGiftCardImages.length === 0 ? (
                    <p>No gift cards found.</p>
                ) : (
                    paginatedGiftCardImages.map(image => (
                        <div key={image.id} style={{
                            cursor: 'pointer',
                            textAlign: 'center',
                            width: '250px',
                            height: 'auto'
                        }} onClick={() => handleImageClick(image)}>
                            <img src={image.imgSrc} alt={image.title} style={{
                                width: '150%',
                                height: 'auto',
                                borderRadius: '15px',
                                transition: 'transform 0.3s ease',
                            }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} />
                            <p>
                              <span>{image.title.split(' - ')[0]}</span><br />
                              <span style={{ textDecoration: 'line-through', color: 'red' }}>{image.originalPrice} Kr</span>
                              <span style={{ color: 'green' }}>&nbsp;&nbsp;&nbsp;{image.discountedPrice} Kr&nbsp;&nbsp;&nbsp;<span style={{ color: 'white' }}>({Math.round((1 - image.discountedPrice / image.originalPrice) * 100)}%)</span></span>
                            </p>
                        </div>
                    ))
                )}
            </div>

            <div style={{ marginTop: '20px' }}>
                <button
                    disabled={currentPage === 1}
                    onClick={handlePreviousPage}
                    style={{ marginRight: '10px' }}
                >
                    Previous
                </button>
                <button
                    disabled={currentPage === totalPages}
                    onClick={handleNextPage}
                >
                    Next
                </button>
                <p>Page {currentPage} of {totalPages}</p>
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
                        <img src={selectedImage.imgSrc} alt={selectedImage.title} style={{ width: '250px', height: '250px', borderRadius: '15px' }} />
                        <p>{selectedImage.details}</p>
                        <p>
                          <span style={{ color: 'white', textDecoration: 'none' }}>Värde: </span>
                          <span style={{ color: 'red', textDecoration: 'line-through' }}> {selectedImage.originalPrice} kr</span><br />
                          <span style={{ color: 'white', textDecoration: 'none' }}>Kostar: </span>
                          <span style={{ color: 'green' }}>{selectedImage.discountedPrice} kr</span>
                        </p>
                        <p>Utgångsdatum: {selectedImage.expiryDate}</p>

                        <button onClick={() => addToCart(selectedImage)} style={{ marginTop: '20px', padding: '10px' }}>Lägg i kundvagnen</button>
                        <button onClick={() => addToFavorites(selectedImage)} style={{ marginTop: '10px', padding: '10px' }}>Lägg till i favoriter</button>
                        <button onClick={closeModal} style={{ marginTop: '10px', padding: '10px' }}>Stäng</button>
                    </div>
                </div>
            )}
        </div>
    );
}
