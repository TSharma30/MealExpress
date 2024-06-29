import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/navbar/Navbar'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from "./pages/Home/Home.jsx"
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder.jsx"
import Cart from "./pages/Cart/Cart.jsx"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="app">
      <Navbar/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/order" element={<PlaceOrder/>}></Route>
          <Route path="/cart" element={<Cart/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
    </>
  )
}

export default App
