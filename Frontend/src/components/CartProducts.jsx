import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../redux/features/cartSlice";

const CartProducts = () => {
  const { cart } = useSelector((v) => v.cart);
  const dispatch = useDispatch()

  const handleDelete = (product)=>{
    dispatch(removeFromCart(product))
}
  return (
    <>
      <div className="col-lg-8 table-responsive mb-5">
        <table className="table table-light table-borderless table-hover text-center mb-0">
          <thead className="thead-dark">
            <tr>
              <th>Products</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody className="align-middle">
            {cart &&
              cart.map((prod) => (
                <tr>
                  <td
                    className="align-middle"
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "block",
                      // width: "100%",
                    }}
                  >
                    <img
                      src={prod.productImage}
                      alt=""
                      style={{ width: "70px;", height: "70px" }}
                    />
                    {prod.productName.length > 20 ? prod.productName.slice(0, 20) + '...' : prod.productName}
                  </td>
                  <td className="align-middle">${prod.price}</td>
                  <td className="align-middle col-lg-2">
                    <div
                      className="input-group quantity mx-auto"
                      style={{ width: "100px;" }}
                    >
                      <div className="input-group-btn">
                        <button className="btn btn-sm btn-primary btn-minus">
                          <i className="fa fa-minus"></i>
                        </button>
                      </div>
                      <input
                        type="text"
                        className="form-control form-control-sm bg-secondary border-0 text-center"
                        value="1"
                      />
                      <div className="input-group-btn">
                        <button className="btn btn-sm btn-primary btn-plus">
                          <i className="fa fa-plus"></i>
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="align-middle">$150</td>
                  <td className="align-middle">
                    <button className="btn btn-sm btn-danger" onClick={()=>handleDelete(prod)}>
                      <i className="fa fa-times"></i>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CartProducts;
