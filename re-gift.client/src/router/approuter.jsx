import React from 'react';
import { Routes, Route } from "react-router-dom";
import { Home } from '../Pages/Home';
import { BuyGiftCard } from '../Pages/BuyGiftCard'; // Named import
import { SellGiftCard } from '../Pages/SellGiftCard';
import { Contact } from '../Pages/Contact';
import { Sidebar } from '../Pages/Sidebar';

export function AppRouter() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/BuyGiftCard' element={<BuyGiftCard />} />
            <Route path='/SellGiftCard' element={<SellGiftCard />} />
            <Route path='/Contact' element={<Contact />} />
            <Route path='/Sidebar' element={<Sidebar />} />
        </Routes>
    );
}
