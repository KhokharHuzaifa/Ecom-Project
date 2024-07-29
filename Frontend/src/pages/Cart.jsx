import React from "react";
import Checkout from "../components/Checkout";
import CartProducts from "../components/CartProducts";

const Cart = () => {
  return (
    <div>
      {/* breadcrum */}
      <div className="container-fluid">
        <div className="row px-xl-5">
          <div className="col-12">
            <nav className="breadcrumb bg-light mb-30">
              <a className="breadcrumb-item text-dark" href="#">
                Home
              </a>
              <a className="breadcrumb-item text-dark" href="#">
                Shop
              </a>
              <span className="breadcrumb-item active">Shopping Cart</span>
            </nav>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row px-xl-5">
          <CartProducts />
          <Checkout />
        </div>
      </div>
    </div>
  );
};

export default Cart;
