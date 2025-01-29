import { Helmet } from "react-helmet-async";
import useAuth from "../../Hooks/useAuth";
import useBalance from "../../Hooks/useBalance";
import bg from "../../assets/bg1.jpg";

const MyProfile = () => {
  const { user } = useAuth();
  const [balance] = useBalance();

  return (
    <div className="flex justify-center items-center lg:h-[80vh]">
      <Helmet>
        <title>InstaCash | My Profile</title>
      </Helmet>

      <div className="bg-white shadow-lg rounded-2xl w-full md:w-3/5">
        <img alt="profile" src={bg} className="w-full mb-4 rounded-t-lg h-36" />
        <div className="flex flex-col items-center justify-center p-4 -mt-16">
          <a href="#" className="relative block">
            <img
              alt="profile"
              src={user?.image_url}
              className="mx-auto object-cover rounded-full h-24 w-24  border-2 border-white "
            />
          </a>

          <p className="p-2 uppercase px-4 text-xs text-white bg-purple-700 rounded-full">
            {user?.role}
          </p>
          <p className="mt-2 text-xl font-medium text-gray-800 ">
            <span className="font-semibold">Mobile No : </span>
            {user?.mobile}
          </p>
          <div className="w-full p-2 mt-4 rounded-lg">
            <div className="text-sm text-center text-gray-600">
              <p>
                <span className="font-semibold">Name : </span>
                {user?.name}
              </p>
              <p>
                <span className="font-semibold">Email : </span>
                {user?.email}
              </p>
              <p>
                <span className="font-semibold">Balance : </span>
                {balance} Taka
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
