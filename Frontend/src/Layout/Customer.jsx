import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useGetMeQuery } from '../redux/Api/authApi'
import { useSelector } from 'react-redux'
import Breadcrumb from '../components/Breadcrumb'
import SideNavigation from '../components/SideNavigation'

const Customer = ({role}) => {
  const {data} = useGetMeQuery()
  const {isAuthenticated} = useSelector((v)=>v.auth)
  
  if(!isAuthenticated || data?.user?.roles !== role){
    return <Navigate to={'/login'}/>
  }

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'DashBoard', path: '/customer' },
    { label: 'Customer', path: '/customer' },
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

export default Customer
