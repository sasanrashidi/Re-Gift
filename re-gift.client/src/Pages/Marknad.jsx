import React from 'react';
import { Link } from 'react-router-dom';

export function Marknad() {
    return (
        <div>
            <h1>Marknad</h1>
            <p>Här kan du sälja eller köpa dina presentkort utifrån dina behov.</p>
            <div className="options">
                <Link to="/BuyGiftCard" className="btn btn-primary">Köp</Link>
                <Link to="/SellGiftCard" className="btn btn-secondary">Sälj</Link>
            </div>
        </div>
    );
}
