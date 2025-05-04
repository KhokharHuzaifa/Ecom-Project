import React, { useState } from 'react'
import { useFormik } from 'formik';
import { Link, Navigate } from 'react-router-dom'
import { useLoginMutation } from '../redux/Api/authApi';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';

const Login = () => {
  const {isAuthenticated} = useSelector((v)=>v.auth)
  const [login, { isLoading }] = useLoginMutation()
  const navigate = useNavigate()
  const [apiMsg, setApiMsg] = useState("")

  const { handleChange, handleSubmit, values, handleBlur, touched, errors } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, 'Please enter a valid email').required('Email is required').trim(),
      password: Yup.string().required('Password is required').trim(),
  }),
    onSubmit: async (values) => {
      const user = await login(values).unwrap()      
      setApiMsg(user)
      user.success == true && navigate ("/")
    },
  });

  const passwordToggle = () => {
    const typedPassword = document.getElementById("passowrdField");
    if (typedPassword.type === "password") {
      typedPassword.type = "text";
    } else {
      typedPassword.type = "password";
    }
  }

  return (
    <center>
      <div className="col-lg-7 mb-5">
        <div className="contact-form bg-light p-30">
          <h1>Login</h1>
          {
            apiMsg && <div class={`alert alert-${apiMsg.success ? 'success' : 'danger'} mt-3`} role="alert">
              <b> {apiMsg.message}</b>
            </div>
          }
             <form onSubmit={handleSubmit}>
              <div className="control-group mt-4">
                <input type="email" name='email' className="form-control" id="email" placeholder="Your Email" onChange={handleChange} onBlur={handleBlur} value={values.email} />
                <span className='text-danger float-left ms-1 mt-2 mb-1'>{touched.email && errors.email}</span>
              </div>
              <div className="control-group mt-4">
                <input type="password" name='password' id='passowrdField' className="form-control" placeholder="Password" onChange={handleChange} onBlur={handleBlur} value={values.password} />
                <span className={`text-danger float-left ms-1 mt-2 mb-1 ${touched.password && errors.password ? 'me-4' : 'me-0'}`}>{touched.password && errors.password}</span>
              </div>
              <div className='control-group'>
              <label htmlFor="showpass">Show Password</label>
              <input type="checkbox" id='showpass' className='ms-1 mt-3' onClick={passwordToggle}/>
              </div>
              <div>
                <button className="btn btn-primary py-2 px-4 mt-2 mb-3" type="submit">Login</button>                
              </div>
              <div >
                <Link to={'/register'}><span className='text-dark'>Dont have an account?</span></Link>
              </div>
            </form>
          
        </div>
      </div>
    </center>

  )
}

export default Login