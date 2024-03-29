import { useMutation } from "react-query";
import { useToastMessage } from "../../../hooks/useToastMessage";
import { createPropertey } from "../service/useProperties";
import useClosePopUps from "../../../store/useClosePopups";

export const useCreatePropertey = () => {
    const { successToast, errorToast } = useToastMessage()
    const {toggleShow}=useClosePopUps()


    const mutation = useMutation(createPropertey, {
        onSuccess: (res) => {
            if (res.status === 200 || res.status === 201) {
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