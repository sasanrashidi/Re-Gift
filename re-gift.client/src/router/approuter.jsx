
//import { Routes, Route } from "react-router-dom";
//import  Home  from '../Pages/Home';
//import { BuyGiftCard } from '../Pages/BuyGiftCard'; // Named import
//import { SellGiftCard } from '../Pages/SellGiftCard';
//import { Contact } from '../Pages/Contact';
//import { About } from '../Pages/About';

//import { Routes, Route } from "react-router-dom";
//import Home from '../Pages/Home';
//import { BuyGiftCard } from '../Pages/BuyGiftCard';
//import { SellGiftCard } from '../Pages/SellGiftCard';
//import { Contact } from '../Pages/Contact';
//import { About } from '../Pages/About';
//import { Marknad } from '../Pages/Marknad'; // Import Marknad
import { Routes, Route } from "react-router-dom";
import Home from '../Pages/Home';
import { BuyGiftCard } from '../Pages/BuyGiftCard';
import { SellGiftCard } from '../Pages/SellGiftCard';
import { Contact } from '../Pages/Contact';
import { About } from '../Pages/About';
import { Marknad } from '../Pages/Marknad'; // Import Marknad
import LoggaIn from '../Pages/LoggaIn';
import CartPage from '../Pages/CartPage'; // Import CartPage component
import FavoritesPage from '../Pages/FavoritesPage'; // Import FavoritesPage component

export function AppRouter() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/BuyGiftCard' element={<BuyGiftCard />} />
            <Route path='/SellGiftCard' element={<SellGiftCard />} />
            <Route path='/Contact' element={<Contact />} />
            <Route path='/About' element={<About />} />
            <Route path='/Marknad' element={<Marknad />} />
            <Route path='/login' element={<LoggaIn />} />
            <Route path='/cart' element={<CartPage />} /> {/* Cart Page Route */}
            <Route path='/favorites' element={<FavoritesPage />} /> {/* Favorites Page Route */}
        </Routes>
    );
}

