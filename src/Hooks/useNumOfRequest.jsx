import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useNumOfRequest = () => {
    const {user,}=useAuth();
    const axiosSecure=useAxiosSecure();

    const {data: numberOfReq='',isLoading,refetch} =useQuery({
        queryKey: ['numberOfReq', user?.mobile],
        queryFn: async () =>{
            const {data}= await axiosSecure(`/transactions-req/${user?.mobile}`)
            return data;
        }
    })

    return [numberOfReq,isLoading,refetch]
};

export default useNumOfRequest;