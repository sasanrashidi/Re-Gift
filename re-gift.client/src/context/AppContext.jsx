import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const AppContext = createContext();

// Provide the context to the components
export const AppProvider = ({ children }) => {
    // Retrieve cart and favorites from localStorage (or set to empty arrays if not found)
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem('favorites');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });

    const [user, setUser] = useState(null);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // Save favorites to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    return (
        <AppContext.Provider value={{ cart, setCart, favorites, setFavorites,user, setUser }}>
            {children}
        </AppContext.Provider>
    );
};
