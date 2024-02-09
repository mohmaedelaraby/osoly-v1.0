import { useMutation } from "react-query";
import { useToastMessage } from "../../../hooks/useToastMessage";
import { updateUser } from "../service/userServices";

export const useUpdateUser = () => {
    const { successToast, errorToast } = useToastMessage()

    const mutation = useMutation(updateUser, {
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