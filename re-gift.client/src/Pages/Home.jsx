import { Carousel } from 'react-bootstrap'; 
import '../css/Home.css';
import HM from '../img/HM.jpg'; 
import Nike from '../img/Nike.jpg'; 
import Amazon2 from '../img/Amazon2.jpg'; 

export default function Home() {
    return (
        <div className="container py-4" id="home">
            <div className="bg-body-tertiary p-5 rounded">
                <div className="col-sm-8 py-5 mx-auto">
                    <h1 className="display-5 fw-normal smaller-heading">Välkommen till Regift Card hemsida</h1>
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
                    <Carousel.Caption>
                        <h3>HM</h3>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={Nike}
                        alt="Nike"
                    />
                    <Carousel.Caption>
                        <h3>Nike</h3>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={Amazon2}
                        alt="Amazon"
                    />
                    <Carousel.Caption>
                        <h3>Amazon</h3>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
}
