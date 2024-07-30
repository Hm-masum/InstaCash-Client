import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import DashHome from "../Pages/DashBoard/DashHome";

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
        element: <DashHome></DashHome>,
      },
    ],
  },
]);

export default router;
