import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import ProductList from './components/productlist';
import CartPage from './pages/cart';
import { CartProvider } from './context/cartcontext';
import Checkout from './components/checkout';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <CartProvider>
          <Routes>
            <Route path="/productlist" element={<ProductList />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </CartProvider>
      </div>
    </Router>
  );
}

export default App;


