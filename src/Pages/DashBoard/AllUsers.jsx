import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Typewriter } from "react-simple-typewriter";

const AllUsers = () => {
    const axiosSecure=useAxiosSecure()
    const [search,setSearch]=useState("")
    const [searchText,setSearchText]=useState("")

    const {data: users=[],isLoading,refetch}=useQuery({
        queryKey: ["all-users"],
        queryFn: async () => {
            const {data} = await axiosSecure(`/all-users?search=${search}`);
            return data;
        }
    })

    const handleSearch = (e) => {
       e.preventDefault();
       setSearch(searchText);
       refetch();
    }

    const handleActivate = (user)=>{
        axiosSecure.patch(`/user/activate/${user._id}`,{user}).then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire({
                icon: "success",
                title: "Activate",
                text : `${user.name} has been activate`,
                showConfirmButton: false,
                timer: 1500,
              });
            }
        });
    }

    const handleBlock = (user)=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Block it!",
          }).then((result) => {
            if (result.isConfirmed) {
              axiosSecure.patch(`/user/block/${user._id}`).then((res) => {
                if (res.data.modifiedCount > 0) {
                  refetch();
                  Swal.fire({
                    title: "Blocked!",
                    text: `${user.name} has been blocked.`,
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                }
              });
            }
          });
    }

    if(isLoading) return <div className="flex justify-center h-[50vh]"><span className="loading loading-bars loading-lg"></span></div>


  return (
    <div>
      <Helmet>
          <title>InstaCash | All Users</title>
      </Helmet>
      
      <div className="py-8">

        <h2 className="text-3xl md:text-4xl font-semibold text-center">
          <Typewriter
            words={['All Users']}
            loop={20}
            cursor
            cursorStyle=' '
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </h2>

        <form onSubmit={handleSearch} className="join py-6">
          <input
            name="search"
            onChange={(e)=>setSearchText(e.target.value)}
            value={searchText}
            className="input input-bordered join-item"
            placeholder="Enter Name"
          />
          <button className="btn join-item bg-purple-700 text-white">Search</button>
        </form>

        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    Mobile
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    Balance
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    Activate
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    Block
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {index+1}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {user.name}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {user.mobile}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {user.email}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {user.balance.toFixed(2)}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {user.status}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                       { user.status== "activate" ? <p>activate</p> :
                         <button onClick={()=>handleActivate(user)} className="btn btn-sm bg-purple-600 text-white">
                           Activate
                         </button>
                       }
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        { user.status== "block" ? <p>block</p> :
                          <button onClick={()=>handleBlock(user)} className="btn btn-sm bg-purple-600 text-white">
                             Block
                          </button>
                        }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
