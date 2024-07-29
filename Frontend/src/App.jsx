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
function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Outletcomp/>}>
        <Route path="/" element={<Home/>} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/checkout" element={<Checkout />} />
      </Route>
    )
  );
  return (
    <>
    <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
