import { useMutation } from "react-query";
import { useToastMessage } from "../../../hooks/useToastMessage";
import { updateAds } from "../service/adsServices";

export const useUpdateAds = () => {
    const { successToast, errorToast } = useToastMessage()

    const mutation = useMutation(updateAds, {
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