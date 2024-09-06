import React from 'react';
import { Link } from 'react-router-dom';

export function Marknad() {
    return (
        <div>
            <h1>Marknad</h1>
            <p>H�r kan du s�lja eller k�pa dina presentkort utifr�n dina behov.</p>
            <div className="options">
                <Link to="/BuyGiftCard" className="btn btn-primary">K�p</Link>
                <Link to="/SellGiftCard" className="btn btn-secondary">S�lj</Link>
            </div>
        </div>
    );
}
