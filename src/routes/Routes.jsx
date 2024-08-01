import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import PrivateRoutes from "./PrivateRoutes";
import MyProfile from "../Pages/DashBoard/MyProfile";
import DashHome from "../Layouts/DashHome";
import ManageTransactions from "../Pages/DashBoard/ManageTransactions";
import CashOut from "../Pages/DashBoard/CashOut";
import SendMoney from "../Pages/DashBoard/SendMoney";
import CashIn from "../Pages/DashBoard/CashIn";
import MyTransactions from "../Pages/DashBoard/MyTransactions";
import AllUsers from "../Pages/DashBoard/AllUsers";
import AllTransactions from "../Pages/DashBoard/AllTransactions";
import AdminRoutes from "./AdminRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/dashboard",
        element: <PrivateRoutes><DashHome></DashHome></PrivateRoutes>,
        children: [
          {
            index: true,
            element: <PrivateRoutes><MyProfile></MyProfile></PrivateRoutes>,
          },
          {
            path: "all-users",
            element: <PrivateRoutes><AdminRoutes><AllUsers></AllUsers></AdminRoutes></PrivateRoutes>,
          },
          {
            path: "all-transaction",
            element: <PrivateRoutes><AdminRoutes><AllTransactions></AllTransactions></AdminRoutes></PrivateRoutes>,
          },
          {
            path: "manage-transactions",
            element: <PrivateRoutes><ManageTransactions></ManageTransactions></PrivateRoutes>,
          },
          {
            path: "my-transaction",
            element: <PrivateRoutes><MyTransactions></MyTransactions></PrivateRoutes>,
          },
          {
            path: "cash-out",
            element: <PrivateRoutes><CashOut></CashOut></PrivateRoutes>,
          },
          {
            path: "cash-in",
            element: <PrivateRoutes><CashIn></CashIn></PrivateRoutes>,
          },
          {
            path: "send-money",
            element: <PrivateRoutes><SendMoney></SendMoney></PrivateRoutes>,
          },
          {
            path: "myProfile",
            element: <PrivateRoutes><MyProfile></MyProfile></PrivateRoutes>,
          },
        ]
      },
    ],
  },
]);

export default router;
