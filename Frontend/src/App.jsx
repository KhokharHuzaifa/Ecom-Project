import React from 'react'
import Shop from './Pages/Shop'
import Cart from './Pages/Cart'
import Contact from './Pages/Contact'
import './App.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Checkout from './Pages/Checkout'
import Detail from './Pages/Detail'
import Home from './Pages/Home'



import Outletcomp from './Components/Outletcomp';
import Register from './Pages/Register';
import Login from './Pages/Login';

const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Outletcomp/>}>
        <Route path="/" element={<Home/>} />
        <Route path="/shop" element={<Shop/>} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>
    )
  );
  return (
    <>
    <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App;
