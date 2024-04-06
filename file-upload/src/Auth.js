import { Navigate, Outlet } from 'react-router-dom'
const PrivateRoutes = () => {
  let auth = sessionStorage.getItem("accessToken");
return (
    auth ? <Outlet/> : <Navigate to='/login'/>
  )
}

export default PrivateRoutes;