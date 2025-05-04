import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { useMakePaymentMutation } from "../redux/Api/PaymentApi";
import { useGetMeQuery } from "../redux/Api/authApi";
const Checkout = () => {
  const { cart } = useSelector((v) => v.cart);
  const [makePayment, { isLoading }] = useMakePaymentMutation();

  const { data } = useGetMeQuery();

  console.log("user data..........", data && data.user.email);

  const [total, setTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [shipping, setShipping] = useState(10);

  useEffect(() => {
    const calculateSubtotal = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setSubTotal(calculateSubtotal);
    setTotal(calculateSubtotal + shipping);
  }, [cart, shipping]);

  const handlePayment = async (cart) => {
    const stripe = await loadStripe(
      "pk_test_51QmGhxF1ftSQqMNIu4xQB6ytzdSvDoLqoN8tREUr1fp2J2hNRlbffXqfsHCB1M1jb9hcbWkrOt3TwqkwkZjwngTP00sUywGEla"
    );
    const sessionJob = await makePayment(cart).unwrap();

    const result = stripe.redirectToCheckout({
      sessionId: sessionJob.id,
    });

    if (result.error) {
      console.log("eeeeeeeeeeerrrrrrrrrrrrrooooooooorrrrrrrrr", result.error);
    }
  };

  const { handleChange, handleSubmit, values,setValues, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        fname: "",
        lname: "",
        email: "",
        phoneNo: "",
        address1: "",
        address2: "",
        country: "",
        city: "",
        state: "",
        zipCode: "",
      },
      validationSchema: Yup.object({
        address1: Yup.string()
          .max(300, "Minimum 300 required")
          .required("required"),
        address2: Yup.string()
          .max(300, "Maximium 300 required")
          .required("required"),
        country: Yup.string()
          .max(50, "Must be 50 character or less")
          .required("required"),
        city: Yup.string()
          .max(50, "Must be 50 character or less")
          .required("required"),
        state: Yup.string()
          .max(50, "Must be 50 character or less")
          .required("required"),
        zipCode: Yup.string()
          .max(20, "Must be 20 character or less")
          .required("required"),
      }),
      onSubmit: async (values) => {
        console.log("result........", values);
      },
    });

    useEffect(() => {
      if (data?.user) {
        setValues({
          ...values,
          fname: data.user.firstname || '',
          lname: data.user.lastname || '',
          email: data.user.email || '',
          phoneNo: data.user.phoneNumber || '',
        });
      }
    }, [data]);

  return (
    <>
      {/* <!-- Breadcrumb Start --> */}
      {/* <Breadcrumb/> */}
      {/* <!-- Breadcrumb End --> */}

      {/* <!-- Checkout Start --> */}
      <div className="container-fluid">
        <form onSubmit={handleSubmit}>
          <div className="row px-xl-5">
            <div className="col-lg-8">
              <h5 className="section-title position-relative text-uppercase mb-3">
                <span className="bg-secondary pr-3">Billing Address</span>
              </h5>
              <div className="bg-light p-30 mb-5">
                <div className="row">
                  <div className="col-md-6 form-group">
                    <label>First Name</label>
                    <input
                      className="form-control"
                      name="fname"
                      readOnly
                      value={values.fname}
                      type="text"
                    />
                  </div>
                  <div className="col-md-6 form-group">
                    <label>Last Name</label>
                    <input
                      className="form-control"
                      name="lname"
                      readOnly
                      value={values.lname}
                      type="text"
                    />
                  </div>
                  <div className="col-md-6 form-group">
                    <label>E-mail</label>
                    <input
                      className="form-control"
                      type="text"
                      readOnly
                      name="email"
                      value={values.email}
                    />
                  </div>
                  <div className="col-md-6 form-group">
                    <label>Mobile No</label>
                    <input
                      className="form-control"
                      type="text"
                      name="phoneNo"
                      readOnly
                      value={values.phoneNo}
                    />
                  </div>
                  <div className="col-md-6 form-group">
                    <label>Address Line 1</label>
                    <input
                      className="form-control"
                      type="text"
                      name="address1"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.address1}
                      placeholder="123 Street"
                    />
                    <span className="text-danger float-left ms-1 mt-2 mb-1">
                      {touched.address1 && errors.address1}
                    </span>
                  </div>
                  <div className="col-md-6 form-group">
                    <label>Address Line 2</label>
                    <input
                      className="form-control"
                      type="text"
                      name="address2"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.address2}
                      placeholder="123 Street"
                    />
                    <span className="text-danger float-left ms-1 mt-2 mb-1">
                      {touched.address2 && errors.address2}
                    </span>
                  </div>
                  <div className="col-md-6 form-group">
                    <label>Country</label>
                    <select
                      className="custom-select"
                      name="country"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.country}
                    >
                      <option selected>United States</option>
                      <option>Afghanistan</option>
                      <option>Albania</option>
                      <option>Algeria</option>
                    </select>
                    <span className="text-danger float-left ms-1 mt-2 mb-1">
                      {touched.country && errors.country}
                    </span>
                  </div>
                  <div className="col-md-6 form-group">
                    <label>City</label>
                    <input
                      className="form-control"
                      type="text"
                      name="city"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.city}
                      placeholder="New York"
                    />
                    <span className="text-danger float-left ms-1 mt-2 mb-1">
                      {touched.city && errors.city}
                    </span>
                  </div>
                  <div className="col-md-6 form-group">
                    <label>State</label>
                    <input
                      className="form-control"
                      type="text"
                      name="state"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.state}
                      placeholder="New York"
                    />
                    <span className="text-danger float-left ms-1 mt-2 mb-1">
                      {touched.state && errors.state}
                    </span>
                  </div>
                  <div className="col-md-6 form-group">
                    <label>ZIP Code</label>
                    <input
                      className="form-control"
                      type="text"
                      name="zipCode"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.zipCode}
                      placeholder="123"
                    />
                    <span className="text-danger float-left ms-1 mt-2 mb-1">
                      {touched.zipCode && errors.zipCode}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 mb-5">
              <h5 className="section-title position-relative text-uppercase mb-3">
                <span className="bg-secondary pr-3">Order Total</span>
              </h5>
              <form className="mb-30" action="">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control border-0 p-4"
                    placeholder="Coupon Code"
                  />
                  <div className="input-group-append">
                    <button className="btn btn-primary">Apply Coupon</button>
                  </div>
                </div>
              </form>
              <div className="bg-light p-30 mb-5">
                <div className="border-bottom">
                  <h6 className="mb-3">Products</h6>
                  {cart &&
                    cart.map((prod) => (
                      <div className="d-flex justify-content-between">
                        <p>
                          {prod.productName.length > 20
                            ? prod.productName.slice(0, 20) + "..."
                            : prod.productName}{" "}
                          * <strong>{prod.quantity}</strong>
                        </p>
                        <p>${prod.price * prod.quantity}</p>
                      </div>
                    ))}
                </div>
                <div className="border-bottom pt-3 pb-2">
                  <div className="d-flex justify-content-between mb-3">
                    <h6>Subtotal</h6>
                    <h6>${subTotal.toFixed(2)}</h6>
                  </div>
                  <div className="d-flex justify-content-between">
                    <h6 className="font-weight-medium">Shipping</h6>
                    <h6 className="font-weight-medium">$10</h6>
                  </div>
                </div>
                <div className="pt-2">
                  <div className="d-flex justify-content-between mt-2">
                    <h5>Total</h5>
                    <h5>${total.toFixed(2)}</h5>
                  </div>
                </div>
              </div>

              <h5 className="section-title position-relative text-uppercase mb-3">
                <span className="bg-secondary pr-3">Payment</span>
              </h5>
              <div className="bg-light p-30">
                <div className="form-group">
                  <div className="custom-control custom-radio">
                    <input
                      type="radio"
                      className="custom-control-input"
                      name="payment"
                      id="paypal"
                    />
                    <label className="custom-control-label" for="paypal">
                      Paypal
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <div className="custom-control custom-radio">
                    <input
                      type="radio"
                      className="custom-control-input"
                      name="payment"
                      id="directcheck"
                    />
                    <label className="custom-control-label" for="directcheck">
                      Direct Check
                    </label>
                  </div>
                </div>
                <div className="form-group mb-4">
                  <div className="custom-control custom-radio">
                    <input
                      type="radio"
                      className="custom-control-input"
                      name="payment"
                      id="banktransfer"
                    />
                    <label className="custom-control-label" for="banktransfer">
                      Bank Transfer
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-block btn-primary font-weight-bold py-3"
                  onClick={() => handlePayment(cart)}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      {/* <!-- Checkout End --> */}
    </>
  );
};

export default Checkout;
