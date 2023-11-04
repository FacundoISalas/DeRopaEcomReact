import React, { createContext, useState, useContext, useReducer, useEffect } from 'react'; // eslint-disable-line

const initialCartState = {
  cartItems: [],
};

const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const REMOVE_ALL_ITEMS = 'REMOVE_ALL_ITEMS';
const CART_STORAGE_KEY = 'cartData';

const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const itemIndex = state.cartItems.findIndex((item) => item.itemName === action.payload.itemName); // eslint-disable-line
      if (itemIndex !== -1) {
        if (action.payload.quantity >= 1) {
          const updatedCartItems = [...state.cartItems];
          updatedCartItems[itemIndex] = {
            ...updatedCartItems[itemIndex],
            quantity: updatedCartItems[itemIndex].quantity + action.payload.quantity,
          };
          return {
            ...state,
            cartItems: updatedCartItems,
          };
        }
      } else {
        if (action.payload.quantity >= 1) {
          return {
            ...state,
            cartItems: [...state.cartItems, action.payload],
          };
        }
      }
      return state;
    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.itemName !== action.payload.itemName),
      };
    case REMOVE_ALL_ITEMS:
    return {
      ...state,
      cartItems: [],
    };
    
    default:
      return state;
  }
};

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const storedCartData = JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || initialCartState;

  
  const [state, dispatch] = useReducer(cartReducer, storedCartData);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
  }, [state])
  
  const addToCart = (item) => {
    dispatch({ type: ADD_TO_CART, payload: item });
  };

  const resetCart = () => {
    dispatch({ type: REMOVE_ALL_ITEMS });
  };
  
  const removeFromCart = (item) => {
    dispatch({ type: REMOVE_FROM_CART, payload: item });
  };

  return (
    <CartContext.Provider
      value={{ cartItems: state.cartItems, addToCart, removeFromCart, resetCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
