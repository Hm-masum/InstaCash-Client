import { Cell, Legend, Pie, PieChart } from "recharts";
import useAuth from "../Hooks/useAuth";
import useBalance from "../Hooks/useBalance";
import useMyTransaction from "../Hooks/useMyTransaction";
import useTransactionRequest from "../Hooks/useTransactionRequest";

const AgentStats = () => {
  const { user } = useAuth();
  const [balance] = useBalance();
  const [transactionRequest, isLoading1] = useTransactionRequest();
  const [transactions, isLoading] = useMyTransaction();

  let reqAmount = 0;
  for (const trans of transactionRequest) {
    reqAmount += trans.amount;
  }

  let CashInAmount = 0,
    CashOutAmount = 0,
    transactionsAmount = 0;
  for (const trans of transactions) {
    if (trans.process === "Cash In") {
      CashInAmount += trans.amount;
    } else if (trans.process === "Cash Out") {
      CashOutAmount += trans.amount;
    }
    transactionsAmount += trans.amount;
  }

  if (isLoading || isLoading1)
    return (
      <div className="flex justify-center h-[50vh]">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );

  //Custom shape for pie chart

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const COLORS = ["#00C49F", "#FFBB28"];

  const data = [
    { name: "Cash In", value: CashInAmount },
    { name: "Cash Out", value: CashOutAmount },
  ];

  return (
    <div className="py-10">
      <div className="stats shadow flex flex-col md:flex-row animate__animated animate__fadeInDown animate__slow">
        <div className="stat place-items-center space-y-3">
          <div className="stat-title text-black">Total Balance</div>
          <div className="stat-value">{balance} Taka</div>
          <div className="stat-desc  text-black">Mobile: {user.mobile}</div>
        </div>

        <div className="stat place-items-center space-y-3">
          <div className="stat-title text-purple-700">Total Transaction</div>
          <div className="stat-value text-purple-700">
            {transactionsAmount} Taka
          </div>
          <div className="stat-desc text-purple-700">
            Number of Transaction {transactions.length}
          </div>
        </div>

        <div className="stat place-items-center space-y-3">
          <div className="stat-title text-black">Received Request</div>
          <div className="stat-value">{reqAmount} Taka</div>
          <div className="stat-desc text-black">
            Number of Request {transactionRequest.length}
          </div>
        </div>
      </div>

      <div className="flex justify-center animate__animated animate__fadeInUp animate__slow">
        <PieChart width={300} height={300}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend></Legend>
        </PieChart>
      </div>
    </div>
  );
};

export default AgentStats;
