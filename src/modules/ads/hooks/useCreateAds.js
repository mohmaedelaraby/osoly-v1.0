import { useMutation } from "react-query";
import { useToastMessage } from "../../../hooks/useToastMessage";
import { createAds } from "../service/adsServices";
import useClosePopUps from "../../../store/useClosePopups";

export const useCreateAds = () => {
    const { successToast, errorToast } = useToastMessage()
    const {toggleShow}=useClosePopUps()


    const mutation = useMutation(createAds, {
        onSuccess: (res) => {
            if (res.status === 200) {
                successToast()
                toggleShow()
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