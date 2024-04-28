import { useMutation } from "react-query";
import { useToastMessage } from "../../../hooks/useToastMessage";
import { uploadPropertiesFile } from "../service/useProperties";

export const useUploadProperteyFile = () => {
    const { successToast, errorToast } = useToastMessage()

    const mutation = useMutation(uploadPropertiesFile, {
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
        isLoading: mutation.isLoading,
        isSuccess: mutation.isSuccess
    }
  }