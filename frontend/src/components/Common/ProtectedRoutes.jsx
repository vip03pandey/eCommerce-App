import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({ children, role }) => {
  const { user } = useSelector(state => state.auth)

  if (!user || (role && user.role !== role)) {
    return <Navigate to="/login" />
  }

  return (
    <div>
      {children}
    </div>
  )
}

export default ProtectedRoutes
