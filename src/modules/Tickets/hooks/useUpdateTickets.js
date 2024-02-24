import { useMutation } from "react-query";
import { useToastMessage } from "../../../hooks/useToastMessage";
import { updateTickets } from "../service/ticketsServices";

export const useUpdateTickets = () => {
    const { successToast, errorToast } = useToastMessage()

    const mutation = useMutation(updateTickets, {
        onSuccess: (res) => {
            if (res.status === 201 || res.status === 200) {
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