import { useFormik } from 'formik';
import { useRegisterMutation } from '../redux/Api/authApi';
import { Link } from 'react-router-dom'
import { useState } from 'react';
import * as Yup from 'yup';

const Register = () => {

  window.scrollTo(0, 0);
  const [register, { isLoading, error, data }] = useRegisterMutation()
  const [apiMsg, setApiMsg] = useState(false)
  
  const { handleChange, handleSubmit, values, handleBlur, setFieldValue, touched, errors } = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
      phoneNumber: '',
      avatar: ''
    },
    validationSchema: Yup.object({
      firstname: Yup.string().matches(/^[A-Za-z ]*$/, 'Please enter valid first name').min(5, 'Minimum 5 letters').max(25, 'Maximum 25 letters').required('First Name is required').trim(),
      lastname: Yup.string().matches(/^[A-Za-z ]*$/, 'Please enter valid last name').min(5, 'Minimum 5 letters').max(25, 'Maximum 25 letters').required('Last Name is required').trim(),
      username: Yup.string().matches(/^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/, 'Please enter valid User name').min(5, 'Minimum 5 letters').max(25, 'Maximum 25 letters').required('User Name is required').trim(),
      email: Yup.string().matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, 'Please enter a valid email').required('Email is required').trim(),
      password: Yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'Minimum eight characters, at least one letter, one number and one special character').required('Password is required').trim(),
      phoneNumber: Yup.string().matches(/^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/, 'Phone number not match 03xxxxxxxxx or +92xxxxxxxxxx').required('Phone number is required').trim(),
  }),
    onSubmit: async (values) => {
      const res = await register(values).unwrap()
      setApiMsg(res)
    },
  });


  const [preview, setPreview] = useState(undefined)

  const handleImgChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setFieldValue('avatar', reader.result);
        setPreview(reader.result)
      }
    }
    reader.readAsDataURL(e.target.files[0]);
  }

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
          <h1>Register</h1>
          {
             apiMsg && <div class={`alert alert-${apiMsg.success ? 'success' : 'danger'} mt-3`} role="alert">
              <b> {apiMsg.message ? apiMsg.message : 'Upload your Avatar'}</b>
            </div>
          }
          {
            isLoading? <h1 className='mt-4'>Loading...</h1> : <form onSubmit={handleSubmit}>
            <div className="control-group mt-4">
              <input type="text" name='firstname' className="form-control" placeholder="First Name" onChange={handleChange} onBlur={handleBlur} value={values.firstname} />
              <span className='text-danger float-left ms-1 mt-2 mb-1'>{touched.firstname && errors.firstname}</span>
            </div>
            <div className="control-group mt-4">
              <input type="text" name='lastname' className="form-control" placeholder="Last Name" onChange={handleChange} onBlur={handleBlur} value={values.lastname} />
              <span className='text-danger float-left ms-1 mt-2 mb-1'>{touched.lastname && errors.lastname}</span>
            </div>
            <div className="control-group mt-4">
              <input type="text" name='username' className="form-control" placeholder="User Name" onChange={handleChange} onBlur={handleBlur} value={values.username} />
              <span className='text-danger float-left ms-1 mt-2 mb-1'>{touched.username && errors.username}</span>
            </div>
            <div className="control-group mt-4">
              <input type="email" name='email' className="form-control" id="email" placeholder="Your Email" onChange={handleChange} onBlur={handleBlur} value={values.email} />
              <span className='text-danger float-left ms-1 mt-2 mb-1'>{touched.email && errors.email}</span>
            </div>
            <div className="control-group mt-4">
              <input type="password" name='password' id="passowrdField" className="form-control" placeholder="Password" onChange={handleChange} onBlur={handleBlur} value={values.password} />
              <span className={`text-danger float-left ms-1 mt-2 mb-1 ${touched.password && errors.password ? 'me-4' : 'me-0'}`}>{touched.password && errors.password}</span>
            </div>
            <div className='control-group mt-2 float-left'>
              <label htmlFor="showpass">Show Password</label>
              <input type="checkbox" id='showpass' className='ms-1' onClick={passwordToggle}/>
              </div>
            <div className="control-group mt-4">
              <input type="text" name='phoneNumber' className="form-control" placeholder="Phone Number" onChange={handleChange} onBlur={handleBlur} value={values.phoneNumber} />
              <span className='text-danger float-left ms-1 mt-2 mb-1'>{touched.phoneNumber && errors.phoneNumber}</span>
            </div>
            <div className="control-group mt-4">
              <input type="file" className='form-control' onChange={(e) => handleImgChange(e)} name='avatar' />
            </div>
            <div className='col-md-6 mt-4'>
              <img style={{ objectFit: 'cover' }} src={preview ? preview : `https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-businessman-avatar-icon-flat-style-png-image_1917273.jpg`} width={100} alt="" value={values.avatar} />
            </div>
            <div>
              <button className="btn btn-primary py-2 px-4 mt-4 mb-3" type="submit">Register</button>
            </div>
            <div >
              <Link to={'/login'}><span className='text-dark'>Already have an account?</span></Link>
            </div>
          </form>
          }
        </div>
      </div>
    </center>

  )
}

export default Register
















