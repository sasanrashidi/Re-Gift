﻿import React from 'react';
import { Link } from 'react-router-dom';


export function Sidebar (){
    return (
        <nav className="Sidebar">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/BuyGiftcard">BuyGiftCard</Link></li>
                <li><Link to="/SellGiftcard">SellGiftCard</Link></li>
                <li><Link to="/Contact">Contact</Link></li>
            </ul>
        </nav>
    );
};



