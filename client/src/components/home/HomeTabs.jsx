import { useEffect, useMemo, useRef, useState } from "react"
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react"
import { homeTabsData } from "../../data/homepageData"
import { MdOutlineVerifiedUser } from "react-icons/md"
import { CircleFlag } from "react-circle-flags"
import Rating from "react-rating"
import ratingStarPlaceholder from "../../assets/images/star-yellow.png"
import { GoMail } from "react-icons/go"
import axiosInstance from "../../services/axiosInstance"
import { Link, useNavigate } from "react-router-dom"

import { format } from "date-fns"
import { useDispatch, useSelector } from "react-redux"

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { setProducts as SP } from "../../context/productSlice"

import { Country } from "country-state-city"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/scrollbar"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6"

export default function HomeTabs() {
  const user = useSelector((state) => state.user.user)

  const [activeTab, setActiveTab] = useState("Buyer")
  const [products, setProducts] = useState()
  const [services, setServices] = useState()
  const [servicesAsProvider, setServicesAsProvider] = useState()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const swiperRef = useRef(null)

  const countries = useMemo(() => Country.getAllCountries(), [])

  const handleSelectCountry = (e) => {
    navigate(`/category/filter-by-country/${e.target.value}`)
  }

  const handleSelectPlatinumMember = (e) => {
    navigate(`/category/filter-by-platinum-members/${e.target.value}`)
  }

  const handleTabClick = (value) => {
    setActiveTab(value)
  }

  const handleSendMessage = async (receiverId) => {
    if (!user) {
      toast.error("Login to send a message.")
      return
    }

    try {
      const response = await axiosInstance.post(
        "/chat/createChat",
        { receiverId },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )

      // console.log("chat response: ", response)

      if (response.status === 200) {
        navigate("/dashboard/chat")
      }
    } catch (error) {
      console.error("chat error", error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosInstance.get("/product/getProduct")
        setProducts(data)
        dispatch(SP(data))
        if (activeTab === "Buyer") {
          const { data } = await axiosInstance.get(
            "/Requirements/getLatestRequirements"
          )
          // console.log(data)
          setServices(data)
        }
        if (activeTab === "Service Provider As Provider") {
          const { data } = await axiosInstance.get(
            "/service/getAllServicesForProvider"
          )
          setServicesAsProvider(data)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [activeTab])

  // console.log("All requirements: ", services)
  // console.log("products: ", products)
  // console.log(selectedCountry)
  // console.log("services as provider: ", servicesAsProvider)

  return (
    <Tabs value={activeTab} className='p-4'>
      <ToastContainer />
      <TabsHeader
        className='flex-wrap 800px:flex-nowrap bg-[#ECF0F9] gap-2'
        indicatorProps={{
          className: "hidden shadow-none rounded-none",
        }}
      >
        {homeTabsData.map(({ label, value }) => (
          <Tab
            key={value}
            value={value}
            onClick={() => handleTabClick(value)}
            className={`z-[99] py-2 px-4 ${
              activeTab === value
                ? "!bg-gradient-to-b !from-blue-500 !to-indigo-900 !text-white"
                : "bg-inherit"
            } hover:bg-gradient-to-b text-black from-blue-500 to-indigo-900 text-nowrap hover:text-white flex-1 rounded-md 500px:w-full hover:cursor-pointer`}
          >
            {label}
          </Tab>
        ))}
        <div className='dropdown flex-1'>
          <div
            tabIndex={0}
            role='button'
            className='rounded-md py-2 px-4 bg-[#ecf0f9] text-center  text-primary font-semibold'
          >
            <div className='flex items-center justify-center'>
              <select
                id='country'
                name='country'
                onChange={handleSelectCountry}
                // value={selectedCountry}
                className='w-56 h-[30px] bg-inherit border rounded-md focus:outline-none'
              >
                <option value='' hidden>
                  Select a country
                </option>
                {countries &&
                  countries.map((country) => (
                    <option value={country.name}>{country.name}</option>
                  ))}
              </select>
              {/* <p>Countries</p>
              <IoChevronDownOutline /> */}
            </div>
          </div>
        </div>

        <div className='dropdown flex-1'>
          <div className='rounded-md py-2 px-4 bg-[#ecf0f9] text-center  text-primary font-semibold'>
            <select
              id='handleSelectPlatinumMember'
              name='handleSelectPlatinumMember'
              onChange={handleSelectPlatinumMember}
              className='w-56 h-[30px] bg-inherit border rounded-md focus:outline-none'
            >
              <option value='' hidden>
                Members
              </option>
              <option value='free'>Free Member</option>
              <option value='silver'>Silver Member</option>
              <option value='gold'>Gold Member</option>
              <option value='platinum'>Platinum Member</option>
              {/* {platinumUsers &&
                platinumUsers.map((platinumUser) => (
                  <option value={platinumUser.userId}>
                    {platinumUser.fullName}
                  </option>
                ))} */}
            </select>
          </div>
        </div>
      </TabsHeader>
      <TabsBody className='flex overflow-x-auto'>
        {/* Services Section for Buyer */}
        {activeTab === "Buyer" && services && (
          <TabPanel
            value={activeTab}
            className='p-4 flex items-center justify-center'
          >
            <Swiper
              // spaceBetween={30}

              breakpoints={{
                0: {
                  slidesPerView: 1,
                  spaceBetween: 2,
                },
                390: {
                  slidesPerView: 1,
                  spaceBetween: 2,
                },
                480: {
                  slidesPerView: 1,
                  spaceBetween: 2,
                },
                785: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                960: { slidesPerView: 1, spaceBetween: 10 },
                1200: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
              }}
              modules={[Pagination, Scrollbar, A11y]}
              ref={swiperRef}
            >
              {services
                .filter((item) => item.user?.accountType === "Buyer")
                .map((item, index) => (
                  <SwiperSlide key={index}>
                    <div
                      key={index}
                      className='w-full p-4 rounded-md shadow-md border mb-6'
                    >
                      <div className=' flex  items-center justify-between gap-4 300px:flex-wrap '>
                        <h3 className='text-md font-semibold text-primary text-wrap'>
                          {item.latestRequirement.name}
                        </h3>
                        <div className='flex items-center gap-4'>
                          <p>
                            {item.memberType === "Gold Member" ? (
                              <p className='text-[#D4AF37] font-semibold'>
                                {item.memberType}
                              </p>
                            ) : (
                              "Premium Member"
                            )}
                          </p>
                          <div>
                            {item.user.isCompanyVerified === true ? (
                              <div className='flex items-center justify-center gap-1 text-green-500'>
                                <MdOutlineVerifiedUser
                                  size={20}
                                  fill='#22c55e'
                                />
                                <p>verified</p>
                              </div>
                            ) : (
                              "un-verified"
                            )}
                          </div>
                          <div>
                            <div className='flex items-center justify-center gap-1 text-green-500'>
                              <p>{item.latestRequirement.durationOfService}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='flex justify-start gap-2 font-semibold text-xl font-inter items-center mt-2 p-2'>
                        <CircleFlag countryCode='de' className='h-4' />
                        <h3>{user && item.user.fullName}</h3>
                        {!user && <>From {item.user.country}</>}
                      </div>
                      <p className='font-inter text-wrap'>
                        {item.latestRequirement.description}
                      </p>
                      <p className='font-inter text-wrap'>
                        {item.latestRequirement.professionalCertification}
                      </p>
                      <p className='font-inter text-wrap '>
                        {item.latestRequirement.skillsExpertiseNeeded}
                      </p>

                      <div className=' flex flex-col 500px:flex-row items-start  500px:items-center justify-between gap-4 500px:flex-wrap mt-4 '>
                        <div className='rating-container  self-start 500px:self-end flex items-center justify-center gap-6'>
                          <div className='flex items-center justify-center gap-4 '>
                            <Rating
                              readonly
                              placeholderRating={3}
                              emptySymbol={
                                <img
                                  src={ratingStarPlaceholder}
                                  className='icon w-[18px] grayscale'
                                />
                              }
                              placeholderSymbol={
                                <img
                                  src={ratingStarPlaceholder}
                                  className='icon w-[18px]'
                                />
                              }
                              fullSymbol={
                                <img
                                  src={ratingStarPlaceholder}
                                  className='icon w-[18px]'
                                />
                              }
                            />
                            <p className='mt-[-7px] font-bold'>3</p>
                          </div>
                          <div className='font-bold text-[12px]'>
                            {item.date}
                          </div>
                          <div className='font-bold text-[12px]'>
                            {item.serviceDeliveryMethod}
                          </div>
                        </div>
                        <button
                          className='btn bg-btnprimary text-white'
                          onClick={() => handleSendMessage(item.user._id)}
                        >
                          <div className='flex items-center justify-center gap-2'>
                            <GoMail size={20} fill='#fff' />
                            <p> Inquire Now</p>
                          </div>
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}

              <div className='flex absolute  top-[40%] -right-3 transform z-[999] bg-none items-center justify-center w-[45px] px-2 py-6 rounded-md hover:cursor-pointer '>
                <FaChevronRight
                  size={30}
                  color='#000'
                  onClick={() => swiperRef.current.swiper.slideNext()}
                />
              </div>
              <div className='flex absolute top-[40%] -left-3 transform z-[999] bg-none items-center justify-center w-[45px] px-2 py-6 rounded-md hover:cursor-pointer'>
                <FaChevronLeft
                  size={30}
                  color='#000'
                  onClick={() => swiperRef.current.swiper.slidePrev()}
                />
              </div>
            </Swiper>
          </TabPanel>
        )}

        {/* Services Section for supplier */}
        {activeTab === "Supplier" && services && (
          <TabPanel
            value={activeTab}
            className='p-4 flex items-center justify-center'
          >
            <Swiper
              // spaceBetween={30}

              breakpoints={{
                0: {
                  slidesPerView: 1,
                  spaceBetween: 2,
                },
                390: {
                  slidesPerView: 1,
                  spaceBetween: 2,
                },
                480: {
                  slidesPerView: 1,
                  spaceBetween: 2,
                },
                785: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                960: { slidesPerView: 1, spaceBetween: 10 },
                1200: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
              }}
              modules={[Pagination, Scrollbar, A11y]}
              ref={swiperRef}
            >
              {services
                .filter((item) => item.user?.accountType === "Supplier")
                .map((item, index) => (
                  <SwiperSlide key={index}>
                    <div
                      key={index}
                      className='w-full p-4 rounded-md shadow-md border mb-6'
                    >
                      <div className=' flex  items-center justify-between gap-4 300px:flex-wrap '>
                        <h3 className='text-md font-semibold text-primary text-wrap'>
                          {item.latestRequirement.name}
                        </h3>
                        <div className='flex items-center gap-4'>
                          <p>
                            {item.memberType === "Gold Member" ? (
                              <p className='text-[#D4AF37] font-semibold'>
                                {item.memberType}
                              </p>
                            ) : (
                              "Premium Member"
                            )}
                          </p>
                          <div>
                            {item.user.isCompanyVerified === true ? (
                              <div className='flex items-center justify-center gap-1 text-green-500'>
                                <MdOutlineVerifiedUser
                                  size={20}
                                  fill='#22c55e'
                                />
                                <p>verified</p>
                              </div>
                            ) : (
                              "un-verified"
                            )}
                          </div>
                          <div>
                            <div className='flex items-center justify-center gap-1 text-green-500'>
                              <p>{item.latestRequirement.durationOfService}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='flex justify-start gap-2 font-semibold text-xl font-inter items-center mt-2 p-2'>
                        <CircleFlag countryCode='de' className='h-4' />
                        <h3>{user && item.user.fullName}</h3>
                        {!user && <>From {item.user.country}</>}
                      </div>
                      <p className='font-inter text-wrap'>
                        {item.latestRequirement.description}
                      </p>
                      <p className='font-inter text-wrap'>
                        {item.latestRequirement.professionalCertification}
                      </p>
                      <p className='font-inter text-wrap '>
                        {item.latestRequirement.skillsExpertiseNeeded}
                      </p>

                      <div className=' flex flex-col 500px:flex-row items-start  500px:items-center justify-between gap-4 500px:flex-wrap mt-4 '>
                        <div className='rating-container  self-start 500px:self-end flex items-center justify-center gap-6'>
                          <div className='flex items-center justify-center gap-4 '>
                            <Rating
                              readonly
                              placeholderRating={3}
                              emptySymbol={
                                <img
                                  src={ratingStarPlaceholder}
                                  className='icon w-[18px] grayscale'
                                />
                              }
                              placeholderSymbol={
                                <img
                                  src={ratingStarPlaceholder}
                                  className='icon w-[18px]'
                                />
                              }
                              fullSymbol={
                                <img
                                  src={ratingStarPlaceholder}
                                  className='icon w-[18px]'
                                />
                              }
                            />
                            <p className='mt-[-7px] font-bold'>3</p>
                          </div>
                          <div className='font-bold text-[12px]'>
                            {item.date}
                          </div>
                          <div className='font-bold text-[12px]'>
                            {item.serviceDeliveryMethod}
                          </div>
                        </div>
                        <button
                          className='btn bg-btnprimary text-white'
                          onClick={() => handleSendMessage(item.user._id)}
                        >
                          <div className='flex items-center justify-center gap-2'>
                            <GoMail size={20} fill='#fff' />
                            <p> Inquire Now</p>
                          </div>
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}

              <div className='flex absolute  top-[40%] -right-3 transform z-[999] bg-none items-center justify-center w-[45px] px-2 py-6 rounded-md hover:cursor-pointer '>
                <FaChevronRight
                  size={30}
                  color='#000'
                  onClick={() => swiperRef.current.swiper.slideNext()}
                />
              </div>
              <div className='flex absolute top-[40%] -left-3 transform z-[999] bg-none items-center justify-center w-[45px] px-2 py-6 rounded-md hover:cursor-pointer'>
                <FaChevronLeft
                  size={30}
                  color='#000'
                  onClick={() => swiperRef.current.swiper.slidePrev()}
                />
              </div>
            </Swiper>
          </TabPanel>
        )}
        {/* Services Section for services provider */}

        {/* {activeTab === "Service Provider" &&
          services &&
          services.filter(
            (item) => item.user?.accountType === "Service Provider"
          ) && <>no available services</>} */}

        {activeTab === "Service Provider" && services && (
          <TabPanel
            value={activeTab}
            className='p-4 flex items-center justify-center'
          >
            <Swiper
              // spaceBetween={30}

              breakpoints={{
                0: {
                  slidesPerView: 1,
                  spaceBetween: 2,
                },
                390: {
                  slidesPerView: 1,
                  spaceBetween: 2,
                },
                480: {
                  slidesPerView: 1,
                  spaceBetween: 2,
                },
                785: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                960: { slidesPerView: 1, spaceBetween: 10 },
                1200: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
              }}
              modules={[Pagination, Scrollbar, A11y]}
              ref={swiperRef}
            >
              {services
                .filter((item) => item.user?.accountType === "Service Provider")
                .map((item, index) => (
                  <SwiperSlide key={index}>
                    <div
                      key={index}
                      className='w-full p-4 rounded-md shadow-md border mb-6'
                    >
                      <div className=' flex  items-center justify-between gap-4 300px:flex-wrap '>
                        <h3 className='text-md font-semibold text-primary text-wrap'>
                          {item.latestRequirement.name}
                        </h3>
                        <div className='flex items-center gap-4'>
                          <p>
                            {item.memberType === "Gold Member" ? (
                              <p className='text-[#D4AF37] font-semibold'>
                                {item.memberType}
                              </p>
                            ) : (
                              "Premium Member"
                            )}
                          </p>
                          <div>
                            {item.user.isCompanyVerified === true ? (
                              <div className='flex items-center justify-center gap-1 text-green-500'>
                                <MdOutlineVerifiedUser
                                  size={20}
                                  fill='#22c55e'
                                />
                                <p>verified</p>
                              </div>
                            ) : (
                              "un-verified"
                            )}
                          </div>
                          <div>
                            <div className='flex items-center justify-center gap-1 text-green-500'>
                              <p>{item.latestRequirement.durationOfService}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='flex justify-start gap-2 font-semibold text-xl font-inter items-center mt-2 p-2'>
                        <CircleFlag countryCode='de' className='h-4' />
                        <h3>{user && item.user.fullName}</h3>
                        {!user && <>From {item.user.country}</>}
                      </div>
                      <p className='font-inter text-wrap'>
                        {item.latestRequirement.description}
                      </p>
                      <p className='font-inter text-wrap'>
                        {item.latestRequirement.professionalCertification}
                      </p>
                      <p className='font-inter text-wrap '>
                        {item.latestRequirement.skillsExpertiseNeeded}
                      </p>

                      <div className=' flex flex-col 500px:flex-row items-start  500px:items-center justify-between gap-4 500px:flex-wrap mt-4 '>
                        <div className='rating-container  self-start 500px:self-end flex items-center justify-center gap-6'>
                          <div className='flex items-center justify-center gap-4 '>
                            <Rating
                              readonly
                              placeholderRating={3}
                              emptySymbol={
                                <img
                                  src={ratingStarPlaceholder}
                                  className='icon w-[18px] grayscale'
                                />
                              }
                              placeholderSymbol={
                                <img
                                  src={ratingStarPlaceholder}
                                  className='icon w-[18px]'
                                />
                              }
                              fullSymbol={
                                <img
                                  src={ratingStarPlaceholder}
                                  className='icon w-[18px]'
                                />
                              }
                            />
                            <p className='mt-[-7px] font-bold'>3</p>
                          </div>
                          <div className='font-bold text-[12px]'>
                            {item.date}
                          </div>
                          <div className='font-bold text-[12px]'>
                            {item.serviceDeliveryMethod}
                          </div>
                        </div>
                        <button
                          className='btn bg-btnprimary text-white'
                          onClick={() => handleSendMessage(item.user._id)}
                        >
                          <div className='flex items-center justify-center gap-2'>
                            <GoMail size={20} fill='#fff' />
                            <p> Inquire Now</p>
                          </div>
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}

              <div className='flex absolute  top-[40%] -right-3 transform z-[999] bg-none items-center justify-center w-[45px] px-2 py-6 rounded-md hover:cursor-pointer '>
                <FaChevronRight
                  size={30}
                  color='#000'
                  onClick={() => swiperRef.current.swiper.slideNext()}
                />
              </div>
              <div className='flex absolute top-[40%] -left-3 transform z-[999] bg-none items-center justify-center w-[45px] px-2 py-6 rounded-md hover:cursor-pointer'>
                <FaChevronLeft
                  size={30}
                  color='#000'
                  onClick={() => swiperRef.current.swiper.slidePrev()}
                />
              </div>
            </Swiper>
          </TabPanel>
        )}

        {activeTab === "Service Provider As Provider" &&
          services &&
          services.filter(
            (item) => item.user?.accountType === "Service Provider"
          ) && (
            <div className='text-center p-12'>
              no available services from providers
            </div>
          )}

        {activeTab === "Service Provider As Provider" && servicesAsProvider && (
          <TabPanel
            value={activeTab}
            className='p-4 flex items-center justify-center'
          >
            <Swiper
              // spaceBetween={30}

              breakpoints={{
                0: {
                  slidesPerView: 1,
                  spaceBetween: 2,
                },
                390: {
                  slidesPerView: 1,
                  spaceBetween: 2,
                },
                480: {
                  slidesPerView: 1,
                  spaceBetween: 2,
                },
                785: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                960: { slidesPerView: 1, spaceBetween: 10 },
                1200: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
              }}
              modules={[Pagination, Scrollbar, A11y]}
              ref={swiperRef}
            >
              {servicesAsProvider
                .filter((item) => item.user?.accountType === "Service Provider")
                .map((item, index) => (
                  <SwiperSlide key={index}>
                    <div
                      key={index}
                      className='w-full p-4 rounded-md shadow-md border mb-6'
                    >
                      <div className=' flex  items-center justify-between gap-4 300px:flex-wrap '>
                        <h3 className='text-md font-semibold text-primary text-wrap'>
                          {item.latestRequirement.name}
                        </h3>
                        <div className='flex items-center gap-4'>
                          <p>
                            {item.memberType === "Gold Member" ? (
                              <p className='text-[#D4AF37] font-semibold'>
                                {item.memberType}
                              </p>
                            ) : (
                              "Premium Member"
                            )}
                          </p>
                          <div>
                            {item.user.isCompanyVerified === true ? (
                              <div className='flex items-center justify-center gap-1 text-green-500'>
                                <MdOutlineVerifiedUser
                                  size={20}
                                  fill='#22c55e'
                                />
                                <p>verified</p>
                              </div>
                            ) : (
                              "un-verified"
                            )}
                          </div>
                          <div>
                            <div className='flex items-center justify-center gap-1 text-green-500'>
                              <p>{item.latestRequirement.durationOfService}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='flex justify-start gap-2 font-semibold text-xl font-inter items-center mt-2 p-2'>
                        <CircleFlag countryCode='de' className='h-4' />
                        <h3>{user && item.user.fullName}</h3>
                        {!user && <>From {item.user.country}</>}
                      </div>
                      <p className='font-inter text-wrap'>
                        {item.latestRequirement.description}
                      </p>
                      <p className='font-inter text-wrap'>
                        {item.latestRequirement.professionalCertification}
                      </p>
                      <p className='font-inter text-wrap '>
                        {item.latestRequirement.skillsExpertiseNeeded}
                      </p>

                      <div className=' flex flex-col 500px:flex-row items-start  500px:items-center justify-between gap-4 500px:flex-wrap mt-4 '>
                        <div className='rating-container  self-start 500px:self-end flex items-center justify-center gap-6'>
                          <div className='flex items-center justify-center gap-4 '>
                            <Rating
                              readonly
                              placeholderRating={3}
                              emptySymbol={
                                <img
                                  src={ratingStarPlaceholder}
                                  className='icon w-[18px] grayscale'
                                />
                              }
                              placeholderSymbol={
                                <img
                                  src={ratingStarPlaceholder}
                                  className='icon w-[18px]'
                                />
                              }
                              fullSymbol={
                                <img
                                  src={ratingStarPlaceholder}
                                  className='icon w-[18px]'
                                />
                              }
                            />
                            <p className='mt-[-7px] font-bold'>3</p>
                          </div>
                          <div className='font-bold text-[12px]'>
                            {item.date}
                          </div>
                          <div className='font-bold text-[12px]'>
                            {item.serviceDeliveryMethod}
                          </div>
                        </div>
                        <button
                          className='btn bg-btnprimary text-white'
                          onClick={() => handleSendMessage(item.user._id)}
                        >
                          <div className='flex items-center justify-center gap-2'>
                            <GoMail size={20} fill='#fff' />
                            <p> Inquire Now</p>
                          </div>
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}

              <div className='flex absolute  top-[40%] -right-3 transform z-[999] bg-none items-center justify-center w-[45px] px-2 py-6 rounded-md hover:cursor-pointer '>
                <FaChevronRight
                  size={30}
                  color='#000'
                  onClick={() => swiperRef.current.swiper.slideNext()}
                />
              </div>
              <div className='flex absolute top-[40%] -left-3 transform z-[999] bg-none items-center justify-center w-[45px] px-2 py-6 rounded-md hover:cursor-pointer'>
                <FaChevronLeft
                  size={30}
                  color='#000'
                  onClick={() => swiperRef.current.swiper.slidePrev()}
                />
              </div>
            </Swiper>
          </TabPanel>
        )}

        {/* products section */}
        {activeTab === "product" && products && (
          <TabPanel value={activeTab} className=''>
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={1}
              breakpoints={{
                0: {
                  slidesPerView: 1.15,
                },
                390: {
                  slidesPerView: 1.5,
                },
                480: {
                  slidesPerView: 2.25,
                },
                785: {
                  slidesPerView: 3,
                },
                960: { slidesPerView: 4.15 },
                1200: {
                  slidesPerView: 5,
                },
              }}
              // navigation
              ref={swiperRef}
            >
              {products.map((product, index) => (
                <SwiperSlide key={index} className='p-6'>
                  <Link to={`/product/${product._id}`}>
                    <div className='gap-1 w-[200px] h-[250px] shadow-md rounded-md hover:cursor-pointer transition-all duration-500 p-2 flex flex-col justify-between'>
                      <div className='h-[160px] w-full overflow-hidden'>
                        <img
                          src={product.productImages[0]}
                          alt={product.productName}
                          className='object-cover rounded-md h-full w-full'
                        />
                      </div>
                      <h1 className='font-bold text-[15px] mt-2'>
                        {product.productName}
                      </h1>
                      <div className='flex items-center mt-1'>
                        <div className='rating-container'>
                          <Rating
                            readonly
                            placeholderRating={4}
                            emptySymbol={
                              <img
                                src={ratingStarPlaceholder}
                                className='icon w-[18px] grayscale'
                                alt='star'
                              />
                            }
                            placeholderSymbol={
                              <img
                                src={ratingStarPlaceholder}
                                className='icon w-[18px]'
                                alt='star'
                              />
                            }
                            fullSymbol={
                              <img
                                src={ratingStarPlaceholder}
                                className='icon w-[18px]'
                                alt='star'
                              />
                            }
                          />
                        </div>
                        <span className='mt-[-4px] font-semibold text-sm'>
                          3
                        </span>
                      </div>
                      <h1 className='font-semibold text-gray-500/50 text-[14px] mt-1'>
                        US
                      </h1>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}

              <div className='flex absolute  top-[40%] -right-3 transform z-[999] bg-none items-center justify-center w-[45px] px-2 py-6 rounded-md hover:cursor-pointer '>
                <FaChevronRight
                  size={30}
                  color='#000'
                  onClick={() => swiperRef.current.swiper.slideNext()}
                />
              </div>
              <div className='flex absolute top-[40%] -left-3 transform z-[999] bg-none items-center justify-center w-[45px] px-2 py-6 rounded-md hover:cursor-pointer'>
                <FaChevronLeft
                  size={30}
                  color='#000'
                  onClick={() => swiperRef.current.swiper.slidePrev()}
                />
              </div>
            </Swiper>
          </TabPanel>
        )}
      </TabsBody>
    </Tabs>
  )
}
