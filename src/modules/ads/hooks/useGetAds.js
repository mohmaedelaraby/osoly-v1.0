import { useQuery } from "react-query";
import { getAdsDetails } from "../service/adsServices";

const fetchAds = async (id) => {
    return await getAdsDetails(id);
};

const useGetAds = (id) => {
    const { data, refetch, status } = useQuery([`ads${id}`, id], () => fetchAds(id), {
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

export default useGetAds;
