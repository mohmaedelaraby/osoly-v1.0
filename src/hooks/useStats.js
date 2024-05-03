import { useQuery } from "react-query";
import { getStats } from "../services/stats/stats";

const fetchStats = async () => {
    return await getStats();
};

const useStats = () => {
    const { data, refetch, status } = useQuery(['stats' ], () => fetchStats(), {
        refetchOnWindowFocus: false,
        enabled: false
    });
    const modifiedIsLoading = status === 'loading' || status === 'idle';
    return {
        statsData:data,
        statsisLoading: modifiedIsLoading,
        statsRefetch:refetch,
    };
};

export default useStats;
