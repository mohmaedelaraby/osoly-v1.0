import { useMutation } from "react-query";
import { useToastMessage } from "../../../hooks/useToastMessage";
import { updatePropertey } from "../service/useProperties";

export const useUpdatePropertey = () => {
    const { successToast, errorToast } = useToastMessage()

    const mutation = useMutation(updatePropertey, {
        onSuccess: (res) => {
            if (res.status === 201) {
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