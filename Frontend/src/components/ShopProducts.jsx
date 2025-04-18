import React, { useEffect, useState } from "react";
import { useGetallproductQuery } from "../redux/Api/productApi";
import { useParams } from "react-router-dom";
import { addToCart } from "../redux/features/cartSlice";
import { useDispatch } from "react-redux";

const ShopProducts = ({price}) => {

  
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(4);
  const [totalPages, setTotalPages] = React.useState(0);
  const [product,setProduct] = useState([])
  



  const { id } = useParams();
  // const category
  const { data, isLoading, error } = useGetallproductQuery({price,limit,page,category:id});
  const dispatch = useDispatch()

  console.log("data mens category..............",data && data.data);
  

  useEffect(() => {
    if (data && data.data) {
      setProduct(data.data)
      setTotalPages(data?.pages);
    }
  }, [data,page,limit]);

  const handleAddToCart = (prod)=>{
      dispatch(addToCart(prod))
    }


  return (
    <>
      <div class="col-lg-9 col-md-8 ">
        <div class="row pb-3">
          <div class="col-12 pb-1">
            <div class="d-flex align-items-center justify-content-between mb-4">
              <div>
                <button class="btn btn-sm btn-light">
                  <i class="fa fa-th-large"></i>
                </button>
                <button class="btn btn-sm btn-light ml-2">
                  <i class="fa fa-bars"></i>
                </button>
              </div>
              <div class="ml-2">
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-sm btn-light dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    Sorting
                  </button>
                  <div class="dropdown-menu dropdown-menu-right">
                    <a class="dropdown-item" href="#">
                      Latest
                    </a>
                    <a class="dropdown-item" href="#">
                      Popularity
                    </a>
                    <a class="dropdown-item" href="#">
                      Best Rating
                    </a>
                  </div>
                </div>
                <div class="btn-group ml-2">
                  <button
                    type="button"
                    class="btn btn-sm btn-light dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    Showing
                  </button>
                  <div class="dropdown-menu dropdown-menu-right">
                    <a class="dropdown-item" href="#">
                      10
                    </a>
                    <a class="dropdown-item" href="#">
                      20
                    </a>
                    <a class="dropdown-item" href="#">
                      30
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* product card */}
        {product.map((prod) => (
          <div class="col-lg-4 col-md-6 col-sm-6 pb-1">
            <div class="product-item bg-light mb-4">
              <div class="product-img position-relative overflow-hidden">
                <img
                  class="img-fluid w-100"
                  style={{
                    height: "100%",
                    height: "250px",
                    objectFit: "cover",
                  }}
                  src={prod.productImage}
                  alt="product image"
                />
                <div class="product-action">
                  <a class="btn btn-outline-dark btn-square" onClick={()=>handleAddToCart(prod)}>
                    <i class="fa fa-shopping-cart"></i>
                  </a>
                  <a class="btn btn-outline-dark btn-square" href="">
                    <i class="far fa-heart"></i>
                  </a>
                  <a class="btn btn-outline-dark btn-square" href="">
                    <i class="fa fa-sync-alt"></i>
                  </a>
                  <a class="btn btn-outline-dark btn-square" href="">
                    <i class="fa fa-search"></i>
                  </a>
                </div>
              </div>
              <div class="text-center py-4">
                <a
                  class="h6 text-decoration-none text-truncate"
                  href=""
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "block",
                    width: "100%",
                  }}
                >
                  {prod.productName}
                </a>
                <div class="d-flex align-items-center justify-content-center mt-2">
                  <h5>${prod.price}</h5>
                  {/* <h6 class="text-muted ml-2">
                    <del>$123.00</del>
                  </h6> */}
                </div>
                <div class="d-flex align-items-center justify-content-center mb-1">
                  <small class="fa fa-star text-primary mr-1"></small>
                  <small class="fa fa-star text-primary mr-1"></small>
                  <small class="fa fa-star text-primary mr-1"></small>
                  <small class="fa fa-star text-primary mr-1"></small>
                  <small class="fa fa-star text-primary mr-1"></small>
                  <small>(99)</small>
                </div>
              </div>
            </div>
          </div>
        ))
      }

          {/* Pagination */}
          <div class="col-12">
            <nav>
              <ul class="pagination justify-content-center">
                <li class="page-item disabled">
                  <a class="page-link" href="#">
                    Previous
                  </a>
                </li>
                <li class="page-item active">
                  <a class="page-link" href="#">
                    1
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    2
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    3
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopProducts;
