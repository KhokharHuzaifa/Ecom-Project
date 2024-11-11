import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Decreament, Increament, removeFromCart } from "../redux/features/cartSlice";

const CartProducts = () => {
  const { cart } = useSelector((v) => v.cart);
  const dispatch = useDispatch()

  const handleDelete = (product)=>{
    dispatch(removeFromCart(product))
}

const handleIncreament = (quantity)=>{
  dispatch(Increament(quantity))
}
const handledecreament = (quantity)=>{
  dispatch(Decreament(quantity))
}
  return (
    <>
      <div className="col-lg-8 table-responsive mb-5">
      {cart && cart.length === 0 ? <h1 style={{textAlign:"center",marginBlock:"200px"}}>No Item is Added</h1> : <table className="table table-light table-borderless table-hover text-center mb-0">
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
                      >
                      <div className="input-group-btn">
                        <button className="btn btn-sm btn-primary btn-minus"  disabled={prod.quantity == 1 ? true : false} onClick={()=>handledecreament(prod)}>
                          <i className="fa fa-minus"></i>
                        </button>
                      </div>
                      <input
                        type="text"
                        style={{ width: "500px;" }}
                        className="form-control form-control-sm bg-secondary border-0 text-center"
                        value={prod.quantity}
                      />
                      <div className="input-group-btn">
                        <button className="btn btn-sm btn-primary btn-plus" onClick={()=>handleIncreament(prod)}>
                          <i className="fa fa-plus"></i>
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="align-middle">${(prod.quantity * prod.price).toFixed(2)}</td>
                  <td className="align-middle">
                    <button className="btn btn-sm btn-danger" onClick={()=>handleDelete(prod)}>
                      <i className="fa fa-times"></i>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>}
        
      </div>
    </>
  );
};

export default CartProducts;
