import useAuth from "../Hooks/useAuth";
import useBalance from "../Hooks/useBalance";
import useMyTransaction from "../Hooks/useMyTransaction";
import useNumOfRequest from "../Hooks/useNumOfRequest";
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

const UserStats = () => {
  const { user } = useAuth();
  const [balance] = useBalance();
  const [numberOfReq, ,] = useNumOfRequest();
  const [transactions, isLoading] = useMyTransaction();

  let transactionsAmount = 0;
  transactions.map((trans) => (transactionsAmount += trans.amount));
  let reqAmount = 0;
  numberOfReq.map((trans) => (reqAmount += trans.amount));

  if(isLoading) return <div className="flex justify-center h-[50vh]"><span className="loading loading-bars loading-lg"></span></div>


  return (
    <div>
      <div className="stats shadow flex flex-col md:flex-row">
        <div className="stat place-items-center">
          <div className="stat-title">Total Balance</div>
          <div className="stat-value">{balance} Taka</div>
          <div className="stat-desc">Mobile: {user.mobile}</div>
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
          <div className="stat-title">Pending Request</div>
          <div className="stat-value">{reqAmount} Taka</div>
          <div className="stat-desc">
            Number of Request {numberOfReq.length}
          </div>
        </div>
      </div>

      <div>
        <BarChart
          width={500}
          height={300}
          data={transactions}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="process" />
          <YAxis />
          <Bar
            dataKey="amount"
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

export default UserStats;
