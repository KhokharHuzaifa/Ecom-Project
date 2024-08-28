import React from 'react'
import Address from '../Components/Address'
import ContactForm from '../Components/ContactForm'

const Contact = () => {
  return (
    <div>
        {/* Breadcrums */}
      <div className="container-fluid">
        <div className="row px-xl-5">
            <div className="col-12">
                <nav className="breadcrumb bg-light mb-30">
                    <a className="breadcrumb-item text-dark" href="#">Home</a>
                    <span className="breadcrumb-item active">Contact</span>
                </nav>
            </div>
        </div>
    </div>

    <div className="container-fluid">
        <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4"><span className="bg-secondary pr-3">Contact Us</span></h2>
        <div className="row px-xl-5">
        <ContactForm/>
            <Address/>
        </div>
    </div>

    </div>
  )
}

export default Contact
