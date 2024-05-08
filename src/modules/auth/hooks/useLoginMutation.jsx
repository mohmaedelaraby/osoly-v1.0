import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../../store/useAuthStore";
import { useToastMessage } from "../../../hooks/useToastMessage";
import { loginApi } from "../service/login";

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
        sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
        sessionStorage.setItem("localLogo", res.data.data.enterprise?.logo);
        sessionStorage.setItem(
          "dashboardSettings",
          JSON.stringify({
            dashboardColor:
              res.data.data.enterprise?.dashboardColor || "#194C81",
            dashboardFontColor:
              res.data.data.enterprise?.dashboardFontColor || "#EFF9FF",
            sidebarColor: res.data.data.enterprise?.sidebarColor || "#194C81",
            sidebarFontColor:
              res.data.data.enterprise?.sidebarFontColor || "#EFF9FF",
          })
        );
        loginStore();
        navigate(redirectPath, { replace: true });
      } else {
        errorToast(res.data.status.message);
        setError(res.data.status.message);
      }
    },
    onError: (res) => {
      errorToast("الرقم السري او الاسم غير صحيح");
      setError("الرقم السري او الاسم غير صحيح");
    },
  });

  return {
    mutate: mutation.mutate,
    isLoading: mutation.isLoading,
    loginError: error,
    setError,
  };
};
