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
import Admin from './Layout/Admin'
import Customer from './Layout/Customer'
import { useSelector } from 'react-redux'
import AddNewProduct from './pages/AddNewProduct'
import AddCategory from './pages/AddCategory'

const App = () => {
  const {isAuthenticated} = useSelector((v)=>v.auth)
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Outletcomp/>}>
        <Route path="/" element={<Home/>} />
        <Route path="/shop" element={<Shop/>} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/register" element={isAuthenticated ? <Home/> : <Register />} />
        <Route path="/login" element={isAuthenticated ? null : <Login />} />

      {/* Admin Routes */}

          <Route path='/admin' element={<Admin role='admin'/>}>
            <Route path='/admin/addProduct' element={<AddNewProduct/>}/>
            <Route path='/admin/addcategory' element={<AddCategory/>}/>
          </Route>

      {/* Customer Routes */}

          <Route path='/customer' element={<Customer role='customer'/>}>
            <Route path="/customer/checkout" element={<Checkout />} />
            <Route path="/customer/cart" element={<Cart />} />
          </Route>

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
