import React, { useEffect, useState } from "react";
import { useGetallproductQuery } from "../redux/Api/productApi";
import { Link, useParams } from "react-router-dom";
import { addToCart } from "../redux/features/cartSlice";
import { useDispatch } from "react-redux";

const ShopProducts = ({ price }) => {
  const { id } = useParams();
  const dispatch = useDispatch();  
  
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(3);
  const [totalPages, setTotalPages] = React.useState(0);
  const [product, setProduct] = useState([]);
  const { data, isLoading, error } = useGetallproductQuery({
    price,
    limit,
    page,
    category: id,
  });

  
  const products = data?.data || [];
  
  useEffect(() => {
    if (data) {
      setTotalPages(data.pages || 0);
    }
  }, [data]);
  
  const handleAddToCart = (prod) => {
    dispatch(addToCart(prod));
  };
  
  const handleLimitChange = (newLimit)=>{
    setLimit(newLimit)
    setPage(1)
  }
  
  const handlePageChange = (selectedPage) => {
    setPage(selectedPage);
  };
  
  if (isLoading) return <div style={{textAlign:"center",marginInline:"150px",fontWeight:"bolder"}}>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

 
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
                    Showing {limit}
                  </button>
                  <div class="dropdown-menu dropdown-menu-right">
                    <a class="dropdown-item" onClick={(e)=>{
                      e.preventDefault()
                      handleLimitChange(3)
                      }} href="#">
                      3
                    </a>
                    <a class="dropdown-item" onClick={(e)=>{
                      e.preventDefault()
                      handleLimitChange(6)
                      }} href="#">
                      6
                    </a>
                    <a class="dropdown-item" onClick={(e)=>{
                      e.preventDefault()
                      handleLimitChange(9)
                      }} href="#">
                      9
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* product card */}
          {products.map((prod) => (
            <div key={prod._id} class="col-lg-4 col-md-6 col-sm-6 pb-1">
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
                    <a
                      class="btn btn-outline-dark btn-square"
                      onClick={() => handleAddToCart(prod)}
                    >
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
                  <Link to={`/detail/${prod._id}`}
                    class="h6 text-decoration-none text-truncate"
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "block",
                      width: "100%",
                    }}
                  >
                    {prod.productName}
                  </Link>
                  <div class="d-flex align-items-center justify-content-center mt-2">
                    <h5>${prod.price}</h5>
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
          ))}

          {/* Pagination */}
          {totalPages > 1 && (
        <div className="my-4 d-flex justify-content-center">
          <nav>
            <ul className="pagination pagination-lg">
              <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                <button 
                  className="page-link" 
                  onClick={() => handlePageChange(page - 1)}
                >
                  &laquo;
                </button>
              </li>
              
              {[...Array(totalPages)].map((_, idx) => (
                <li 
                  key={idx} 
                  className={`page-item ${page === idx + 1 ? 'active' : ''}`}
                >
                  <button 
                    className="page-link" 
                    onClick={() => handlePageChange(idx + 1)}
                  >
                    {idx + 1}
                  </button>
                </li>
              ))}
              
              <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                <button 
                  className="page-link" 
                  onClick={() => handlePageChange(page + 1)}
                >
                  &raquo;
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
        </div>
      </div>
    </>
  );
};

export default ShopProducts;
