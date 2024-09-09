import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export const FavoritesPage = () => {
    const { favorites, setFavorites } = useContext(AppContext);

    const removeFromFavorites = (itemId) => {
        setFavorites(favorites.filter(item => item.id !== itemId));
    };

    return (
        <div>
            <h1>Dina favoriter</h1>
            {favorites.length === 0 ? (
                <p>Din favoritlista är tom.</p>
            ) : (
                favorites.map(item => (
                    <div key={item.id}>
                        <img src={item.imgSrc} alt={item.title} style={{ width: '100px' }} />
                        <p>{item.title}</p>
                        <button onClick={() => removeFromFavorites(item.id)}>Ta bort</button>
                    </div>
                ))
            )}
        </div>
    );
};

export default FavoritesPage;
