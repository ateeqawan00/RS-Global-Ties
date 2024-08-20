import { useState, useRef } from "react";
import { HiChevronLeft } from "react-icons/hi";
import { Link } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { setForgotPassToken } from "../../context/userSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Error from "./Error";
import authBanner from "../../assets/images/authBanner.webp";

import { useNavigate } from "react-router-dom";

import { Helmet } from "react-helmet";

const Otp = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const forgotPassToken = useSelector((state) => state.user.forgotPassToken);
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    // Move focus to the next input
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    try {
      const response = await axiosInstance.post(
        "/forget-password/verify-code",
        { token: forgotPassToken, otp: otpValue }
      );
      dispatch(setForgotPassToken(response.data.token));
      toast.success(response.data.message);
      navigate("/reset-password");
    } catch (error) {
      if (error.response) {
        setError(error.response.data?.error);
        toast.error(error.response.data?.error);
      } else {
        console.error("Error occurred:", error);
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>{`OTP - RSGlobalTies`}</title>
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
        <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2 relative  gap-4 flex-1 mt-32">
          <Link to={"/login"}>
            <div className="absolute top-[25px] left-[5px] flex justify-between items-center  text-gray-500 p-2 hover:shadow-md transition-all duration-300 ease-in-out rounded-md hover:cursor-pointer">
              <p>
                <HiChevronLeft size={30} />
              </p>
              <p>Back to Login</p>
            </div>
          </Link>
          <div className="max-w-[450px] mt-14 md:mt-6 lg:mt-0">
            <form onSubmit={handleSubmit}>
              <h1 className="mb-1 text-2xl font-bold font-inter text-black">
                Enter the OTP
              </h1>
              <p className="font-inter text-captiongray font-[18px] not-italic leading-7 mb-8">
                Please enter the OTP sent to your email or phone number.
              </p>

              <div className="flex mb-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    className="w-1/4 bg-white h-[55px] px-4 py-2 text-sm border rounded-md mr-2 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    placeholder=""
                    value={digit}
                    ref={(el) => (inputRefs.current[index] = el)}
                    onChange={(e) => handleChange(index, e.target.value)}
                  />
                ))}
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

export default Otp;
