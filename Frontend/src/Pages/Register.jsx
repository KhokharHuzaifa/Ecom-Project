import React from 'react'
import { useFormik } from 'formik';
import { useRegisterMutation } from '../redux/Api/authApi';
import { Link } from 'react-router-dom'
const Register = () => {

  const { handleChange, handleSubmit, values ,handleBlur} = useFormik({
    initialValues: {
     fname:'',
     lname:'',
     username:'',
     email:'',
     password:'',
     phonenumber:''
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });


  return (
    <center>
        <div className="col-lg-7 mb-5">
                <div className="contact-form bg-light p-30">
                <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="control-group mt-4">
                            <input type="text" name='fname' className="form-control" placeholder="First Name" onChange={handleChange} onBlur={handleBlur} value={values.fname}/>
                        </div>
                        <div className="control-group mt-4">
                            <input type="text" name='lname' className="form-control" placeholder="Last Name" onChange={handleChange} onBlur={handleBlur} value={values.lname}/>
                        </div>
                        <div className="control-group mt-4">
                            <input type="text" name='username' className="form-control" placeholder="User Name" onChange={handleChange} onBlur={handleBlur} value={values.username}/>
                        </div>
                        <div className="control-group mt-4">
                            <input type="email" name='email' className="form-control" id="email" placeholder="Your Email" onChange={handleChange} onBlur={handleBlur} value={values.email}/>
                        </div>
                        <div className="control-group mt-4">
                            <input type="text" name='password' className="form-control" placeholder="Password" onChange={handleChange} onBlur={handleBlur} value={values.password}/>
                        </div>
                        <div className="control-group mt-4">
                            <input type="text" name='phonenumber' className="form-control" placeholder="Phone Number" onChange={handleChange} onBlur={handleBlur} value={values.phonenumber}/>
                        </div>
                        <div>
                            <button className="btn btn-primary py-2 px-4 mt-4 mb-3" type="submit">Register</button>
                        </div>
                        <div >
                        <Link to={'/login'}><span className='text-dark'>Already have an account?</span></Link>
                        </div>
                    </form>
                </div>
            </div>
    </center>

  )
}

export default Register



       












 