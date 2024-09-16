import AdminStats from "../../Components/AdminStats";
import AgentStats from "../../Components/AgentStats";
import UserStats from "../../Components/UserStats";
import useRoles from "../../Hooks/useRoles";

const Statistics = () => {
    const [role,isLoading ] = useRoles();
    if(isLoading) return <div className="flex justify-center h-[50vh]"><span className="loading loading-bars loading-lg"></span></div>


    return (
        <div>
            {role=='user' && <div><UserStats></UserStats></div>}
            {role=='agent' && <div><AgentStats></AgentStats></div>}
            {role=='admin' && <div><AdminStats></AdminStats></div>}
        </div>
    );
};

export default Statistics;