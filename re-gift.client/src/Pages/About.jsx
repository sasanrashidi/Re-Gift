//import { Link } from 'react-router-dom';
//import regiftLogo from '../IMG/REGIFTT.png';


//export function About (){
//    return (

//           <nav className="About">

//            <div>
//                <p className="lead">
//                   Presentkort blblblblblbblblblblbl
//                </p>
//                <img src={regiftLogo} alt="Regift Logo" className="img-fluid" width={150} height={50} style={{ margin: 0, padding: 0, border: 'none' }}></img>
//            </div>
//        </nav>

//    );
//};

import React from 'react';
import '../css/About.css'; // Importera endast About.css
import regiftLogo from '../IMG/REGIFTT.png'; // Kontrollera att du har rätt sökväg


export function About() {
    return (
        <nav className="About">
            <div className="about-center">
                <p className="lead">
                    Välkommen till vår plattform, där vi gör det enklare än någonsin att både köpa och sälja presentkort! Vårt mål är att erbjuda en smidig, säker och tillförlitlig tjänst där du kan hitta det perfekta presentkortet, eller sälja ett oanvänt kort och få ut maximalt värde för det.
                </p>
                <p className="lead">
                    Vi vet hur det känns att få ett presentkort som kanske inte riktigt passar, och därför skapade vi denna marknadsplats. Här kan du snabbt och enkelt omvandla dina oanvända presentkort till pengar, eller hitta fantastiska erbjudanden på presentkort till dina favoritbutiker.
                </p>
                <p className="lead">
                    Med ett stort urval av presentkort och en säker transaktionsprocess ser vi till att både köpare och säljare känner sig trygga. Oavsett om du vill ge bort en gåva eller använda dina presentkort på ett mer flexibelt sätt, är vi här för att hjälpa dig på bästa sätt.
                </p>
                <p className="lead">
                    Vårt team arbetar kontinuerligt för att göra din upplevelse så smidig och säker som möjligt. Vi strävar efter att skapa en transparent och rättvis marknadsplats där alla kan delta med förtroende.
                </p>
                <p className="lead">
                    Har du några frågor? Tveka inte att kontakta oss – vi är här för att hjälpa dig!
                </p>
                <img src={regiftLogo} alt="Regift Logo" className="img-fluid" width={150} height={50} style={{ marginTop: '20px', border: 'none' }} />
            </div>
        </nav>
    );
}





