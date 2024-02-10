import { useMutation } from "react-query";
import { useToastMessage } from "../../../hooks/useToastMessage";
import { createPropertey } from "../service/useProperties";

export const useCreatePropertey = () => {
    const { successToast, errorToast } = useToastMessage()

    const mutation = useMutation(createPropertey, {
        onSuccess: (res) => {
            if (res.status === 200) {
                successToast()
            } 
        },
        onError: () => {
            errorToast()
        }
    });
    return {
        mutate: mutation.mutate,
        isLoading: mutation.isLoading,
        isSuccess: mutation.isSuccess
    }
  }