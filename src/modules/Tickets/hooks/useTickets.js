import { useQuery } from "react-query";
import { getTickets } from "../service/ticketsServices";

const fetchTickets = async (params) => {
    const modifiedParams = { ...params };
    return await getTickets(modifiedParams);
};

const useTickets = (params) => {
    const { data, refetch, status } = useQuery(['Tickets', params], () => fetchTickets(params), {
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

export default useTickets;
