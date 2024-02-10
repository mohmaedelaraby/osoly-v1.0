import { useMutation } from "react-query";
import { useToastMessage } from "../../../hooks/useToastMessage";
import { updateUnit } from "../service/useUnits";

export const useUpdateUnit = () => {
    const { successToast, errorToast } = useToastMessage()

    const mutation = useMutation(updateUnit, {
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