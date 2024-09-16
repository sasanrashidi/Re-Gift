import { Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import '../css/Home.css';
import HM11 from '../img/HM11.jpg';
import Amazon55 from '../img/Amazon55.jpg';
import Ahlens11 from '../img/Ahlens11.jpg';
import Battlenet11 from '../img/Battlenet11.jpg';
import Burgerking11 from '../img/Burgerking11.jpg';
import Ica1 from '../img/Ica1.jpg';
import Xbox1 from '../img/Xbox1.jpg';

export default function Home() {
    const navigate = useNavigate();
    const { user } = useContext(AppContext);

    const handleNavigation = (route) => {
        navigate(route);
    };

    const handleBuyClick = () => {
        handleNavigation('/BuyGiftCard');
    };

    const handleSellClick = () => {
        handleNavigation(user ? '/SellGiftCard' : '/login');
    };

    const handleImageClick = () => {
        handleBuyClick();
    };

    return (
        <div className="container py-4" id="home">
            <div className="custom-background p-5 rounded">
                <div className="col-sm-8 pt-5 mx-auto">
                    <h1 className="display-5 fw-normal smaller-heading">Välkommen till Re:Gift</h1>
                    <p className="lead smaller-text" style={{ fontWeight: 300, fontFamily: 'Arial, sans-serif' }}>
                        Här kan du köpa och sälja presentkort på ett enkelt och säkert sätt.
                        Oavsett om du vill bli av med ett oanvänt presentkort eller letar efter ett bra erbjudande på ett presentkort du vill ha, är vi här för att hjälpa dig!
                    </p>
                </div>
            </div>

            <div className="button-section mt-4" style={{ marginBottom: '80px' }}>
                <button
                    className="btn btn-primary mx-2"
                    style={{ backgroundColor: 'lightblue', color: 'black', border: 'none' }}
                    onClick={handleBuyClick}
                >
                    Köp Presentkort
                </button>
                <button
                    className="btn btn-secondary mx-2"
                    style={{ backgroundColor: 'lightgreen', color: 'black', border: 'none' }}
                    onClick={handleSellClick}
                >
                    Sälj Presentkort
                </button>
            </div>

            <Carousel className="custom-carousel mt-5" style={{ boxShadow: '8px 8px 8px rgba(0, 0, 0, 0.3)' }}>
                {[HM11, Amazon55, Ahlens11, Battlenet11, Burgerking11, Ica1, Xbox1].map((imageSrc, index) => (
                    <Carousel.Item key={index}>
                        <img
                            className="d-block w-100"
                            src={imageSrc}
                            alt={`Slide ${index + 1}`}
                            onClick={handleImageClick}
                            style={{ cursor: 'pointer', width: '100%', height: '500px', objectFit: 'cover' }} // Consistent size
                        />
                    </Carousel.Item>
                ))}
            </Carousel>

        </div>
    );
}
