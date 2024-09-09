
//import { Link } from 'react-router-dom';



//export function Contact (){
//    return (

//           <nav className="Contact">

//            <div>
//                <p className="lead">
//                   Presentkort blblblblblbblblblblbl
//                </p>
//            </div>
//        </nav>

//    );
//};

import React from 'react';
import '../css/Contact.css' // Importera den uppdaterade CSS-filen
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'; // Importera ikoner

export function Contact() {
    return (
        <nav className="Contact">
    
            <div className="content-center">

                <p className="contact-lead">
                    Kontakta oss för mer information eller följ oss på sociala medier!!!
                </p>

                <p className="contact-lead">
                    Tel: +46 70582569
                </p>

                <p className="contact-lead">

                    Email: regift@gmail.com
                </p>

                <p className="contact-lead">

                    Malmvägen 1, 115 41, Stockholm
                </p>

                <div className="social-icons">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <FaFacebook size={30} />
                    </a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                        <FaTwitter size={30} />
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <FaInstagram size={30} />
                    </a>
                </div>
            </div>
        </nav>
    );
}



