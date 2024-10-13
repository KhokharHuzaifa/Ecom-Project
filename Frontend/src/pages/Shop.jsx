import React from "react";
import ShopProducts from '../components/ShopProducts'
import SideBar from '../components/SideBar'
const Shop = () => {
  return (
    <>
      <div class="container-fluid">
        <div class="row px-xl-5">
          <div class="col-12">
            <nav class="breadcrumb bg-light mb-30">
              <a class="breadcrumb-item text-dark" href="#">
                Home
              </a>
              <a class="breadcrumb-item text-dark" href="#">
                Shop
              </a>
              <span class="breadcrumb-item active">Shop List</span>
            </nav>
          </div>
        </div>
      </div>

      <div class="row px-xl-5 px-md-4 px-sm-2">
        {/* Fitering SideBar */}
        <SideBar />

        {/* Shop Products */}
        <ShopProducts />
      </div>
    </>
  );
};

export default Shop;
