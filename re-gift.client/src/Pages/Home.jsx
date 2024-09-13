import { Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react'; // Importera useContext
import { AppContext } from '../context/AppContext'; // Importera AppContext
import '../css/Home.css';
import HM from '../img/HM.jpg';
import Nike from '../img/Nike.jpg';
import Amazon5 from '../img/Amazon5.jpg';

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
    return (
        <div className="container py-4" id="home">
            <div className="custom-background p-5 rounded">
                <div className="col-sm-8 py-5 mx-auto">
                    <h1 className="display-5 fw-normal smaller-heading">Välkommen till Regift</h1>
                    <p className="lead smaller-text" style={{ fontWeight: 300, fontFamily: 'Arial, sans-serif' }}>
                        Här kan du köpa och sälja presentkort på ett enkelt och säkert sätt.
                        Oavsett om du vill bli av med ett oanvänt presentkort eller letar efter ett bra erbjudande på ett presentkort du vill ha, är vi här för att hjälpa dig!
                    </p>
                    {/* Knappsektion */}
                    <div className="mt-4">
                        <button className="btn btn-primary mx-2"
                            style={{ backgroundColor: 'lightblue', color: 'black', border: "none" }}
                            onClick={handleBuyClick}>
                            Köp Presentkort
                        </button>
                        <button className="btn btn-secondary mx-2"
                            style={{ backgroundColor: 'lightgreen', color: 'black', border: "none" }} // Ljusgrön färg för säljknappen
                            onClick={handleSellClick}>
                            Sälj Presentkort
                        </button>
                    </div>
                </div>
            </div>


            {/* Carousel */}
            <Carousel className="custom-carousel my-5">
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={HM}
                        alt="H&M"
                    />
                    <Carousel.Caption></Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={Nike}
                        alt="Nike"
                    />
                    <Carousel.Caption></Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={Amazon5}
                        alt="Amazon"
                    />
                    <Carousel.Caption></Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
}
