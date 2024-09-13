import { Carousel } from 'react-bootstrap';
import '../css/Home.css';
import HM11 from '../img/HM11.jpg';
import Amazon55 from '../img/Amazon55.jpg';
import Ahlens11 from '../img/Ahlens11.jpg';
import Battlenet11 from '../img/Battlenet11.jpg';
import Burgerking11 from '../img/Burgerking11.jpg';
import Ica1 from '../img/Ica1.jpg';
import Xbox1 from '../img/Xbox1.jpg';

export default function Home() {
    return (
        <div className="container py-4" id="home">
            <div className="custom-background p-5 rounded">
                <div className="col-sm-8 py-5 mx-auto">
                    <h1 className="display-5 fw-normal smaller-heading">Välkommen till Regift</h1>
                    <p className="lead smaller-text">
                        Här kan du köpa och sälja presentkort på ett enkelt och säkert sätt.
                        Oavsett om du vill bli av med ett oanvänt presentkort eller letar efter ett bra erbjudande på ett presentkort du vill ha, är vi här för att hjälpa dig!
                    </p>
                </div>
            </div>

            {/* Carousel */}
            <Carousel className="custom-carousel my-5">
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={HM11}
                        alt="H&M"
                    />
                    <Carousel.Caption></Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={Amazon55}
                        alt="Amazon"
                    />
                    <Carousel.Caption></Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={Ahlens11}
                        alt="Ahlens11"
                    />
                    <Carousel.Caption></Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={Battlenet11}
                        alt="Battlenet11"
                    />
                    <Carousel.Caption></Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={Burgerking11}
                        alt="Burgerking11"
                    />
                    <Carousel.Caption></Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={Ica1}
                        alt="Ica1"
                    />
                    <Carousel.Caption></Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={Xbox1}
                        alt="Xbox1"
                    />
                    <Carousel.Caption></Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
}
