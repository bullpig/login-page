import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import AuthLayout from '../layouts/AuthLayout'
import PageNotFound from '../pages/app/PageNotFound'
import Home from '../pages/app/Home'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<AuthLayout />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/" index element={<Home />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
