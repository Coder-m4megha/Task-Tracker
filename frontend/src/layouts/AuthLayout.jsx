import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const AuthLayout = () => {
  const { isAuthenticated, loading } = useAuth()
  
  if (loading) {
    return <div className="d-flex justify-content-center mt-5">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  }
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />
  }
  
  return (
    <div className="container">
      <Outlet />
    </div>
  )
}

export default AuthLayout
