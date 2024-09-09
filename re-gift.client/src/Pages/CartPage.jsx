import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export const CartPage = () => {
    const { cart, setCart } = useContext(AppContext);

    const removeFromCart = (itemId) => {
        setCart(cart.filter(item => item.id !== itemId));
    };

    return (
        <div>
            <h1>Din varukorg</h1>
            {cart.length === 0 ? (
                <p>Din varukorg är tom.</p>
            ) : (
                cart.map(item => (
                    <div key={item.id}>
                        <img src={item.imgSrc} alt={item.title} style={{ width: '100px' }} />
                        <p>{item.title}</p>
                        <button onClick={() => removeFromCart(item.id)}>Ta bort</button>
                    </div>
                ))
            )}
        </div>
    );
};

export default CartPage;
