import { Link } from "react-router-dom";
import imgBg from "../assets/imgBg.png";
import useAxiosCommon from "../Hooks/useAxiosCommon";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const axiosCommon = useAxiosCommon();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const mobile = form.mobile.value;
    const pin = form.pin.value;

    const userData = {
      mobile,
      pin,
    };

    try {
      const result = await axiosCommon.post(`/login`, userData);
      const { token, user } = result.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      
      Swal.fire({
        title: "Success!",
        text: "Login Successfully",
        icon: "success",
        timer: 1500,
      }).then(() => {
        //navigate("/dashboard")
         window.location.href = "/dashboard";
      });
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <div className="flex md:flex-row flex-col items-center justify-center px-3 md:px-24">
      <Helmet>
          <title>InstaCash | Login</title>
      </Helmet>

      <div className="md:w-1/2">
        <img className="w-[600px] md:h-[600px]" src={imgBg} alt="" />
      </div>

      <div className="md:w-1/2 px-2 md:px-14 space-y-4">
        <h2 className="text-4xl font-semibold text-center pb-3">
          Login Please!
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block mb text-sm">Mobile Or Email</label>
              <div className="mt-2 relative">
                <input
                  type="text"
                  name="mobile"
                  required
                  placeholder="Enter Mobile Or Email"
                  className="w-full p-3 border rounded-md border-gray-400 text-gray-900"
                />
              </div>
            </div>

            <div>
              <label className="block mb text-sm">PIN Number</label>
              <div className="mt-2 relative">
                <input
                  type="number"
                  name="pin"
                  required
                  placeholder="Enter Pin Number"
                  className="w-full p-3 border rounded-md border-gray-400 text-gray-900"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="bg-purple-700 font-semibold w-full rounded-md text-center py-3 text-white"
              >
                Sign In
              </button>
            </div>
          </div>
        </form>

        <div>
          <p className="text-lg">
            Are you new ?{" "}
            <Link className="font-semibold text-purple-600" to={"/Register"}>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
