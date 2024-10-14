import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {useCreateCategoryMutation} from '../redux/Api/categoryApi'

const AddCategory = () => {

    const [createCategory] = useCreateCategoryMutation()

  const formik = useFormik({
    initialValues: {
      categoryName: '',
      categoryImg: '',
    },
    validationSchema: yup.object({
      categoryName: yup.string().required("Category name is required"),
      categoryImg: yup.string().required("Category image is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {  
      const data = await createCategory(values)
      
      setSubmitting(false);
    },
  });

  const [preview, setPreview] = useState(undefined);

  const handleImgChange = (e) => {
    const read = new FileReader();
    read.onload = () => {
      if (read.readyState === 2) {
        console.log("inside ready state");
        formik.setFieldValue("categoryImg", read.result);
        setPreview(read.result);
      }
    };
    read.readAsDataURL(e.target.files[0]);
  };

  return (
    <>
      {/* Breadcrums */}
      <div className="container-fluid">
        <div className="row px-xl-5">
          <div className="col-12">
            <nav className="breadcrumb bg-light mb-30">
              <a className="breadcrumb-item text-dark" href="#">
                Home
              </a>
              <span className="breadcrumb-item active">AddNewCategory</span>
            </nav>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="col-lg-8 mb-5 px-xl-5">
          <div className="contact-form bg-light p-30">
            <h1 style={{ marginBottom: "20px" }}>Add New Category</h1>
            <div id="success"></div>
            <form name="sentMessage" id="contactForm" novalidate="novalidate" onSubmit={formik.handleSubmit}>
              <div className="control-group">
                <input
                  type="text"
                  className="form-control"
                  id="productname"
                  name="categoryName"
                  placeholder="New Category"
                  value={formik.values.categoryName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.categoryName && formik.errors.categoryName ? (
                  <div style={{ color: "red" }}>{formik.errors.categoryName}</div>
                ) : (
                  ""
                )}
              </div>
              <div className="control-group mt-4">
                <input
                  type="file"
                  className='form-control'
                  name='categoryImg'
                  onChange={(e) => handleImgChange(e)}
                />
              </div>
              <div className='col-md-6 mt-4'>
                <img style={{ objectFit: 'cover' }} src={preview ? preview : `https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-businessman-avatar-icon-flat-style-png-image_1917273.jpg`} width={100} alt="" />
              </div>
                {formik.touched.categoryImg && formik.errors.categoryImg ? (
                  <div style={{ color: "red" }}>{formik.errors.categoryImg}</div>
                ) : (
                  ""
                )}
              <div>
                <br/>
                <button
                  className="btn btn-primary py-2 px-4"
                  type="submit"
                  id="sendMessageButton"
                  disabled={formik.isSubmitting}
                >
                  Create Category
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCategory;