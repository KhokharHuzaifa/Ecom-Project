import React from 'react'
import Shop from './pages/Shop'
import Cart from './pages/Cart'
import Contact from './pages/Contact'
import './App.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Checkout from './pages/Checkout'
import Detail from './pages/Detail'
import Home from './pages/Home'

import Outletcomp from './components/Outletcomp'
import Register from './pages/Register'
import Login from './pages/Login'

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
