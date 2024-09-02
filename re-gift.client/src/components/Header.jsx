import React from 'react';
import './Header.css';
import regiftLogo from '../IMG/REGIFT.png';  // Uppdaterad s�kv�g till den nya bilden

export function Header() {
    return (
        <header className="header">
            <img src={regiftLogo} alt="Logo" className="header-logo" />
        </header>
    );
}