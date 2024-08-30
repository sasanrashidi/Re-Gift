import React from 'react';
import { Link } from 'react-router-dom';



const sidebar = () => {
    return (
        <nav classname="sidebar">
            <ul>
                <li><link to="/">hem</link></li>
                <li><link to="/sell-giftcard">sälj presentkort</link></li>
                <li><link to="/buy-giftcard">köp presentkort</link></li>
                <li><link to="/contact">kontakt</link></li>
            </ul>
        </nav>
    );
};

export default sidebar;