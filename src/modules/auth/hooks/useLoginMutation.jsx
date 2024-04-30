import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../../store/useAuthStore";
import { useToastMessage } from "../../../hooks/useToastMessage";
import { loginApi } from "../service/login";
import useColorStore from "../../../store/useColorStore";

export const useLoginMutation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.path || "/";
  const loginStore = useAuthStore((state) => state.login);
  const [error, setError] = useState(null);
  const { errorToast } = useToastMessage();

  const mutation = useMutation(loginApi, {
    onSuccess: (res) => {
      if (res.data.data.accessToken) {
        const currentUser = res.data.data;
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
       /*  useColorStore.setState({
          dashboardColor: res.data.data.enterprise?.dashboardColor,
          dashboardFontColor: res.data.data.enterprise?.dashboardFontColor,
          sidebarColor: res.data.data.enterprise?.sidebarColor,
          sidebarFontColor: res.data.data.enterprise?.sidebarFontColor,
          logo: res.data.data.enterprise?.logo,
        }); */
        localStorage.setItem("dashboardSettings",JSON.stringify({
          dashboardColor: "red",
          dashboardFontColor: "black",
          sidebarColor: "red",
          sidebarFontColor: "black",
          logo: res.data.data.enterprise?.logo,
        }));
        loginStore();
        navigate(redirectPath, { replace: true });
      } else {
        errorToast(res.data.status.message);
        setError(res.data.status.message);
      }
    },
    onError: () => {
      errorToast();
    },
  });

  return {
    mutate: mutation.mutate,
    isLoading: mutation.isLoading,
    error,
    setError,
  };
};
