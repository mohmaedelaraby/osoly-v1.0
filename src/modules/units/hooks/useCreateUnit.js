import { useMutation } from "react-query";
import { useToastMessage } from "../../../hooks/useToastMessage";
import { createUnit } from "../service/useUnits";

export const useCreateUnit = () => {
    const { successToast, errorToast } = useToastMessage()

    const mutation = useMutation(createUnit, {
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