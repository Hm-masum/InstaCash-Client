import useAuth from './useAuth';
import useAxiosCommon from './useAxiosCommon';
import { useQuery } from '@tanstack/react-query';

const useRoles = () => {
    const {user,loading}=useAuth();
    const axiosCommon=useAxiosCommon();

    const {data: role='', isLoading} =useQuery({
        queryKey: ['role', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () =>{
            const {data}= await axiosCommon(`/user/${user?.email}`)
            return data.role
        }
    })

    return [role,isLoading]
};

export default useRoles;