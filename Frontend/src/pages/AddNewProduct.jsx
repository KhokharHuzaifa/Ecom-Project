import React from "react";

const AddNewProduct = () => {
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
              <span className="breadcrumb-item active">AddNewProduct</span>
            </nav>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="col-lg-8 mb-5 px-xl-5">
          <div className="contact-form bg-light p-30">
        <h1 style={{marginBottom:"20px"}}>Add New Product</h1>
            <div id="success"></div>
            <form name="sentMessage" id="contactForm" novalidate="novalidate">
              <div className="control-group">
                <input
                  type="text"
                  className="form-control"
                  id="productname"
                  placeholder="Product Name"
                  required="required"
                />
                <p className="help-block text-danger"></p>
              </div>
              <div className="control-group">
                <input
                  type="text"
                  className="form-control"
                  id="price"
                  placeholder="Product Price"
                  required="required"
                />
                <p className="help-block text-danger"></p>
              </div>
              <div className="control-group my-3">
                <select class="form-select" aria-label="Default select example">
                  <option selected>Select Category</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div className="control-group">
                <textarea
                  className="form-control"
                  rows="4"
                  id="message"
                  placeholder="Description"
                  required="required"
                ></textarea>
                <p className="help-block text-danger"></p>
              </div>
              <div className="control-group">
                <div class="mb-3">
                  <input
                    type="file"
                    class="form-control"
                    aria-label="file example"
                    required
                  />
                </div>
              </div>
              <div>
                <button
                  className="btn btn-primary py-2 px-4"
                  type="submit"
                  id="sendMessageButton"
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
