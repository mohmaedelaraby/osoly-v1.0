import { useQuery } from "react-query";
import { getProperteyDetails } from "../service/useProperties";

const fetchPropertey = async (id) => {
    return await getProperteyDetails(id);
};

const useGetPropertey = (id) => {
    const { data, refetch, status } = useQuery([`propertey${id}`, id], () => fetchPropertey(id), {
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

export default useGetPropertey;
