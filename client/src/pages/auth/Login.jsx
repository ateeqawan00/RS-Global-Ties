import { useEffect, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { HiChevronLeft } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";
import { setUser } from "../../context/userSlice";
import { useDispatch } from "react-redux";
import Error from "./Error";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authBanner from "../../assets/images/authBanner.png";
import { Helmet } from "react-helmet";
const Login = () => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/login", data);
      const userData = response?.data?.userData;
      const token = response?.data?.token;
      dispatch(setUser({ ...userData, token }));
      toast.success("Login Successful!");
      if (response.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data?.error);
        toast.error(error.response.data?.error);
      } else {
        console.error("Error occurred during login:", error);
      }
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <>
      <Helmet>
        <title>{`Login - RSGlobalTies`}</title>
        <meta
          name="description"
          content="Login to RSGlobalTies. Get insights, ratings, and user reviews for various products."
        />
      </Helmet>
      <div className="flex  relative">
        <div className="flex-2 h-full  md:h-auto md:w-1/2 md:block hidden">
          <img
            className="object-cover  h-full  fixed "
            src={authBanner}
            alt="rs global ties banner"
          />
        </div>
        <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2 relative flex-1 mt-20">
          <div className="absolute top-[25px] left-[5px] flex justify-between items-center gap-1 text-gray-500 p-2 hover:shadow-md transition-all duration-300 ease-in-out rounded-md hover:cursor-pointer">
            <Link to={"/"}>
              <p>
                <HiChevronLeft size={30} />
              </p>
            </Link>
          </div>
          <div className="max-w-[450px] mt-14 md:mt-6 lg:mt-0">
            <form onSubmit={handleSubmit}>
              <h1 className="mb-1 text-2xl font-bold  font-inter text-black">
                Account Login
              </h1>
              <p className="font-inter text-captiongray font-[18px] not-italic leading-7 mb-8">
                If you are already a member you can login with your email
                address and password.
              </p>
              <div className="mb-2">
                <label className="block text-sm text-label font-inter mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={data?.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white h-[55px] px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  placeholder=""
                />
              </div>
              <div className="mb-2 relative">
                <label className="block mt-4 text-sm text-label font-inter mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    className="w-full bg-white h-[55px] px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    placeholder=""
                    type={`${showPassword ? "password" : "text"}`}
                    name="password"
                    required
                    value={data?.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                      checked
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="font-light text-gray-500 "
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <div>
                  <Link
                    className="text-sm font-inter hover:underline text-blue-600"
                    to={"/forgot-password"}
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>

              {error && <Error errorMessage={error} />}

              <button
                type="submit"
                className="block w-full px-4 py-2 mt-4 mb-4 text-sm font-medium leading-5 text-center h-[55px] text-white transition-colors duration-150 bg-btnprimary border border-transparent rounded-lg active:bg-btnprimary hover:bg-btnhover focus:outline-none focus:shadow-outline-blue"
              >
                Log in
              </button>
              <p className="text-[14px] font-semibold text-gray-500  text-center mb-4">
                Don&apos;t have an account?{" "}
                <Link
                  to={"/signup"}
                  className="font-medium text-[14px] text-blue-600 hover:underline "
                >
                  Sign Up Here
                </Link>
              </p>

              {/* <div className="flex items-center justify-center gap-4">
            <button className="flex items-center justify-center w-full px-4 py-2 text-md text-[#001D6C] border font-semibold font-inter hover:bg-[#ECF0F9] border-gray-300 rounded-lg hover:border-gray-500 focus:border-gray-500 h-[55px]">
              <FcGoogle size={25} className="mr-1" />
              Google
            </button>
          </div> */}
            </form>
          </div>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default Login;
