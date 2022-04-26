import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useCheckAuth } from '../hooks/useCheckAuth'

function PrivateRoute() {
  const {checkLoggedIn, loading} = useCheckAuth()

  if(loading) {
    return <h2>Loading..</h2>
  } 

  return checkLoggedIn ? <Outlet /> : <Navigate to='/login' /> 
}

export default PrivateRoute