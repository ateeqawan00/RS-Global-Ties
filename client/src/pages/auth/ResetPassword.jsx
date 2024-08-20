import { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa6";
import { HiChevronLeft } from "react-icons/hi";
import { Link } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";
import { useSelector } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Error from "./Error";
import authBanner from "../../assets/images/authBanner.webp";

import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const ResetPassword = () => {
  const [data, setData] = useState({
    confirmPassword: "",
    password: "",
  });
  const forgotPassToken = useSelector((state) => state.user.forgotPassToken);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        "/forget-password/reset-password",
        { token: forgotPassToken, password: data.password }
      );
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      if (error.response) {
        setError(error.response.data?.error);
        toast.error(error.response.data?.error);
        localStorage.removeItem("forgotPassToken");
      } else {
        console.error("Error occurred during password reset:", error);
      }
    }
  };
  return (
    <>
      <Helmet>
        <title>{`Reset Password - RSGlobalTies`}</title>
        <meta
          name="description"
          content="Get insights, ratings, and user reviews for various products."
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
        <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2 relative  flex-1 mt-32">
          <Link to={"/login"}>
            <div className="absolute top-[25px] left-[5px] flex justify-between items-center gap-1 text-gray-500 p-2 hover:shadow-md transition-all duration-300 ease-in-out rounded-md hover:cursor-pointer">
              <p>
                <HiChevronLeft size={30} />
              </p>
              <p>Back to Login</p>
            </div>
          </Link>
          <div className="max-w-[450px] mt-14 md:mt-6 lg:mt-0">
            <h1 className="mb-1 text-2xl font-bold  font-inter text-black">
              Reset Password{" "}
            </h1>
            <p className="font-inter text-captiongray font-[18px] not-italic leading-7 mb-8">
              Set a new password for your account so you can log in and access
              all the features.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mb-2 relative">
                <label className="block mt-4 text-sm text-label font-inter mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    className="w-full bg-white h-[55px] px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    placeholder="**************"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={data?.password}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-700"
                  >
                    <FaRegEyeSlash />
                  </button>
                </div>
              </div>
              <div className="mb-2 relative">
                <label className="block mt-4 text-sm text-label font-inter mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    className="w-full bg-white h-[55px] px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    placeholder="**************"
                    type="password"
                    name="confirmPassword"
                    onChange={handleChange}
                    value={data?.confirmPassword}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-700"
                  >
                    <FaRegEyeSlash />
                  </button>
                </div>
              </div>

              {error && <Error errorMessage={error} />}

              <button
                type="submit"
                className="block w-full px-4 py-2 mt-4 mb-4 text-sm font-medium leading-5 text-center h-[55px] text-white transition-colors duration-150 bg-btnprimary border border-transparent rounded-lg active:bg-btnprimary hover:bg-btnhover focus:outline-none focus:shadow-outline-blue"
              >
                Reset Password
              </button>
            </form>
          </div>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
