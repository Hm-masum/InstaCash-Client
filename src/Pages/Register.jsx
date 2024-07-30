import { Link, useNavigate } from "react-router-dom";
import imgBg from "../assets/imgBg.png";
import useAxiosCommon from "../Hooks/useAxiosCommon";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const Register = () => {
  const axiosCommon = useAxiosCommon();
  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const mobile = form.mobile.value;
    const pin = form.pin.value;
    const role = form.role.value

    const userData = {
      name,
      email,
      mobile,
      pin,
      role
    };

    try {
      const result = await axiosCommon.post(`/users`, userData);
      console.log(result);
      
      Swal.fire({
        title: "Success!",
        text: "Registration Successful",
        icon: "success",
        confirmButtonText: "Cool",
      }).then(() => {
        navigate("/dashboard")
      });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div>
      <div className="flex md:flex-row-reverse flex-col items-center justify-center px-3 md:px-24">
        <div className="md:w-1/2">
          <img className="w-[600px] md:h-[600px]" src={imgBg} alt="" />
        </div>

        <div className="md:w-1/2 px-2 md:px-14 space-y-4">
          <h2 className="text-4xl font-semibold text-center pb-3">
            Register Please!
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block mb text-sm">Your Name</label>
                <div className="mt-2">
                  <input
                    type="name"
                    name="name"
                    required
                    placeholder="Enter Your name"
                    className="w-full p-3 border rounded-md border-gray-400 text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block mb text-sm">Email address</label>
                <div className="mt-2">
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Enter Your Email"
                    className="w-full p-3 border rounded-md border-gray-400 text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block mb text-sm">Mobile Number</label>
                <div className="mt-2 relative">
                  <input
                    type="number"
                    name="mobile"
                    required
                    placeholder="Enter Mobile Number"
                    className="w-full p-3 border rounded-md border-gray-400 text-gray-900"
                  />
                </div>
              </div>

              <div className="md:flex items-center gap-4">
                <div className="form-control md:w-1/2">
                  <label className="block text-sm">PIN Number</label>
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

                <div className="form-control md:w-1/2">
                  <label className="block text-sm">Role</label>
                  <div className="mt-2 relative">
                    <select name="role" id="role" className="select select-bordered w-full">
                        <option disabled selected>Choose the role?</option>
                        <option value='agent'>Agent</option>
                        <option value='user'>User</option>
                   </select>
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="bg-purple-700 font-semibold w-full rounded-md text-center py-3 text-white"
                >
                  Register
                </button>
              </div>
            </div>
          </form>

          <div>
            <p className="text-lg">
              Have an account?{" "}
              <Link className="font-semibold text-purple-600" to={"/login"}>
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
