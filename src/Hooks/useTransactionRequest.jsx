import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useTransactionRequest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: transactionRequest = "",
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["transactionRequest", user?.mobile],
    queryFn: async () => {
      const { data } = await axiosSecure(`/transactions-req/${user?.mobile}`);
      return data;
    },
  });

  return [transactionRequest, isLoading, refetch];
};

export default useTransactionRequest;
