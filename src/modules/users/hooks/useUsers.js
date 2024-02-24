import { useQuery } from "react-query";
import { getUsers } from "../service/userServices";

const fetchUsers = async (params) => {
    const modifiedParams = { ...params };
    return await getUsers(modifiedParams);
};

const useUsers = (params) => {
    const { data, refetch, status } = useQuery(['users', params], () => fetchUsers(params), {
        refetchOnWindowFocus: false,
        enabled: false
    });
    const modifiedIsLoading = status === 'loading' || status === 'idle';
    return {
        usersData:data,
        usersisLoading: modifiedIsLoading,
        usersRefetch:refetch,
    };
};

export default useUsers;
