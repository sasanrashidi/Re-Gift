import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <nav className="sidebar">
            <div className="sidebar-header">
                Re:Gift
            </div>
            <ul>
                <li><Link to="/">Hem</Link></li>
                <li><Link to="/sell-giftcard">Sälj Presentkort</Link></li>
                <li><Link to="/buy-giftcard">Köp Presentkort</Link></li>
                <li><Link to="/contact">Kontakt</Link></li>
            </ul>
            <div className="sidebar-footer">
                © 2024 Re:Gift
            </div>
        </nav>
    );
};

export default Sidebar;
