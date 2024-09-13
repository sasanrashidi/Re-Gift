import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const AppContext = createContext();

// Provide the context to the components
export const AppProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem('favorites');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });

    const [giftCards, setGiftCards] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchGiftCards();
    }, []); // Fetch on initial load

    // Function to fetch and update gift cards
    const fetchGiftCards = async () => {
        try {
            const response = await fetch("https://localhost:7049/api/Giftcard");
            const data = await response.json();
            const formattedData = data.map(card => ({
                ...card,
                expireDate: new Date(card.expireDate).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })
            }));
            setGiftCards(formattedData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    return (
        <AppContext.Provider value={{ cart, setCart, favorites, setFavorites, user, setUser, giftCards, fetchGiftCards }}>
            {children}
        </AppContext.Provider>
    );
};