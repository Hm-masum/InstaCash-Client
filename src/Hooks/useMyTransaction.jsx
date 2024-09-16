import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useMyTransaction = () => {
    const {user,}=useAuth();
    const axiosSecure=useAxiosSecure();

    const { data: transactions = [],isLoading} = useQuery({
        queryKey: ["my-transactions"],
        queryFn: async () => {
          const { data } = await axiosSecure(`/my-transactions/${user?.mobile}`);
          return data;
        },
    });

    return [transactions,isLoading]
};

export default useMyTransaction;