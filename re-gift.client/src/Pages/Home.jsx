import { Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react'; // Importera useContext
import { AppContext } from '../context/AppContext'; // Importera AppContext
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
    const { user } = useContext(AppContext); // Hämta user från AppContext

    const handleBuyClick = () => {
        navigate('/BuyGiftCard'); // Navigera till köpsidan


    };

    const handleSellClick = () => {
        if (user) {
            navigate('/SellGiftCard');  // Navigera till säljsidan om användaren är inloggad
        } else {
            navigate('/login');  // Navigera till inloggningssidan om användaren inte är inloggad
        }
    };
    // Funktion för att hantera klick på varje bild
    const handleImageClick = () => {
        console.log('Navigerar till BuyGiftCard-sidan'); // För felsökning
        navigate('/BuyGiftCard');
    };
    return (
        <div className="container py-4" id="home">
            <div className="custom-background p-5 rounded">
                <div className="col-sm-8 pt-5 mx-auto">
                    <h1 className="display-5 fw-normal smaller-heading">Välkommen till Regift</h1>
                    <p className="lead smaller-text" style={{ fontWeight: 300, fontFamily: 'Arial, sans-serif' }}>
                        Här kan du köpa och sälja presentkort på ett enkelt och säkert sätt.
                        Oavsett om du vill bli av med ett oanvänt presentkort eller letar efter ett bra erbjudande på ett presentkort du vill ha, är vi här för att hjälpa dig!
                    </p>
                    {/* Knappsektion */}
                </div>
            </div>

                    <div className="mt-4" style={{ marginTop: '20px', marginBottom: '80px' }} >
                        <button className="btn btn-primary mx-2"
                            style={{ backgroundColor: 'lightblue', color: 'black', border: "none"}} // Ljusbla färg för åkta knappen
                            onClick={handleBuyClick}>
                            Köp Presentkort
                        </button>
                        <button className="btn btn-secondary mx-2"
                            style={{ backgroundColor: 'lightgreen', color: 'black', border: "none" }} // Ljusgrön färg för säljknappen
                            onClick={handleSellClick}>
                            Sälj Presentkort
                        </button>
                    </div>

            {/* Carousel */}
            <Carousel className="custom-carousel mt-5">
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={HM11}
                        alt="H&M"
                        onClick={handleImageClick} // Lägg till onClick på varje bild
                        style={{ cursor: 'pointer' }} // Ändrar muspekaren vid hover
                    />
                    <Carousel.Caption></Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={Amazon55}
                        alt="Amazon"
                        onClick={handleImageClick} // Lägg till onClick på varje bild
                        style={{ cursor: 'pointer' }}
                    />
                    <Carousel.Caption></Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={Ahlens11}
                        alt="Ahlens11"
                        onClick={handleImageClick} // Lägg till onClick på varje bild
                        style={{ cursor: 'pointer' }}
                    />
                    <Carousel.Caption></Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={Battlenet11}
                        alt="Battlenet11"
                        onClick={handleImageClick} // Lägg till onClick på varje bild
                        style={{ cursor: 'pointer' }}
                    />
                    <Carousel.Caption></Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={Burgerking11}
                        alt="Burgerking11"
                        onClick={handleImageClick} // Lägg till onClick på varje bild
                        style={{ cursor: 'pointer' }}
                    />
                    <Carousel.Caption></Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={Ica1}
                        alt="Ica1"
                        onClick={handleImageClick} // Lägg till onClick på varje bild
                        style={{ cursor: 'pointer' }}
                    />
                    <Carousel.Caption></Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={Xbox1}
                        alt="Xbox1"
                        onClick={handleImageClick} // Lägg till onClick på varje bild
                        style={{ cursor: 'pointer' }}
                    />
                    <Carousel.Caption></Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
}
