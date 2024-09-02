import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Sidebar from './components/Sidebar';
import './App.css';
import Marketplace from './components/Marketplace';
import SellGiftCard from './components/SellGiftCard';
import BuyGiftCard from './components/BuyGiftCard';
import Contact from './components/Contact';
import Header from './components/Header';

function App() {
    return (
        <Router>
            <Header />
            <div className="app-container">
                <Sidebar /> {/* Lägg till Sidebar-komponenten här */}
                <div className="content-container"> {/* Fixade stavfelet */}
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
}

export default App;


//const App = () => {
//    return (
//        <Router>
//            <Header> {/*Lägg till header här*/}
//            <div className="app-container">
//                <Sidebar />
//                <div className="content-container">
//                    <Routes>
//                        <Route path="/" element={<Home />} />
//                        <Route path="/marketplace" element={<Marketplace />} />

//                        <Route path="/sell-giftcard" element={<SellGiftCard />} />
//                        <Route path="/buy-giftcard" element={<BuyGiftCard />} />
//                        <Route path="/contact" element={<Contact />} />
//                    </Routes>
//                </div>
//            </div>
//        </Router>
//    );
//};

