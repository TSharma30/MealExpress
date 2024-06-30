import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './pages/Home/Home';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Cart from './pages/Cart/Cart';
import './App.css'; // Adjusted path if necessary
import Footer from './components/Footer/Footer';
import LoginPopup from "./components/LoginPopup/LoginPopup"
import Cursor from './components/Cursor/Cursor';

function App() {
  const [showLogin,setShowLogin] = useState(false);

  return (
    <>
    <Cursor/>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className="app">
      <Navbar setShowLogin={setShowLogin}/>
    
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer/>
      
    </div>
    </>
  );
}

export default App;
