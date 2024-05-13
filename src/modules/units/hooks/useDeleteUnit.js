import { useMutation } from "react-query";
import { useToastMessage } from "../../../hooks/useToastMessage";
import { deleteUnit } from "../service/useUnits";

export const useDeleteUnit = () => {
    const { successToast, errorToast } = useToastMessage()

    const mutation = useMutation(deleteUnit, {
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