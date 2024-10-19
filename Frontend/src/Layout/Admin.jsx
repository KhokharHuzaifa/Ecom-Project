import React from 'react'
import { useGetMeQuery } from '../redux/Api/authApi'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import SideNavigation from '../components/SideNavigation';
import Breadcrumb from '../components/Breadcrumb';

const Admin = ({role}) => {

  const {data} = useGetMeQuery()
  const {isAuthenticated} = useSelector((v)=>v.auth)
  
  if(!isAuthenticated || data?.user?.roles !== role){
    return <Navigate to={'/login'}/>
  }

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'DashBoard', path: '/admin' },
    { label: 'Admin', path: '/admin' },
  ];

  return (
    <>
    <Breadcrumb items={breadcrumbItems}/>
    <div style={{display:'flex',paddingInline:'50px'}}>
    <SideNavigation/>
      <Outlet/>
    </div>
    </>
  )
}

export default Admin
