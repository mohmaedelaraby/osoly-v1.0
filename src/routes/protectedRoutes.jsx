
import {useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom"
import { useAuthStore } from "../store/useAuthStore";



export const ProtectedRoutes = ({ children }) => {
  const location = useLocation();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  if (!isLoggedIn) {
    // Redirect to the login page if the user is not authenticated
    return (<Navigate to='/login' state={{ path: location.pathname }}/>);
  }



  return (<>{children}</>);
};


