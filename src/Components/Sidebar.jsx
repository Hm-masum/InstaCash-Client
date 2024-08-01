import { useState } from "react";
import { AiOutlineBars } from "react-icons/ai";
import useAuth from "../Hooks/useAuth";
import { NavLink, useNavigate } from "react-router-dom";
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { FaUsers } from "react-icons/fa";
import toast from "react-hot-toast";
import logo from '../assets/—Pngtree—letter i 3d company logo_4173422.png'
import useRoles from "../Hooks/useRoles";

const Sidebar = () => {
  const { logOut } = useAuth();
  const [isActive, setActive] = useState(false);
  const navigate = useNavigate();
  const [role,]=useRoles();

  

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
          <div className="flex justify-center items-center gap-2">
            <img src={logo} width="50" height="50" />
            <h2 className="text-xl">InstaCash</h2>
          </div>
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
          <div className="w-full hidden md:flex px-4 py-1 shadow-lg rounded-lg justify-center items-center bg-purple-300 mx-auto">
            <div className="flex items-center justify-center gap-1">
              <img src={logo} width="45" height="45" />
              <h2 className="text-2xl font-semibold">InstaCash</h2>
            </div>
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
                <FaUsers className="w-5 h-5" />
                <span className="mx-4 font-medium">All Transaction</span>
              </NavLink>}

              {role === 'agent' && <NavLink
                to="/dashboard/manage-transactions"
                end
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
                  }`
                }
              >
                <FaUsers className="w-5 h-5" />
                <span className="mx-4 font-medium">Manage Transactions</span>
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
                <FaUsers className="w-5 h-5" />
                <span className="mx-4 font-medium">My Transaction</span>
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
                <FaUsers className="w-5 h-5" />
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
                <FaUsers className="w-5 h-5" />
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
                <FaUsers className="w-5 h-5" />
                <span className="mx-4 font-medium">Cash Out</span>
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
                <FaUsers className="w-5 h-5" />
                <span className="mx-4 font-medium">My Transaction</span>
              </NavLink>}
                        
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
            <FcSettings className="w-5 h-5" />
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
