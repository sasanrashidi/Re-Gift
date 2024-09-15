import React from 'react';
import '../css/Contact.css';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

export function Contact() {
    return (
        <nav className="Contact">
            <div className="content-center">
                <h1 className="contact-title">Kontakta oss</h1>

                <p className="contact-lead">
                    Fyll i formuläret nedan eller följ oss på sociala medier för mer information!
                </p>

                <form className="contact-form">
                    <div className="form-group">
                        <label htmlFor="name">Namn</label>
                        <input type="text" id="name" placeholder="Ditt namn" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">E-post</label>
                        <input type="email" id="email" placeholder="Din e-post" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Meddelande</label>
                        <textarea id="message" rows="5" placeholder="Skriv ditt meddelande här"></textarea>
                    </div>
                    <button type="submit" className="submit-btn">Skicka</button>
                </form>

                <div className="contact-info">
                    <p>Tel: +46 70582569</p>
                    <p>Email: regift@gmail.com</p>
                    <p>Malmvägen 1, 115 41, Stockholm</p>
                </div>

                <div className="map">
                    <iframe
                        title="map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1985.682009719293!2d18.068580316001317!3d59.32932367951896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f77ebcbf9f2a9%3A0x48b0b49b1a2f5d7!2sMalmv%C3%A4gen%201%2C%20115%2041%20Stockholm!5e0!3m2!1ssv!2sse!4v1638301844982!5m2!1ssv!2sse"
                        width="100%"
                        height="300"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>
                </div>

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
