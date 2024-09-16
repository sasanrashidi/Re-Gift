import React from 'react';
import '../css/About.css';
import regiftLogo from '../IMG/REGIFTT.png';

export function About() {
    return (
        <nav className="About">
            <div className="about-center">
                <p className="about-lead">
                    Välkommen till Re:gift, en marknadsplats för att enkelt och tryggt köpa och sälja presentkort till rabatterade priser. Här kan du smidigt sälja dina oanvända presentkort eller hitta fantastiska erbjudanden på kort till specifika butiker.
                </p>
                <p className="about-lead">
                    Vårt mål är att skapa en säker och effektiv plattform där säljare och köpare kan mötas för att dra nytta av det stora utbudet av presentkort. Vi strävar efter att underlätta för säljare att omvandla oanvända presentkort till pengar och för köpare att hitta värdefulla erbjudanden.
                </p>
                <p className="about-lead">
                    För närvarande valideras inte presentkorten som läggs upp för försäljning av oss. Eftersom Re:gift är ett mindre skolprojekt har vi ännu inte implementerat en process för verifiering och validering av presentkort. Detta är något vi planerar att införa i framtiden, men i nuläget är vår plattform utformad för att låta användare sälja presentkort direkt efter att ha registrerat ett konto, utan att presentkorten först kontrolleras.
                </p>
                <p className="about-lead">
                    Trots att validering ännu inte sker, fortsätter vi att utveckla och förbättra tjänsten med fokus på användarvänlighet och säkerhet. Vi uppmuntrar alla användare att agera ansvarsfullt och kontakta oss om de har frågor eller stöter på problem.
                </p>
                <p className="about-lead">
                    Vi är dedikerade till att skapa en enkel och transparent tjänst som gör det möjligt för dig att snabbt och säkert köpa och sälja presentkort. Vårt team är här för att hjälpa dig, och vi ser fram emot att fortsätta utveckla Re:gift med framtida förbättringar.
                </p>

                <img src={regiftLogo} alt="Re:gift Logo" className="img-fluid" width={150} height={50} style={{ marginTop: '20px', border: 'none' }} />
            </div>
        </nav>
    );
}
