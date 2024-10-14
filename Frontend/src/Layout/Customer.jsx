import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useGetMeQuery } from '../redux/Api/authApi'
import { useSelector } from 'react-redux'

const Customer = ({role}) => {
  const {data} = useGetMeQuery()
  const {isAuthenticated} = useSelector((v)=>v.auth)
  
  if(!isAuthenticated || data?.user?.roles !== role){
    return <Navigate to={'/login'}/>
  }
  return (
    <>
     <Outlet/> 
    </>
  )
}

export default Customer
