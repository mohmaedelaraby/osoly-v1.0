import { useQuery } from "react-query";
import { getProperties } from "../service/useProperties";

const fetchProperties = async (params) => {
    const modifiedParams = { ...params };
    return await getProperties(modifiedParams);
};

const useProperties = (params) => {
    const { data, refetch, status } = useQuery(['properties', params], () => fetchProperties(params), {
        refetchOnWindowFocus: false,
        enabled: false
    });
    const modifiedIsLoading = status === 'loading' || status === 'idle';
    return {
        PropertiesData:data,
        isLoading: modifiedIsLoading,
        PropertiesRefetch:refetch,
    };
};

export default useProperties;
