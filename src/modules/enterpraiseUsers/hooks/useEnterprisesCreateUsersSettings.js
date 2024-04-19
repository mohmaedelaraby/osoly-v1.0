import { useMutation } from "react-query";
import { useToastMessage } from "../../../hooks/useToastMessage";
import { createUser } from "../service/userServices";
import useClosePopUps from "../../../store/useClosePopups";

export const useCreateUserSettings = () => {
    const { successToast, errorToast } = useToastMessage()
    const {toggleShow}=useClosePopUps()

    const mutation = useMutation(createUser, {
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