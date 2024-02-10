import { useQuery } from "react-query";
import { getAds } from "../service/adsServices";

const fetchAds = async (params) => {
    const modifiedParams = { ...params };
    return await getAds(modifiedParams);
};

const useAds = (params) => {
    const { data, refetch, status } = useQuery(['ads', params], () => fetchAds(params), {
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

export default useAds;
