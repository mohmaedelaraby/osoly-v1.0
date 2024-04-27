import { useMutation } from "react-query";
import { useToastMessage } from "../../../hooks/useToastMessage";
import { deleteEnterprisesUser } from "../service/enterprisesUserServices";

export const useEnterprisesDeleteUser = () => {
    const { successToast, errorToast } = useToastMessage()

    const mutation = useMutation(deleteEnterprisesUser, {
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