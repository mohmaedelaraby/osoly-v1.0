import { useMutation } from "react-query";
import { useToastMessage } from "../../../hooks/useToastMessage";
import { createTickets } from "../service/ticketsServices";

export const useCreateTicket = () => {
    const { successToast, errorToast } = useToastMessage()

    const mutation = useMutation(createTickets, {
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