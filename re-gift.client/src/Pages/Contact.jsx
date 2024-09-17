import React from 'react';
import '../css/Contact.css'; // Import the updated CSS file
import { FaEnvelope } from 'react-icons/fa'; // Import mail icon

export function Contact() {
    return (
        <nav className="Contact">
            <div className="content-center">
                <h1 className="contact-title">Kontakta oss</h1>
                <p className="contact-lead">
                    Vi ser fram emot att höra från dig! Har du några frågor eller funderingar? Tveka inte att skicka oss ett mail.
                </p>

                <p className="contact-email">
                    <strong>Email:</strong> <a href="mailto:regiftcompany@gmail.com">regiftcompany@gmail.com</a>
                </p>

                <p className="contact-address">
                    <strong>Adress:</strong> Malmvägen 1, 115 41, Stockholm, Sverige
                </p>

                <div className="social-icons">
                    <a href="mailto:regiftcompany@gmail.com" target="_blank" rel="noopener noreferrer">
                        <FaEnvelope size={30} />
                    </a>
                </div>

                <div className="map-container">
                    <iframe
                        title="Google Map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2520.555663417943!2d18.081495215744997!3d59.345932981662134!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f9d6558f7e7e9%3A0x8b7d8d935d0a1d64!2sMalmv%C3%A4gen%201%2C%20115%2041%20Stockholm%2C%20Sweden!5e0!3m2!1sen!2sus!4v1636563965408!5m2!1sen!2sus"
                        width="600"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>
                </div>
            </div>
        </nav>
    );
}
