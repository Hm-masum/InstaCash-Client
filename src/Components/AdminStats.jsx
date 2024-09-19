import { FaUsers, FaUserSecret } from "react-icons/fa";
import useAllTransaction from "../Hooks/useAllTransaction";
import useAllUser from "../Hooks/useAllUser";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from "recharts";


const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${
    y + height / 3
  }
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
    x + width
  }, ${y + height}
  Z`;
};

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

const AdminStats = () => {
  const [transactions, isLoading] = useAllTransaction();
  const [users,isLoading1] = useAllUser();

  let normalUser = users.filter((user) => user?.role === "user");
  let agent = users.filter((user) => user?.role === "agent");

  let CashInAmount=0,CashOutAmount=0,SendMoneyAmount=0,transactionsAmount = 0;;
  for(const trans of transactions){
     if(trans.process==='Cash In'){
       CashInAmount+=trans.amount;
     }
     else if(trans.process==='Cash Out'){
       CashOutAmount+=trans.amount;
     }
     else if(trans.process==='Send Money'){
       SendMoneyAmount+=trans.amount;
     }
     transactionsAmount+=trans.amount;
  }
  

  if(isLoading || isLoading1) return <div className="flex justify-center h-[50vh]"><span className="loading loading-bars loading-lg"></span></div>

  // For Charts 
  const data = [
    { name: "Cash In", value: CashInAmount },
    { name: "Cash Out", value: CashOutAmount },
    { name: "Send Money", value: SendMoneyAmount },
  ];

  return (
    <div className="py-10 space-y-6">
      <div className="stats shadow flex flex-col md:flex-row">
        <div className="stat place-items-center">
          <div className="stat-title">Total Normal Users</div>
          <div className="stat-value flex items-center gap-3">
            <FaUsers /> {normalUser.length}
          </div>
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
          <div className="stat-value flex items-center gap-3">
            <FaUserSecret /> {agent.length}
          </div>
          <div className="stat-desc">15% more than last month</div>
        </div>
      </div>

      <div className="flex justify-center">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Bar
            dataKey="value"
            fill="#8884d8"
            shape={<TriangleBar />}
            label={{ position: "top" }}
          >
            {transactions.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % 20]} />
            ))}
          </Bar>
        </BarChart>
      </div>
    </div>
  );
};

export default AdminStats;
