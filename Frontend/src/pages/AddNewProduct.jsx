import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Breadcrumb from "../components/Breadcrumb";
import { useCreateProductMutation } from "../redux/Api/productApi";
import { useGetallcategoryQuery } from "../redux/Api/categoryApi";

const AddNewProduct = () => {
  const [preview, setPreview] = useState(undefined);
  const [createProduct] = useCreateProductMutation()
  const {data} = useGetallcategoryQuery()
  console.log("data",data);
  

  const formik = useFormik({
    initialValues: {
      productName: '',
      price: '',
      category: '',
      description: '',
      productImage: '',
    },
    validationSchema: yup.object({
      productName: yup.string().required("Product name is required"),
      price: yup.number().required("Price is required").positive("Price must be a positive number"),
      category: yup.string().required("Category is required"),
      description: yup.string().required("Description is required"),
      productImage: yup.string().required("Product image is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      console.log("Form Data:", values);
      const res = await createProduct(values)
      console.log("Response............",res);
      
      setSubmitting(false);
    },
  });

  const handleImgChange = (e) => {
    const read = new FileReader();
    read.onload = () => {
      if (read.readyState === 2) {
        formik.setFieldValue("productImage", read.result);
        setPreview(read.result);
      }
    };
    read.readAsDataURL(e.target.files[0]);
  };


  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'DashBoard', path: '/admin' },
    { label: 'Admin', path: '/admin' },
    { label: 'Add Product', path: '/shop/add-product' },
  ]

  return (
    <>
      {/* Breadcrumbs */}
      {/* <Breadcrumb items={breadcrumbItems}/> */}

      <div className="container-fluid">
        <div className="col-lg-12 mb-5 px-xl-5">
          <div className="contact-form bg-light p-30">
            <h1 style={{ marginBottom: "20px" }}>Add New Product</h1>
            <div id="success"></div>
            <form name="sentMessage" id="contactForm" noValidate onSubmit={formik.handleSubmit}>
              <div className="control-group">
                <input
                  type="text"
                  className="form-control"
                  id="productname"
                  placeholder="Product Name"
                  name="productName"
                  value={formik.values.productName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.productName && formik.errors.productName ? (
                  <p className=" text-danger">{formik.errors.productName}</p>
                ) : null}
              </div>
              
              <div className="control-group my-3">
                <input
                  type="text"
                  className="form-control"
                  id="price"
                  placeholder="Product Price"
                  name="price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.price && formik.errors.price ? (
                  <p className="help-block text-danger">{formik.errors.price}</p>
                ) : null}
              </div>
              
              <div className="control-group my-3">
                <select
                  className="form-select"
                  name="category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="">Select Category</option>

                  {data?.data.map((cat)=>(
                    <option value={cat._id}>{cat.categoryName}</option>
                  ))}
                </select>
                {formik.touched.category && formik.errors.category ? (
                  <p className="help-block text-danger">{formik.errors.category}</p>
                ) : null}
              </div>
              
              <div className="control-group">
                <textarea
                  className="form-control"
                  rows="4"
                  id="message"
                  placeholder="Description"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                ></textarea>
                {formik.touched.description && formik.errors.description ? (
                  <p className=" text-danger">{formik.errors.description}</p>
                ) : null}
              </div>
              
              <div className="control-group">
                <div className="my-3">
                  <input
                    type="file"
                    className="form-control"
                    aria-label="file example"
                    name="productImage"
                    onChange={handleImgChange}
                  />
                </div>
                {formik.touched.productImage && formik.errors.productImage ? (
                  <p className="help-block text-danger">{formik.errors.productImage}</p>
                ) : null}
                {preview && (
                  <img src={preview} alt="Product Image" width="100" />
                )}
              </div>
              <br/>
              <div>
                <button
                  className="btn btn-primary py-2 px-4"
                  type="submit"
                  id="sendMessageButton"
                  disabled={formik.isSubmitting}
                >
                  Create Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNewProduct;