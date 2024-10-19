import React from "react";
import { Link } from "react-router-dom";
import { useGetMeQuery } from "../redux/Api/authApi";
import { useSelector } from "react-redux";

const SideNavigation = () => {
  const {data} = useGetMeQuery()
  const {user} = useSelector((v)=>v.auth)  

  return (
    <>
      <div class="col-lg-3 col-md-4 ">
        <h5 class="section-title position-relative text-uppercase mb-3">
          {
            user?.user?.roles === 'admin' ? <span class="bg-secondary pr-3">Admin DashBoard</span> :
            <span class="bg-secondary pr-3">User DashBoard</span>
          }
          
        </h5>
        <div class="bg-light p-4 mb-30">
          <div class="card" >
            <ul class="list-group list-group-flush">
            {
              user?.user?.roles === 'admin' ? 
              <>
              <Link to={'/admin/addcategory'}><li class="list-group-item">Add Category</li></Link>
              <Link to={'/admin/addProduct'}><li class="list-group-item">Add Product</li></Link>
              </> 
              : 
              <>
              <Link to={'/customer/checkout'}><li class="list-group-item">Checkout Details</li></Link>
              <Link to={'/customer/cart'}><li class="list-group-item">Cart Items</li></Link>
              
              </>
            }
              
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNavigation;
