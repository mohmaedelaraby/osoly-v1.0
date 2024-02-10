import { useQuery } from "react-query";
import { getUnits } from "../service/useUnits";

const fetchUnits = async (params) => {
    const modifiedParams = { ...params };
    return await getUnits(modifiedParams);
};

const useUnits = (params) => {
    const { data, refetch, status } = useQuery(['units', params], () => fetchUnits(params), {
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

export default useUnits;
