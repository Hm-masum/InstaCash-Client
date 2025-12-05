import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useMyTransactionReq = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: myTransactionReq = "",
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myTransactionReq", user?.mobile],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/my-transactions-req/${user?.mobile}`
      );
      return data;
    },
  });

  return [myTransactionReq, isLoading, refetch];
};

export default useMyTransactionReq;
