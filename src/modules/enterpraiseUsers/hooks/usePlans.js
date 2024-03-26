import { useQuery } from "react-query";
import { getEnterprisesUsers } from "../service/enterprisesUserServices";
import { getPlans } from "../../../services/plans/plans";

const fetchPlans = async () => {
    return await getPlans();
};

const usePlans = () => {
    const { data, refetch, status } = useQuery(['plans' ], () => fetchPlans(), {
        refetchOnWindowFocus: false,
        enabled: false
    });
    const modifiedIsLoading = status === 'loading' || status === 'idle';
    return {
        PlansData:data,
        PlansisLoading: modifiedIsLoading,
        PlansRefetch:refetch,
    };
};

export default usePlans;
