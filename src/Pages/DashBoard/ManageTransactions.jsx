import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useNumOfRequest from "../../Hooks/useNumOfRequest";
import { Helmet } from "react-helmet-async";
import { Typewriter } from "react-simple-typewriter";

const ManageTransactions = () => {
  const axiosSecure = useAxiosSecure();
  const [numberOfReq, isLoading, refetch] = useNumOfRequest();

  const handleAccept = async (transaction) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Accept it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post(`/accept-req/${transaction._id}`).then((res) => {
          if (res.data.insertedId !== null) {
            refetch();
            Swal.fire({
              title: "Accepted!",
              text: "Transaction has been Accepted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handleDelete = async (transaction) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/transaction-req/${transaction._id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Transaction has been deleted.",
                icon: "success",
              });
            }
          });
      }
    });
  };

  if (isLoading)
    return (
      <div className="flex justify-center h-[50vh]">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );

  return (
    <div className="py-8">
      <Helmet>
        <title>InstaCash | Manage Transaction</title>
      </Helmet>

      <h2 className="text-3xl md:text-4xl font-semibold text-center">
        M
        <Typewriter
          words={["anage Transactions"]}
          loop={20}
          cursor
          cursorStyle=" "
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </h2>

      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 mt-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="bg-purple-700">
                <th
                  scope="col"
                  className="px-5 py-3 border-b border-gray-200 text-white  text-left text-sm uppercase font-normal"
                >
                  #
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 border-b border-gray-200 text-white  text-left text-sm uppercase font-normal"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 border-b border-gray-200 text-white  text-left text-sm uppercase font-normal"
                >
                  Donar
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 border-b border-gray-200 text-white  text-left text-sm uppercase font-normal"
                >
                  Recipient
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 border-b border-gray-200 text-white  text-left text-sm uppercase font-normal"
                >
                  Amount
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 border-b border-gray-200 text-white  text-left text-sm uppercase font-normal"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 border-b border-gray-200 text-white  text-left text-sm uppercase font-normal"
                >
                  Request
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 border-b border-gray-200 text-white  text-left text-sm uppercase font-normal"
                >
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {numberOfReq.map((transaction, index) => (
                <tr key={transaction._id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {index + 1}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {transaction.date}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {transaction.donar}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {transaction.recipient}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {transaction.amount}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {transaction.process}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <button
                      onClick={() => handleAccept(transaction)}
                      className="btn bg-purple-700 text-white btn-md"
                    >
                      Accept
                    </button>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <button
                      onClick={() => handleDelete(transaction)}
                      className="btn bg-purple-700 text-white btn-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageTransactions;
