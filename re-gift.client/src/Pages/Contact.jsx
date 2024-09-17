import React from 'react';
import '../css/Contact.css'; // Import the updated CSS file
import { FaFacebook, FaInstagram, FaEnvelope } from 'react-icons/fa'; // Import icons

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
                    Email: <a href="mailto:regiftcompany@gmail.com">regiftcompany@gmail.com</a>
                </p>

                <p className="contact-lead">
                    Malmvägen 1, 115 41, Stockholm
                </p>

                <div className="social-icons">
                   
                    <a href="mailto:regiftcompany@gmail.com" target="_blank" rel="noopener noreferrer">
                        <FaEnvelope size={30} />
                    </a>
                   
                </div>
            </div>
        </nav>
    );
}
