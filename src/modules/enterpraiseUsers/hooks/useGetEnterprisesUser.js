import { useQuery } from "react-query";
import { getEnterprisesUserDetails } from "../service/enterprisesUserServices";

const fetchEnterprisesUser = async (id) => {
    return await getEnterprisesUserDetails(id);
};

const useEnterprisesGetUser = (id) => {
    const { data, refetch, status } = useQuery([`Enterprisesuser${id}`, id], () => fetchEnterprisesUser(id), {
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

export default useEnterprisesGetUser;
