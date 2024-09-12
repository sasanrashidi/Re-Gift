import { Carousel } from 'react-bootstrap';
import '../css/Home.css';
import HM from '../img/HM.jpg';
import Nike from '../img/Nike.jpg';
import Amazon5 from '../img/Amazon5.jpg';

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
