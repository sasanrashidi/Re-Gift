import { Carousel } from 'react-bootstrap'; // Importera Carousel från React-Bootstrap
import '../css/Home.css';
import HM from '../img/HM.jpg'; // Din första bild
import Nike from '../img/Nike.jpg'; // Din andra bild
import Amazon from '../img/Amazon.jpg'; // Din tredje bild

export default function Home() {
    return (
        <div className="container py-4" id="home">
            <div className="bg-body-tertiary p-5 rounded">
                <div className="col-sm-8 py-5 mx-auto">
                    <h1 className="display-5 fw-normal">Välkommen till Regift Card hemsida</h1>
                    <p className="lead">
                        Här kan du köpa och sälja presentkort på ett enkelt och säkert sätt.
                        Oavsett om du vill bli av med ett oanvänt presentkort eller letar efter ett bra erbjudande på ett presentkort du vill ha, är vi här för att hjälpa dig!
                    </p>
                </div>
            </div>

            {/* Karusell */}
            <Carousel className="my-5">
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={HM}
                        alt="H&M"
                    />
                    <Carousel.Caption>
                        <h3>HM</h3>
                       {/* <p>Beskrivning av första bilden.</p>*/}
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={Nike}
                        alt="Andra bilden"
                    />
                    <Carousel.Caption>
                        <h3>Nike</h3>
                       {/* <p>Beskrivning av andra bilden.</p>*/}
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={Amazon}
                        alt="Tredje bilden"
                    />
                    <Carousel.Caption>
                        <h3>Amazon</h3>
                       {/* <p>Beskrivning av tredje bilden.</p>*/}
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
}
