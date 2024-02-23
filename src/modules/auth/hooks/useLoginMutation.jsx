

import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../../store/useAuthStore";
import { useToastMessage } from "../../../hooks/useToastMessage";
import { loginApi } from "../service/login";


export const useLoginMutation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.path || "/home";
  const loginStore = useAuthStore((state) => state.login);
  const { setIsCofigured } = useAuthStore();
  const [error, setError] = useState(null);
  const { errorToast } = useToastMessage()

  const mutation = useMutation(loginApi, {
    onSuccess: (res) => {
      console.log(res)
      if (res.data.isSucceeded && res.data.data.accessToken) {
        const currentUser= res.data.data
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        loginStore();
        setIsCofigured(res.data.data.isSubscriptionConfigured)

        navigate(redirectPath, { replace: true });
      } else {
        errorToast(res.data.status.message)
        setError(res.data.status.message);
      }
    },
    onError: () => {
      errorToast()
    }
  });


  return {
    mutate: mutation.mutate,
    isLoading: mutation.isLoading,
    error,
    setError
  };
};
