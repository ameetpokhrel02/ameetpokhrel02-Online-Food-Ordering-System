import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../types/product'; // Import the shared Product interface

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  decreaseQuantity: (productId: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    if (!product || typeof product.id !== 'number' || isNaN(Number(product.price))) {
      console.warn('[CartContext] Invalid product passed to addToCart:', product);
      alert('Cannot add this product to cart. Product data is invalid.');
      return;
    }
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

   const clearCart = () => {
     setCartItems([]);
   };

   const getCartTotal = () => {
     return cartItems.reduce((total, item) => total + (Number(item.price) * item.quantity), 0);
   };

  const decreaseQuantity = (productId: number) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === productId);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          return prevItems.map(item =>
            item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
          );
        } else {
          return prevItems.filter(item => item.id !== productId);
        }
      }
      return prevItems;
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, getCartTotal, decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 