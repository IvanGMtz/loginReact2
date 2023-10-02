import { Navigate, Outlet } from "react-router";
import { useAuth } from "./AuthContext";

function ProtectedRouted() {
    const {user, isAuthenticated, loading} = useAuth();

    if (loading) return <h1>Loading...</h1>
    if(!loading && !isAuthenticated) return <Navigate to='/login' replace/>
  return (
    <Outlet/>
  )
}

export default ProtectedRouted