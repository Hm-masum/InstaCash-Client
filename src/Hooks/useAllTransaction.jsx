import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllTransaction = () => {
    const axiosSecure = useAxiosSecure();

    const { data: transactions = [], isLoading } = useQuery({
        queryKey: ["all-transactions"],
        queryFn: async () => {
          const { data } = await axiosSecure(`/all-transactions`);
          return data;
        },
    });

    return [transactions, isLoading]
};

export default useAllTransaction;