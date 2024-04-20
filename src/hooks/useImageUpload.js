import { useState } from "react";
import { useMutation } from "react-query";
import { useToastMessage } from "./useToastMessage";
import { uploadImage } from "../services/uploadImage/uploadImage";

export const useImageUpload = () => {
    const [error, setError] = useState(null);
    const [imagePath, setImagePath] = useState('')
    const { errorToast } = useToastMessage()


    const mutation = useMutation(uploadImage, {
        onSuccess: (res) => {
            if (res.data.path) {
                setImagePath(res.data.path)

            } else {
                setError("Something went wrong");
                errorToast()
            }
        },
        onError: () => {
            errorToast()
        }
    });

    return {
        uploadImage: mutation.mutate,
        isLoading: mutation.isLoading,
        error,
        imagePath,
        setImagePath
    };

}