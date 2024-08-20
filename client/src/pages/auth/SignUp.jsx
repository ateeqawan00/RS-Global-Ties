import { useState, useEffect } from "react"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6"
import { FcGoogle } from "react-icons/fc"
import { HiChevronLeft } from "react-icons/hi"
import { Link, useNavigate } from "react-router-dom"
import axiosInstance from "../../services/axiosInstance"
import { setUser } from "../../context/userSlice"
import { useDispatch } from "react-redux"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { Country } from "country-state-city"

import Error from "./Error"
import authBanner from "../../assets/images/authBanner.png"

import "react-phone-number-input/style.css"
import PhoneInput from "react-phone-number-input"
import { Helmet } from "react-helmet"

const SignUp = () => {
  const [error, setError] = useState("")
  const [isChecked, setIsChecked] = useState(false)
  const [data, setData] = useState({
    name: "",
    email: "",
    organizationName: "",
    country: "",
    organizationRegNo: "",
    password: "",
    confirmPassword: "",
    organizationAddress: "",
    accountType: "Buyer",
    companyType: "Sole Proprietor",
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(true)
  const [showConfirmPassword, setShowConfirmPassword] = useState(true)

  const [phoneNo, setPhoneNo] = useState()

  const countries = Country.getAllCountries()

  const handleChange = (e) => {
    e.preventDefault()
    const name = e.target.name
    const value = e.target.value
    setData({ ...data, [name]: value })
  }

  // console.log(data)

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!isChecked) {
      toast.error("Please accept the Terms and Conditions.")
      return
    }

    try {
      const response = await axiosInstance.post("/signUp", {
        fullName: data.name,
        email: data.email,
        companyName: data.organizationName,
        country: data.country,
        registrationNumber: data.organizationRegNo,
        mobileNumber: phoneNo,
        password: data.password,
        confirmPassword: data.confirmPassword,
        accountType: data.accountType,
        businessType: data.companyType,
      })
      // console.log(response)
      const userData = response?.data?.userData
      dispatch(setUser({ ...userData, token: response.data.token }))
      toast.success("Signup Successful!")
      navigate("/")
    } catch (error) {
      if (error.response) {
        // console.error('Error occurred during signup:', error.response.data.error);
        setError(error.response.data?.error)
        toast.error(error.response.data?.error)
      } else {
        console.error("Error occurred during signup:", error)
      }
    }
  }

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("")
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [error])

  return (
    <>
      <Helmet>
        <title>{`Signup - RSGlobalTies`}</title>
        <meta
          name='description'
          content='Signup to RSGlobalTies. Get insights, ratings, and user reviews for various products.'
        />
      </Helmet>
      <div className='flex  relative'>
        <div className='flex-2 h-full  md:h-auto md:w-1/2 md:block hidden'>
          <img
            className='object-cover  h-full  fixed '
            src={authBanner}
            alt='rs global ties banner'
          />
        </div>
        <div className='flex items-center justify-center p-6 sm:p-12 md:w-1/2 relative flex-1 '>
          <Link to={"/login"}>
            {" "}
            <div className='absolute top-[25px] left-[5px] flex justify-between items-center gap-1 text-gray-500 p-2 hover:shadow-md transition-all duration-300 ease-in-out rounded-md hover:cursor-pointer'>
              <p>
                <HiChevronLeft size={30} />
              </p>
              <p>Back</p>
            </div>{" "}
          </Link>
          <div className='max-w-[450px] mt-14 md:mt-6 lg:mt-0 md:max-h-[800px] overflow-y-scroll p-8 md:scrollbar-thumb-blue-300 md:scrollbar-thin md:scrollbar-thumb-rounded-scrollBarDefault md:scrollbar-track-blue-100'>
            <h1 className='mb-1 text-2xl font-bold  font-inter text-black'>
              Account SignUp
            </h1>
            <p className='font-inter text-captiongray font-[18px] not-italic leading-7 mb-8'>
              Become a member and enjoy exclusive promotions.
            </p>
            <form onSubmit={handleSubmit}>
              <div className='mb-2'>
                <label
                  className='block text-sm text-label font-inter mb-2'
                  htmlFor='fullname'
                >
                  Full Name
                </label>
                <input
                  type='text'
                  autoComplete='true'
                  id='fullname'
                  className='w-full h-[55px] px-4 py-2 text-sm  border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
                  placeholder=''
                  name='name'
                  value={data?.name}
                  onChange={handleChange}
                />
              </div>
              <div className='mb-2'>
                <label
                  className='block text-sm text-label font-inter mb-2'
                  htmlFor='emailaddress'
                >
                  Email Address
                </label>
                <input
                  type='email'
                  name='email'
                  onChange={handleChange}
                  value={data?.email}
                  autoComplete='true'
                  id='emailaddress'
                  className='w-full h-[55px] px-4 py-2 text-sm bg-white border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600'
                  placeholder=''
                />
              </div>
              <div className='mb-2'>
                <label
                  className='block text-sm text-label font-inter mb-2'
                  htmlFor='companyname'
                >
                  Company/Business Name
                </label>
                <input
                  type='text'
                  id='companyname'
                  name='organizationName'
                  onChange={handleChange}
                  value={data?.organizationName}
                  autoComplete='true'
                  className='w-full h-[55px] px-4 py-2 text-sm bg-white border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600'
                  placeholder=''
                />
              </div>
              <div className='mb-2'>
                <label
                  className='block text-sm text-label font-inter mb-2'
                  htmlFor='companyaddress'
                >
                  Company/Business Address
                </label>
                <input
                  id='companyaddress'
                  name='organizationAddress'
                  onChange={handleChange}
                  value={data?.organizationAddress}
                  autoComplete='true'
                  type='text'
                  className='w-full h-[55px] px-4 py-2 text-sm bg-white border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600'
                  placeholder=''
                />
              </div>
              <div className='mb-2'>
                <label
                  className='block text-sm text-label font-inter mb-2'
                  htmlFor='country'
                >
                  Country
                </label>
                <select
                  id='country'
                  name='country'
                  onChange={handleChange}
                  value={data?.country}
                  autoComplete='true'
                  className='w-full h-[55px] px-4 py-2 text-sm bg-white border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600'
                  required
                >
                  <option value='' hidden>
                    Select a country
                  </option>
                  {countries &&
                    countries.map((country) => (
                      <option value={country.name}>{country.name}</option>
                    ))}
                </select>
              </div>
              <div className='mb-2'>
                <label
                  className='block text-sm text-label font-inter mb-2'
                  htmlFor='companyregno'
                >
                  Company/Business Registeration Number
                </label>
                <input
                  id='companyregno'
                  name='organizationRegNo'
                  value={data?.organizationRegNo}
                  onChange={handleChange}
                  type='number'
                  autoComplete='true'
                  className='w-full h-[55px] px-4 py-2 text-sm bg-white border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600'
                  placeholder=''
                />
              </div>
              <div className='mb-2'>
                <label
                  className='block text-sm text-label font-inter mb-2'
                  htmlFor='companyphno'
                >
                  Company/Business Mobile Number
                </label>
                <PhoneInput
                  placeholder='Enter phone number'
                  name='organizationPhone'
                  id='organizationPhone'
                  value={phoneNo}
                  onChange={setPhoneNo}
                  className='w-full h-[55px] px-4 py-2 text-sm bg-white border rounded-md'
                  required
                />
              </div>

              <div className='mb-2 relative'>
                <label
                  className='block mt-4 text-sm text-label font-inter mb-2'
                  htmlFor='password'
                >
                  Password
                </label>
                <div className='relative'>
                  <input
                    id='password'
                    name='password'
                    className='w-full h-[55px] px-4 py-2 text-sm bg-white border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600'
                    placeholder='********'
                    type={`${showPassword ? "password" : "text"}`}
                    onChange={handleChange}
                    value={data?.password}
                  />
                  <button
                    type='button'
                    className='absolute inset-y-0 right-0 flex items-center px-3 text-gray-700'
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                  </button>
                </div>
              </div>
              <div className='mb-2 relative'>
                <label
                  className='block mt-4 text-sm text-label font-inter mb-2'
                  htmlFor='confirmpassword'
                >
                  Confirm Password
                </label>
                <div className='relative'>
                  <input
                    className='w-full h-[55px] px-4 py-2 text-sm bg-white border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600'
                    placeholder=''
                    name='confirmPassword'
                    onChange={handleChange}
                    value={data?.confirmPassword}
                    id='confirmpassword'
                    type={`${showConfirmPassword ? "password" : "text"}`}
                  />
                  <button
                    type='button'
                    className='absolute inset-y-0 right-0 flex items-center px-3 text-gray-700'
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                  </button>
                </div>
              </div>

              <div className='radio-account-container'>
                <h3 className='block mt-4 text-sm text-label font-inter mb-2'>
                  Choose Account Type
                </h3>
                <ul className='items-center w-full text-sm  text-black font-normal text-[14px] bg-white   rounded-lg sm:flex'>
                  <li className='w-full'>
                    <div className='flex items-center ps-3'>
                      <input
                        defaultChecked
                        type='radio'
                        value='Buyer'
                        onChange={handleChange}
                        name='accountType'
                        id='buyer'
                        className='w-4 h-4 text-blue-600 bg-white border-gray-300 focus:ring-blue-500  '
                      />
                      <label
                        htmlFor='Buyer'
                        className='w-full py-3 ms-2 text-sm  text-black font-normal text-[14px] '
                      >
                        Buyer
                      </label>
                    </div>
                  </li>
                  <li className='w-full'>
                    <div className='flex items-center ps-3'>
                      <input
                        type='radio'
                        value='Supplier'
                        onChange={handleChange}
                        id='Supplier'
                        name='accountType'
                        className='w-4 h-4 text-blue-600 bg-white border-gray-300 focus:ring-blue-500  '
                      />
                      <label
                        htmlFor='Supplier'
                        className='w-full py-3 ms-2 text-sm  text-black font-normal text-[14px] '
                      >
                        Supplier
                      </label>
                    </div>
                  </li>
                  <li className='w-full'>
                    <div className='flex items-center ps-3'>
                      <input
                        type='radio'
                        value='Service Provider'
                        onChange={handleChange}
                        id='Service Provider'
                        name='accountType'
                        className='w-4 h-4 text-blue-600 bg-white border-gray-300 focus:ring-blue-500  '
                      />
                      <label
                        htmlFor='Service Provider'
                        className='w-full py-3 ms-2 text-sm  text-black font-normal text-[14px] whitespace-nowrap'
                      >
                        Service Provider
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
              <div className='radio-company-container'>
                <div className='radio-country-container'>
                  <h3 className='block mt-4 text-sm text-label font-inter mb-2'>
                    Company / Business Type
                  </h3>
                  <ul className='items-center w-full text-sm  text-black font-normal text-[14px] bg-white   rounded-lg sm:flex'>
                    <li className='w-full'>
                      <div className='flex items-center ps-3'>
                        <input
                          defaultChecked
                          type='radio'
                          value='Sole Proprietor'
                          onChange={handleChange}
                          id='Sole Proprietor'
                          name='companyType'
                          className='w-4 h-4 text-blue-600 bg-white border-gray-300 focus:ring-blue-500  '
                        />
                        <label
                          htmlFor='Sole Proprietor'
                          className='w-full py-3 ms-2 text-sm  text-black font-normal text-[14px] '
                        >
                          Sole Proprietor
                        </label>
                      </div>
                    </li>
                    <li className='w-full'>
                      <div className='flex items-center ps-3'>
                        <input
                          type='radio'
                          value='Partnership'
                          onChange={handleChange}
                          id='Partnership'
                          name='companyType'
                          className='w-4 h-4 text-blue-600 bg-white border-gray-300 focus:ring-blue-500  '
                        />
                        <label
                          htmlFor='Partnership'
                          className='w-full py-3 ms-2 text-sm  text-black font-normal text-[14px] '
                        >
                          Partnership
                        </label>
                      </div>
                    </li>
                    <li className='w-full'>
                      <div className='flex items-center ps-3'>
                        <input
                          type='radio'
                          value='Company'
                          onChange={handleChange}
                          id='Company'
                          name='companyType'
                          className='w-4 h-4 text-blue-600 bg-white border-gray-300 focus:ring-blue-500  '
                        />
                        <label
                          htmlFor='Company'
                          className='w-full py-3 ms-2 text-sm  text-black font-normal text-[14px] whitespace-nowrap'
                        >
                          Company
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className='flex items-start mb-2 mt-2'>
                <div className='flex items-center h-5'>
                  <input
                    id='terms'
                    aria-describedby='terms'
                    type='checkbox'
                    className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 '
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    // defaultChecked
                  />
                </div>
                <div className='ml-3 text-sm'>
                  <label htmlFor='terms' className='font-light text-gray-500'>
                    I accept the{" "}
                    <Link
                      to={"/privacy-policy"}
                      className='font-medium text-blue-600 hover:underline'
                      target='_blank'
                    >
                      Terms and Conditions
                    </Link>
                  </label>
                </div>
              </div>

              {error && <Error errorMessage={error} />}

              <button className='block w-full px-4 py-2 mt-4 mb-4 text-sm font-medium leading-5 text-center h-[55px] text-white transition-colors duration-150 bg-btnprimary border border-transparent rounded-lg active:bg-btnprimary hover:bg-btnhover focus:outline-none focus:shadow-outline-blue'>
                Register{" "}
              </button>

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
  )
}

export default SignUp
