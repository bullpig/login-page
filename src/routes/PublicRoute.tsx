import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const PublicRoute = () => {
  const location = useLocation()
  const { user } = useAuth()

  console.log(user)

  const redirectUrl =
    location.state && location.state.from ? location.state.from.pathname : '/'

  return !user ? <Outlet /> : <Navigate to={redirectUrl} />
}

export default PublicRoute
