import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { CartProvider } from './contexts/CartContext.jsx'
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBi-fl2UwUVT17be2T4jx6Gv8k2kZ1Fr20",
  authDomain: "ecomreactfacsalas.firebaseapp.com",
  projectId: "ecomreactfacsalas",
  storageBucket: "ecomreactfacsalas.appspot.com",
  messagingSenderId: "281276654210",
  appId: "1:281276654210:web:5762dbfc3c6f1d5588ca9b"
};

initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>,
)
