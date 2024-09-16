import { FaUsers, FaUserSecret } from "react-icons/fa";
import useAllTransaction from "../Hooks/useAllTransaction";
import useAllUser from "../Hooks/useAllUser";

const AdminStats = () => {
    const [transactions, isLoading] = useAllTransaction();
    const [users] = useAllUser()

    let transactionsAmount = 0;
    transactions.map((trans) => (transactionsAmount += trans.amount));

    let normalUser=users.filter(user=>user?.role==='user')
    let agent=users.filter(user=>user?.role==='agent')

    if(isLoading) return <div className="flex justify-center h-[50vh]"><span className="loading loading-bars loading-lg"></span></div>


    return (
       <div>
          <div className="stats shadow flex flex-col md:flex-row">
             <div className="stat place-items-center">
               <div className="stat-title">Total Normal Users</div>
               <div className="stat-value flex items-center gap-3"><FaUsers />     {normalUser.length}</div>
               <div className="stat-desc">21% more than last month</div>
             </div>

             <div className="stat place-items-center">
               <div className="stat-title">Total Transaction</div>
               <div className="stat-value text-purple-700">
                 {transactionsAmount} Taka
               </div>
               <div className="stat-desc text-purple-700">
                 Number of Transaction {transactions.length}
               </div>
             </div>

             <div className="stat place-items-center">
               <div className="stat-title">Total Agent</div>
               <div className="stat-value flex items-center gap-3"><FaUserSecret/> {agent.length}</div>
               <div className="stat-desc">15% more than last month</div>
             </div>
          </div>
          
       </div>
    );
};

export default AdminStats;


