import { Navigate } from "react-router-dom"
import { useAuthStore } from "../stores/useAuthStore"




export const OnboardingGuard = ({ children }) => {
    const { isLoggedIn } = useAuthStore();
    if (!isLoggedIn) return <Navigate to='/login' />;
    return <>{children}</>;
}