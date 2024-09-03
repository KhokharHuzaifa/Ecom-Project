import React from 'react'
import { useFormik } from 'formik';
import { Link } from 'react-router-dom'
import { useLoginMutation } from '../redux/Api/authApi';
import { useNavigate } from 'react-router-dom';
const Login = () => {

  const [login,{isLoading}] = useLoginMutation()

  const navigate = useNavigate()

  const { handleChange, handleSubmit, values ,handleBlur} = useFormik({
    initialValues: {
     email:'',
     password:'',
    },
    onSubmit: async (values) => {
    await login(values)
     navigate('/')
    },
  });

  return (
    <center>
    <div className="col-lg-7 mb-5">
            <div className="contact-form bg-light p-30">
            <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="control-group mt-4">
                        <input type="email" name='email' className="form-control" id="email" placeholder="Your Email" onChange={handleChange} onBlur={handleBlur} value={values.email}/>
                    </div>
                    <div className="control-group mt-4">
                        <input type="text" name='password' className="form-control" placeholder="Password" onChange={handleChange} onBlur={handleBlur} value={values.password}/>
                    </div>
                    <div>
                        <button className="btn btn-primary py-2 px-4 mt-4 mb-3" type="submit">Login</button>
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