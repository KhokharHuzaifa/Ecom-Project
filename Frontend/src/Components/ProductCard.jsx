import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../redux/features/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()

  const handleAddToCart = (prod)=>{
    dispatch(addToCart(prod))
  }
  return (
    <>
      <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
        <div className="product-item bg-light mb-4">
          <div
            className="product-img position-relative overflow-hidden"
            style={{
              height: "200px",
              overflow: "hidden",
            }}
          >
            <img
              className="img-fluid w-100"
              src={product.productImage}
              alt=""
              style={{
                height: "100%",
                objectFit: "cover",
              }}
            />
            <div className="product-action">
              <a className="btn btn-outline-dark btn-square" onClick={()=>handleAddToCart(product)}>
                <i className="fa fa-shopping-cart " ></i>
              </a>
              <a className="btn btn-outline-dark btn-square" >
                <i className="far fa-heart"></i>
              </a>
              <a className="btn btn-outline-dark btn-square" >
                <i className="fa fa-sync-alt"></i>
              </a>
              <a className="btn btn-outline-dark btn-square">
                <i className="fa fa-search"></i>
              </a>
            </div>
          </div>
          <div className="text-center py-4">
            <Link to={`/detail/${product._id}`}
              className="h6 text-decoration-none text-truncate"
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "block",
                width: "100%",
              }}
            >
              {product.productName}
            </Link>
            <div className="d-flex align-items-center justify-content-center mt-2">
              <h5>${product.price}</h5>
              <h6 className="text-muted ml-2">
                <del>${123.0}</del>
              </h6>
            </div>
            <div className="d-flex align-items-center justify-content-center mb-1">
              <small className="fa fa-star text-primary mr-1"></small>
              <small className="fa fa-star text-primary mr-1"></small>
              <small className="fa fa-star text-primary mr-1"></small>
              <small className="fa fa-star text-primary mr-1"></small>
              <small className="fa fa-star text-primary mr-1"></small>
              <small>(99)</small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
