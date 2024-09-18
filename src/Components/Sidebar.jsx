import { useState } from "react";
import { AiOutlineBars } from "react-icons/ai";
import useAuth from "../Hooks/useAuth";
import { NavLink, useNavigate } from "react-router-dom";
import { GrLogout, GrSend } from "react-icons/gr";
import { FaFileExport, FaFileImport, FaUsers } from "react-icons/fa";
import toast from "react-hot-toast";
import logo from '../assets/logo.png'
import useRoles from "../Hooks/useRoles";
import { HiClipboardCheck } from "react-icons/hi";
import { IoDuplicateSharp, IoShieldHalf, IoStatsChartOutline } from "react-icons/io5";
import { HiClipboardDocument } from "react-icons/hi2";
import { CgProfile } from "react-icons/cg";
import useNumOfRequest from "../Hooks/useNumOfRequest";

const Sidebar = () => {
  const { logOut } = useAuth();
  const [isActive, setActive] = useState(false);
  const navigate = useNavigate();
  const [role,]=useRoles();
  const [numberOfReq,,] = useNumOfRequest();

  
  const handleToggle = () => {
    setActive(!isActive);
  };

  const handleLogout = async() => {
    try{
      await logOut()
      navigate("/login")
      toast.success("Successfully Logout");
    }
    catch(error){
      console.log(error.message)
    }
  }

  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden">
        <div className="block cursor-pointer p-3 font-bold">
          <NavLink to={`/dashboard`} className="flex justify-center items-center">
            <img src={logo} width="50" height="50" />
            <h2 className="text-xl">InstaCash</h2>
          </NavLink>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div className="w-full hidden text-white md:flex px-4 py-1 shadow-lg rounded-lg justify-center items-center bg-purple-700 mx-auto">
            <NavLink to={`/dashboard`} className="flex items-center justify-center">
              <img src={logo} width="45" height="45" />
              <h2 className="text-2xl font-semibold">InstaCash</h2>
            </NavLink>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav>

              {role === 'admin' && <NavLink
                to="/dashboard/all-users"
                end
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
                  }`
                }
              >
                <FaUsers className="w-5 h-5" />
                <span className="mx-4 font-medium">All Users</span>
              </NavLink>}

              {role === 'admin' && <NavLink
                to="/dashboard/all-transaction"
                end
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
                  }`
                }
              >
                <HiClipboardCheck className="w-5 h-5" />
                <span className="mx-4 font-medium">All Transaction</span>
              </NavLink>}

              {role === 'agent' && <NavLink
                to="/dashboard/manage-transactions"
                end
                className={({ isActive }) =>
                  `flex items-center pl-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
                  }`
                }
              >
                <IoShieldHalf className="w-5 h-5" />
                <span className="ml-4 mr-2 font-medium">Manage Transactions</span>
                <div className="badge bg-purple-700 text-white">{numberOfReq.length}</div>
              </NavLink>}

              {role === 'agent' && <NavLink
                to="/dashboard/my-transaction"
                end
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
                  }`
                }
              >
                <IoDuplicateSharp className="w-5 h-5" />
                <span className="mx-4 font-medium">My Transaction</span>
              </NavLink>}

              {role === 'agent' && <NavLink
                to="/dashboard/cash-in"
                end
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
                  }`
                }
              >
                <FaFileImport className="w-5 h-5" />
                <span className="mx-4 font-medium">Cash In</span>
              </NavLink>}

              {role === 'agent' && <NavLink
                to="/dashboard/cash-out"
                end
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
                  }`
                }
              >
                <FaFileExport className="w-5 h-5" />
                <span className="mx-4 font-medium">Cash Out</span>
              </NavLink>}

              {role === 'user' && <NavLink
                to="/dashboard/send-money"
                end
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
                  }`
                }
              >
                <GrSend className="w-5 h-5" />
                <span className="mx-4 font-medium">Send Money</span>
              </NavLink>}

              {role === 'user' && <NavLink
                to="/dashboard/cash-in"
                end
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
                  }`
                }
              >
                <FaFileImport className="w-5 h-5" />
                <span className="mx-4 font-medium">Cash In</span>
              </NavLink>}

              {role === 'user' && <NavLink
                to="/dashboard/cash-out"
                end
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
                  }`
                }
              >
                <FaFileExport className="w-5 h-5" />
                <span className="mx-4 font-medium">Cash Out</span>
              </NavLink>}

              {role === 'user' && <NavLink
                to="/dashboard/my-request"
                end
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
                  }`
                }
              >
                <HiClipboardDocument className="w-5 h-5" />
                <span className="mx-4 font-medium">My Request</span>
                <div className="badge bg-purple-700 text-white">{numberOfReq.length}</div>
              </NavLink>}

              {role === 'user' && <NavLink
                to="/dashboard/my-transaction"
                end
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
                  }`
                }
              >
                <IoDuplicateSharp className="w-5 h-5" />
                <span className="mx-4 font-medium">My Transaction</span>
              </NavLink>}

              <NavLink
                to="/dashboard/statistics"
                end
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
                  }`
                }
              >
                <IoStatsChartOutline className="w-5 h-5" />
                <span className="mx-4 font-medium">My Stats</span>
              </NavLink>                       
            </nav>
          </div>
        </div>

        <div>
          <hr />
          <NavLink
            to="/dashboard/myProfile"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
              }`
            }
          >
            <CgProfile className="w-5 h-5" />
            <span className="mx-4 font-medium">Profile</span>
          </NavLink>

          <button
            onClick={handleLogout}
            className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />
            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
