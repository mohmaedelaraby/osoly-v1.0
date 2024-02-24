import { useMutation } from "react-query";
import { useToastMessage } from "../../../hooks/useToastMessage";
import { createUnit } from "../service/useUnits";
import useClosePopUps from "../../../store/useClosePopups";

export const useCreateUnit = () => {
    const { successToast, errorToast } = useToastMessage()
    const {toggleShow}=useClosePopUps()


    const mutation = useMutation(createUnit, {
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