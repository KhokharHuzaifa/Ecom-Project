import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useGetMeQuery } from '../redux/Api/authApi'
import { useLazyLogoutQuery } from '../redux/Api/authApi'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const { data,isLoading } = useGetMeQuery()
  const navigate = useNavigate()


  const [logout] = useLazyLogoutQuery()
  

  const {isAuthenticated, user} = useSelector(state=>state.auth)

  const handleLogout = async () => {
   await logout();
  }
  
  return (
    <>

     {/* <!-- Topbar Start --> */}
     <div className="container-fluid">
        <div className="row bg-secondary py-1 px-xl-5">
          <div className="col-lg-6 d-none d-lg-block">
            <div className="d-inline-flex align-items-center h-100">
              <Link className="text-body mr-3" href="">About</Link>
              <Link className="text-body mr-3" href="">Contact</Link>
              <Link className="text-body mr-3" href="">Help</Link>
              <Link className="text-body mr-3" href="">FAQs</Link>
            </div>
          </div>
          <div className="col-lg-6 text-center text-lg-right">
            <div className="d-inline-flex align-items-center">
           {
            isAuthenticated && user ? <>
            <div className="btn-group">
              <button className=' btn dropdown-toggle' style={{border:'none', outline:'none'}} data-toggle="dropdown"> <img src={user?.user?.avatar} width={20}/> <b>Welcome!</b> {user?.user?.username}</button>
                <div className="dropdown-menu dropdown-menu-right">
                <button className="dropdown-item" >Profile</button>
                  <button className="dropdown-item" >Dashboard</button>
                  <button type="button" className='btn btn-light dropdown-item' onClick={handleLogout}>logout</button>
                </div>
              </div>
            </>:<>
             <Link to={'/register'} className='text-dark'><button className="dropdown-item bg-light" type="button">Sign up</button></Link>
             <Link to={'/login'} className='text-dark'><button className="dropdown-item bg-light" type="button">Login</button></Link>
            </>
           }
            </div>
            <div className="d-inline-flex align-items-center d-block d-lg-none">
              <Link href="" className="btn px-0 ml-2">
                <i className="fas fa-heart text-dark"></i>
                <span className="badge text-dark border border-dark rounded-circle" style={{ paddingBottom: "2px" }}>0</span>
              </Link>
              <Link href="" className="btn px-0 ml-2">
                <i className="fas fa-shopping-cart text-dark"></i>
                <span className="badge text-dark border border-dark rounded-circle" style={{ paddingBottom: "2px" }}>0</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="row align-items-center bg-light py-3 px-xl-5 d-none d-lg-flex">
          <div className="col-lg-4">
            <Link to={'/'} className="text-decoration-none">
              <span className="h1 text-uppercase text-primary bg-dark px-2">Shop</span>
              <span className="h1 text-uppercase text-dark bg-primary px-2 ml-n1">Haven</span>
            </Link>
          </div>
          <div className="col-lg-4 col-6 text-left">
            <form action="">
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Search for products" />
                <div className="input-group-append">
                  <span className="input-group-text bg-transparent text-primary">
                    <i className="fa fa-search"></i>
                  </span>
                </div>
              </div>
            </form>
          </div>
          <div className="col-lg-4 col-6 text-right">
            <p className="m-0">Customer Service</p>
            <h5 className="m-0">+012 345 6789</h5>
          </div>
        </div>
      </div>
      {/* <!-- Topbar End --> */}


      {/* <!-- Navbar Start --> */}
      <div className="container-fluid bg-dark mb-30">
        <div className="row px-xl-5">
          <div className="col-lg-3 d-none d-lg-block">
            <a className="btn d-flex align-items-center justify-content-between bg-primary w-100" data-toggle="collapse" href="#navbar-vertical" style={{ height: "65px", padding: "0px 30px" }}>
              <h6 className="text-dark m-0"><i className="fa fa-bars mr-2"></i>Categories</h6>
              <i className="fa fa-angle-down text-dark"></i>
            </a>
            <nav className="collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 bg-light" id="navbar-vertical" style={{ width: "calc(100% - 30%)", zIndex: "999" }}>
              <div className="navbar-nav w-100">
                <div className="nav-item dropdown dropright">
                  <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">Dresses <i className="fa fa-angle-right float-right mt-1"></i></a>
                  <div className="dropdown-menu position-absolute rounded-0 border-0 m-0">
                    <Link href="" className="dropdown-item">Men's Dresses</Link>
                    <Link href="" className="dropdown-item">Women's Dresses</Link>
                    <Link href="" className="dropdown-item">Baby's Dresses</Link>
                  </div>
                </div>
                <Link href="" className="nav-item nav-link">Shirts</Link>
                <Link href="" className="nav-item nav-link">Jeans</Link>
                <Link href="" className="nav-item nav-link">Swimwear</Link>
                <Link href="" className="nav-item nav-link">Sleepwear</Link>
                <Link href="" className="nav-item nav-link">Sportswear</Link>
                <Link href="" className="nav-item nav-link">Jumpsuits</Link>
                <Link href="" className="nav-item nav-link">Blazers</Link>
                <Link href="" className="nav-item nav-link">Jackets</Link>
                <Link href="" className="nav-item nav-link">Shoes</Link>
              </div>
            </nav>
          </div>
          <div className="col-lg-9">
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-0">
              <Link href="" className="text-decoration-none d-block d-lg-none">
                <span className="h1 text-uppercase text-dark bg-light px-2">Shop</span>
                <span className="h1 text-uppercase text-light bg-primary px-2 ml-n1">Haven</span>
              </Link>
              <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                <div className="navbar-nav mr-auto py-0">
                  <Link to={'/'} className="nav-item nav-link">Home</Link>
                  <Link to={'/shop'} className="nav-item nav-link">Shop</Link>
                  <Link to={'/detail'} className="nav-item nav-link">Shop Detail</Link>
                  
                    {
                      isAuthenticated && data?.user?.roles === 'customer' || 'admin' ? 
                      <>
                      <Link to={'/customer/cart'} className="nav-item nav-link">Shopping Cart</Link>
                      <Link to={'/customer/checkout'} className="nav-item nav-link">Checkout</Link>
                   
                      </> : null
                    }
                      
                  
                  <Link to={'/contact'} className="nav-item nav-link">Contact</Link>
                  {
                    isAuthenticated && data?.user?.roles === 'admin' ? <><Link to={'/admin/addProduct'} className="nav-item nav-link" >AddNewProduct</Link></> : null
                  }
                  
                </div>
                {
                  isAuthenticated ? <>
                  <div className="navbar-nav ml-auto py-0 d-none d-lg-block">
                  <Link href="" className="btn px-0">
                    <i className="fas fa-heart text-primary"></i>
                    <span className="badge text-secondary border border-secondary rounded-circle" style={{ paddingBottom: "2px" }}>0</span>
                  </Link>
                  <Link href="" className="btn px-0 ml-3">
                    <i className="fas fa-shopping-cart text-primary"></i>
                    <span className="badge text-secondary border border-secondary rounded-circle" style={{ paddingBottom: "2px" }}>0</span>
                  </Link>
                </div>
                </> : null
                }
                
              </div>
            </nav>
          </div>
        </div>
      </div>
      {/* <!-- Navbar End --> */}
      
      </>
  )
}

export default Navbar