import { useQuery } from "react-query";
import { getTicketsDetails } from "../service/ticketsServices";

const fetchTickets = async (id) => {
    return await getTicketsDetails(id);
};

const useGetTicket = (id) => {
    const { data, refetch, status } = useQuery([`tickets${id}`, id], () => fetchTickets(id), {
        refetchOnWindowFocus: false,
        enabled: false
    });
    const modifiedIsLoading = status === 'loading' || status === 'idle';
    return {
        data:data,
        isLoading: modifiedIsLoading,
        refetch,
    };
};

export default useGetTicket;
