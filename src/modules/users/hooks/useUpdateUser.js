import { useMutation } from "react-query";
import { useToastMessage } from "../../../hooks/useToastMessage";
import { updateUser } from "../service/userServices";

export const useUpdateUser = () => {
    const { successToast, errorToast } = useToastMessage()

    const mutation = useMutation(updateUser, {
        onSuccess: (res) => {
            if (res.status === 201 || res.status === 200) {
                successToast()
            } 
        },
        onError: (error) => {
            errorToast(error.response.data.message)
        }
    });
    return {
        mutate: mutation.mutate,
        isLoading: mutation.isLoading,
        isSuccess: mutation.isSuccess
    }
  }