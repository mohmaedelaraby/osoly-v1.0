import { useMutation } from "react-query";
import { useToastMessage } from "../../../hooks/useToastMessage";
import { createUser } from "../service/userServices";

export const useCreateUser = () => {
    const { successToast, errorToast } = useToastMessage()

    const mutation = useMutation(createUser, {
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