import React, { createContext, useContext, useState, useEffect } from 'react';

// Oprettelse af context
const CartContext = createContext();

//Oprettelser af hook for "cart context"
export const useCart = () => useContext(CartContext);

//Oprettelser af provider component
export const CartProvider = ({ children }) => {
  // Gemmer drinks i cart, hvis jeg forlader eller reloader siden.
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Funktion til at udregne den samlede pris for alle drinks
  const calculateItemTotalPrice = (item) => item.price * item.quantity;

  // Effekt til at ændre på prisen, når der ændres på totale drinks
  useEffect(() => {
    const updatedCart = cart.map(item => ({
      ...item,
      totalPrice: calculateItemTotalPrice(item)
    }));
    setCart(updatedCart);
  }, [cart]);

  // Effect til at opdater localstorage, når der sker kurv ændringer
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Funktion til at tilføje drinks til kurv
  const addToCart = (item) => {
    const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);
    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      updatedCart[existingItemIndex].totalPrice = calculateItemTotalPrice(updatedCart[existingItemIndex]);
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...item, quantity: 1, totalPrice: calculateItemTotalPrice(item) }]);
    }
  };

  // Funktion til at fjerne drinken fra kurv
  const removeFromCart = (itemId) => {
    const updatedCart = cart.filter(item => item.id !== itemId);
    setCart(updatedCart);
  };

  // Funktion til at tilføje flere drinks
  const incrementQuantity = (itemId) => {
    const updatedCart = cart.map(item => {
      if (item.id === itemId) {
        const updatedItem = { ...item, quantity: item.quantity + 1 };
        updatedItem.totalPrice = calculateItemTotalPrice(updatedItem);
        return updatedItem;
      }
      return item;
    });
    setCart(updatedCart);
  };

  // Funktion til at fjerne et produkt
  const decrementQuantity = (itemId) => {
    const updatedCart = cart.map(item => {
      if (item.id === itemId && item.quantity > 1) {
        const updatedItem = { ...item, quantity: item.quantity - 1 };
        updatedItem.totalPrice = calculateItemTotalPrice(updatedItem);
        return updatedItem;
      }
      return item;
    });
    setCart(updatedCart);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity
  };
  
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};





