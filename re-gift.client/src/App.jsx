import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Sidebar from './components/Sidebar';
import './App.css';
import Marketplace from './components/Marketplace';
import SellGiftCard from './components/SellGiftCard';
import BuyGiftCard from './components/BuyGiftCard';
import Contact from './components/Contact';

const App = () => {
    return (
        <Router>
            <div className="app-container">
                <Sidebar />
                <div className="content-container">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/marketplace" element={<Marketplace />} />

                        <Route path="/sell-giftcard" element={<SellGiftCard />} />
                        <Route path="/buy-giftcard" element={<BuyGiftCard />} />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;