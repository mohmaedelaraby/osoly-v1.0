import { useQuery } from "react-query";
import { getUserDetails } from "../service/userServices";

const fetchUser = async (id) => {
    return await getUserDetails(id);
};

const useGetUser = (id) => {
    const { data, refetch, status } = useQuery([`user${id}`, id], () => fetchUser(id), {
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
