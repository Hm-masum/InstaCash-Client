import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosCommon from "./useAxiosCommon";

const useBalance = () => {
    const {user,loading}=useAuth();
    const axiosCommon=useAxiosCommon();

    const {data: balance='', refetch} =useQuery({
        queryKey: ['balance', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () =>{
            const {data}= await axiosCommon(`/user/${user?.email}`)
            return data.balance
        }
    })

    return [balance,refetch]
};

export default useBalance;