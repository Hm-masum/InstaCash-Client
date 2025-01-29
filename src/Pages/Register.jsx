import { Link, useNavigate } from "react-router-dom";
import imgBg from "../assets/imgBg.png";
import useAxiosCommon from "../Hooks/useAxiosCommon";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { imageUpload } from "../utils/ImgBB_api";
import { Helmet } from "react-helmet-async";
import "animate.css";

const Register = () => {
  const axiosCommon = useAxiosCommon();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const mobile = form.mobile.value;
    const pin = form.pin.value;
    const role = form.role.value;
    const image = form.image.files[0];

    if (pin.length !== 5) {
      return toast.error("pin must be 5 numbers");
    }

    try {
      const image_url = await imageUpload(image);

      const userData = {
        name,
        email,
        mobile,
        pin,
        role,
        image_url,
      };

      const result = await axiosCommon.post(`/users`, userData);

      if (result.data.insertedId !== null) {
        Swal.fire({
          title: "Success!",
          text: "Registration Successful",
          icon: "success",
          timer: 1500,
        }).then(() => {
          navigate("/login");
        });
      } else {
        toast.error("user already exist");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div>
      <Helmet>
        <title>InstaCash | Register</title>
      </Helmet>

      <div className="flex md:flex-row-reverse flex-col items-center justify-center px-3 md:px-24">
        <div className="md:w-1/2 animate__animated animate__fadeInRight animate__slow">
          <img className="w-[600px] md:h-[600px]" src={imgBg} alt="" />
        </div>

        <div className="md:w-1/2 px-2 md:px-14 space-y-4 animate__animated animate__fadeInLeft animate__slow">
          <h2 className="text-4xl font-semibold text-center pb-3">
            Register Please!
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="space-y-3 text-black text-xl">
              <div>
                <label className="block text-sm">Your Name</label>
                <div className="mt-1">
                  <input
                    type="name"
                    name="name"
                    required
                    placeholder="Enter Your name"
                    className="w-full p-[10px] border rounded-md border-gray-400 text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm">Email address</label>
                <div className="mt-1">
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Enter Your Email"
                    className="w-full p-[10px] border rounded-md border-gray-400 text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm">Mobile Number</label>
                <div className="mt-1 relative">
                  <input
                    type="number"
                    name="mobile"
                    required
                    placeholder="Enter Mobile Number"
                    className="w-full p-[10px] border rounded-md border-gray-400 text-gray-900"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-3">
                <div className="form-control md:w-1/2">
                  <label className="block text-sm">PIN Number</label>
                  <div className="mt-1 relative">
                    <input
                      type="number"
                      name="pin"
                      required
                      placeholder="Enter Pin Number"
                      className="w-full p-[10px] border rounded-md border-gray-400 text-gray-900"
                    />
                  </div>
                </div>

                <div className="form-control md:w-1/2">
                  <label className="block text-sm">Role</label>
                  <div className="mt-1 relative">
                    <select
                      name="role"
                      id="role"
                      className="select select-bordered w-full"
                      defaultValue={"user"}
                    >
                      <option disabled selected>
                        Choose the role?
                      </option>
                      <option value="agent">Agent</option>
                      <option value="user">User</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm">Select Your Photo</label>
                <div className="mt-1 relative">
                  <input
                    type="file"
                    id="image"
                    name="image"
                    className="file-input file-input-bordered w-full"
                  />
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
