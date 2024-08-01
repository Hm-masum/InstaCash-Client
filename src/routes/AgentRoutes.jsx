import { Navigate } from "react-router-dom";
import useRoles from "../Hooks/useRoles";

const AgentRoutes = ({children}) => {
    const [role,isLoading]= useRoles();

    if(isLoading) return <div className="flex justify-center h-[50vh]"><span className="loading loading-bars loading-lg"></span></div>

    if(role === 'agent') return children;

    return <Navigate to={'/login'}></Navigate>
};

export default AgentRoutes;