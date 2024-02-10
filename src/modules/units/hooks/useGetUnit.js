import { useQuery } from "react-query";
import { getUnitDetails } from "../service/useUnits";

const fetchUnit = async (id) => {
    return await getUnitDetails(id);
};

const useGetUser = (id) => {
    const { data, refetch, status } = useQuery([`unit${id}`, id], () => fetchUnit(id), {
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

export default useGetUser;
