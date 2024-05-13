import { useMutation } from "react-query";
import { useToastMessage } from "../../../hooks/useToastMessage";
import { deleteUser } from "../service/userServices";

export const useDeleteUser = () => {
    const { successToast, errorToast } = useToastMessage()

    const mutation = useMutation(deleteUser, {
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
        isDeleteLoading: mutation.isLoading,
        isSuccess: mutation.isSuccess
    }
  }