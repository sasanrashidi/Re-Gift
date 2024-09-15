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
import '../css/About.css'; 
import regiftLogo from '../IMG/REGIFTT.png'; 

export function About() {
    return (
        <nav className="About">
            <div className="about-center">
                <p className="about-lead">
                    Välkommen till Re:gift, en marknadsplats för att enkelt och tryggt handla billigare presentkort. Här får du möjligheten att sälja dina oanvända presentkort eller köpa dem till rabatterade priser.
                </p>
                <p className="about-lead">
                    Oavsett om du vill sälja ett presentkort som du inte har behov av, eller om du letar efter ett fynd till en favoritbutik, erbjuder vi en smidig och säker lösning. Vi vill göra det enkelt för säljare att få pengar för sina presentkort och för köpare att hitta rabatterade alternativ.
                </p>
                <p className="about-lead">
                    Vi ser till att varje presentkort kontrolleras för giltighet innan det läggs upp för försäljning, så att du som köpare kan känna dig trygg i att du får ett fungerande presentkort. Som säljare kan du också känna dig säker på att affären går smidigt efter validering.
                </p>
                <p className="about-lead">
                    Vår tjänst är lätt att använda och vi har gjort allt för att du snabbt ska kunna köpa eller sälja presentkort utan krångel. Oavsett om du vill göra en bra affär som köpare eller omvandla ett oanvänt kort till pengar, så finns Re:gift här för att hjälpa dig.
                </p>
                <p className="about-lead">
                    Vi arbetar hela tiden med att förbättra tjänsten och är alltid tillgängliga om du har några frågor eller behöver hjälp. Tveka inte att höra av dig!
                </p>

                <img src={regiftLogo} alt="Re:gift Logo" className="img-fluid" width={150} height={50} style={{ marginTop: '20px', border: 'none' }} />
            </div>
        </nav>
    );
}





