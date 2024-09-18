import { Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import '../css/Home.css';
import IKEAA from '../img/IKEAA.jpg';
import BurgerKing from '../img/BurgerKing.jpg';
import ICAA from "../img/ICAA.jpg";
import Battlenett from '../img/Battlenett.jpg';
import Nikee from '../img/Nikee.jpg';
import Adidass from '../img/Adidass.jpg';

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
        if (user) {
            navigate('/SellGiftCard');
        } else {
            // Skicka med den aktuella sidan som vi försöker navigera till om användaren inte är inloggad
            navigate('/login', { state: { from: '/SellGiftCard' } });
        }
    };

    const handleImageClick = () => {
        handleBuyClick();
    };

    return (
        <div className="container py-4" id="home">
            <div className="custom-background p-5 rounded pb-2">
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
                {[Adidass, Nikee, Battlenett, BurgerKing, ICAA, IKEAA].map((imageSrc, index) => (
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
