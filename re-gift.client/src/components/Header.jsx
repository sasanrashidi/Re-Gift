import React from 'react';
import regiftLogo from '../IMG/REGIFT.png'; // Anta att logotypen finns i denna mapp

function Header() {
    return (
        <header className="header">
            <img src={regiftLogo} alt="Logo" className="header-logo" />
        </header>
    );
}

export default Header;
