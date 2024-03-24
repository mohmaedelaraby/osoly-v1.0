import { useQuery } from "react-query";
import { getEnterprisesUsers } from "../service/enterprisesUserServices";

const fetchEnterPrisesUsers = async (params) => {
    const modifiedParams = { ...params };
    return await getEnterprisesUsers(modifiedParams);
};

const useEnterPrisesUsers = (params) => {
    const { data, refetch, status } = useQuery(['enterprises-users', params], () => fetchEnterPrisesUsers(params), {
        refetchOnWindowFocus: false,
        enabled: false
    });
    const modifiedIsLoading = status === 'loading' || status === 'idle';
    return {
        usersEnterPrisesData:data,
        usersEnterPrisesisLoading: modifiedIsLoading,
        usersEnterPrisesRefetch:refetch,
    };
};

export default useEnterPrisesUsers;
