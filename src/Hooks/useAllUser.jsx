import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllUser = () => {
    const axiosSecure = useAxiosSecure();

    const {data: users=[],isLoading}=useQuery({
        queryKey: ["all-user"],
        queryFn: async () => {
            const {data} = await axiosSecure(`/all-user`);
            return data;
        }
    })
    return [users,isLoading]
};

export default useAllUser;