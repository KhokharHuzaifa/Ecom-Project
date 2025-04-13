import React from "react";
import Carousel from "../components/Carousel";
import Vendor from "../components/Vendor";
import { useGetallcategoryQuery } from "../redux/Api/categoryApi";
import ProductCard from "../components/ProductCard";
import { useGetallproductQuery } from "../redux/Api/productApi";
import { Link } from "react-router-dom";
const Home = () => {
  const { data: category } = useGetallcategoryQuery();
  const { data: Products } = useGetallproductQuery();

  return (
    <>
      {/* <!-- Carousel Start --> */}
      <Carousel />
      {/* <!-- Carousel End --> */}

      {/* <!-- Featured Start --> */}
      <div className="container-fluid pt-5">
        <div className="row px-xl-5 pb-3">
          <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
            <div
              className="d-flex align-items-center bg-light mb-4"
              style={{ padding: "30px" }}
            >
              <h1 className="fa fa-check text-primary m-0 mr-3"></h1>
              <h5 className="font-weight-semi-bold m-0">Quality Product</h5>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
            <div
              className="d-flex align-items-center bg-light mb-4"
              style={{ padding: "30px" }}
            >
              <h1 className="fa fa-shipping-fast text-primary m-0 mr-2"></h1>
              <h5 className="font-weight-semi-bold m-0">Free Shipping</h5>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
            <div
              className="d-flex align-items-center bg-light mb-4"
              style={{ padding: "30px" }}
            >
              <h1 className="fas fa-exchange-alt text-primary m-0 mr-3"></h1>
              <h5 className="font-weight-semi-bold m-0">14-Day Return</h5>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
            <div
              className="d-flex align-items-center bg-light mb-4"
              style={{ padding: "30px" }}
            >
              <h1 className="fa fa-phone-volume text-primary m-0 mr-3"></h1>
              <h5 className="font-weight-semi-bold m-0">24/7 Support</h5>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Featured End --> */}

      {/* <!-- Categories Start --> */}
      <div className="container-fluid pt-5">
        <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
          <span className="bg-secondary pr-3">Categories</span>
        </h2>
        <div className="row px-xl-5 pb-3">
          {category &&
            category.map((cat) => (
              <div className="col-lg-3 col-md-4 col-sm-6 pb-1" id={cat._id}>
                <Link to={`/shop/${cat._id}`} className="text-decoration-none">
                  <div className="cat-item d-flex align-items-center mb-4">
                    <div
                      className="overflow-hidden"
                      style={{ width: "100px", height: "100px" }}
                    >
                      <img className="img-fluid" src={cat.categoryImg} alt="" />
                    </div>
                    <div className="flex-fill pl-3">
                      <h6>{cat.categoryName}</h6>
                      <small className="text-body">
                        {cat.products.length > 0 ? cat.products.length : "No"}{" "}
                        Products
                      </small>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
      {/* <!-- Categories End --> */}

      {/* <!-- Products Start --> */}
      <div className="container-fluid pt-5 pb-3">
        <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
          <span className="bg-secondary pr-3">Featured Products</span>
        </h2>
        <div className="row px-xl-5">
          {Products?.data
            ?.filter((p) => p.isFeatured === true)
            .map((prod) => (
              // console.log(prod.isFeatured === true)
              <ProductCard key={prod.id} product={prod} />
            ))}
        </div>
      </div>
      {/* <!-- Products End --> */}

      {/* <!-- Offer Start --> */}
      <div className="container-fluid pt-5 pb-3">
        <div className="row px-xl-5">
          <div className="col-md-6">
            <div className="product-offer mb-30" style={{ height: "300px" }}>
              <img className="img-fluid" src="img/offer-1.jpg" alt="" />
              <div className="offer-text">
                <h6 className="text-white text-uppercase">Save 20%</h6>
                <h3 className="text-white mb-3">Special Offer</h3>
                <a href="" className="btn btn-primary">
                  Shop Now
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="product-offer mb-30" style={{ height: "300px" }}>
              <img className="img-fluid" src="img/offer-2.jpg" alt="" />
              <div className="offer-text">
                <h6 className="text-white text-uppercase">Save 20%</h6>
                <h3 className="text-white mb-3">Special Offer</h3>
                <a href="" className="btn btn-primary">
                  Shop Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Offer End --> */}

      {/* <!-- Products Start --> */}
      <div className="container-fluid pt-5 pb-3">
        <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
          <span className="bg-secondary pr-3">Recent Products</span>
        </h2>
        <div className="row px-xl-5">
        {Products?.data
            
            .map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
         
        </div>
      </div>
      {/* <!-- Products End --> */}

      {/* <!-- Vendor Start --> */}
      <Vendor />
      {/* <!-- Vendor End --> */}
    </>
  );
};

export default Home;
