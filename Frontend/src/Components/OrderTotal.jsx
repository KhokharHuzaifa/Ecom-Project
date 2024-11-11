import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const OrderTotal = () => {
    const {cart} = useSelector((v)=>v.cart)
    const [subTotal,setSubTotal] = useState(0)
    const [Total,setTotal] = useState(0)
    const [Shipping,setShipping] = useState(160)

    useEffect(()=>{
        const calculateSubTotal = cart.reduce((acc,item)=>acc + item.quantity * item.price,0)
        setSubTotal(calculateSubTotal)
        const calculateTotal = calculateSubTotal + Shipping
        setTotal(calculateTotal)
    },[cart,Shipping])

  return (
    <>
            <div className="col-lg-4">
                <form className="mb-30" action="">
                    <div className="input-group">
                        <input type="text" className="form-control border-0 p-4" placeholder="Coupon Code"/>
                        <div className="input-group-append">
                            <button className="btn btn-primary">Apply Coupon</button>
                        </div>
                    </div>
                </form>
                <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Cart Summary</span></h5>
                <div className="bg-light p-30 mb-5">
                    <div className="border-bottom pb-2">
                        <div className="d-flex justify-content-between mb-3">
                            <h6>Subtotal</h6>
                            <h6>${subTotal.toFixed(2)}</h6>
                        </div>
                        <div className="d-flex justify-content-between">
                            <h6 className="font-weight-medium">Shipping</h6>
                            <h6 className="font-weight-medium">${Shipping}</h6>
                        </div>
                    </div>
                    <div className="pt-2">
                        <div className="d-flex justify-content-between mt-2">
                            <h5>Total</h5>
                            <h5>${Total.toFixed(2)}</h5>
                        </div>
                        <Link to={'/checkout'}><button className="btn btn-block btn-primary font-weight-bold my-3 py-3">Proceed To Checkout</button></Link>
                    </div>
                </div>
            </div>  
    </>
  )
}

export default OrderTotal
