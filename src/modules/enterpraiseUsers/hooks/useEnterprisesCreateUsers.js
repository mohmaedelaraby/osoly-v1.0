import { useMutation } from "react-query";
import { useToastMessage } from "../../../hooks/useToastMessage";
import useClosePopUps from "../../../store/useClosePopups";
import { createEnterprisesUser } from "../service/enterprisesUserServices";

export const useEnterPraisesCreateUser = () => {
    const { successToast, errorToast } = useToastMessage()
    const {toggleShow}=useClosePopUps()

    const mutation = useMutation(createEnterprisesUser, {
        onSuccess: (res) => {
            if (res.status === 201 || res.status === 200) {
                successToast()
                toggleShow()
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