import { useEffect, useState } from "react"
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react"
import { IoChevronDownOutline } from "react-icons/io5"
import { categoriesData, tabsData } from "../../data/homepageData"
import { MdOutlineVerifiedUser } from "react-icons/md"
import { CircleFlag } from "react-circle-flags"
import Rating from "react-rating"
import ratingStarPlaceholder from "../../assets/images/star-yellow.png"
import { GoMail } from "react-icons/go"
import { useSelector } from "react-redux"
import { Link, useParams, useNavigate } from "react-router-dom"
import { Country } from "country-state-city"
import { format } from "date-fns"

import axiosInstance from "../../services/axiosInstance"

export default function CategoriesTabs() {
  const [activeTab, setActiveTab] = useState("buyer")
  const user = useSelector((state) => state.user.user)
  let { products } = useSelector((state) => state.products)
  const { filterParam, userType } = useParams()
  const navigate = useNavigate()
  const countries = Country.getAllCountries()

  let filteredProducts = products


  // console.log("filter param from 2: ", filterParam)
  
  if (filterParam) {
    const filterParamLower = filterParam.toLowerCase()
    filteredProducts = filteredProducts.filter(
      (product) => product.productCategory?.toLowerCase() === filterParamLower
    )
  }

  const handleSelectCountry = (e) => {
    navigate(`/category/filter-by-country/${e.target.value}`)
  }

  useEffect(() => {
    if (userType === 'all-categories') {
      const filter = filterParam.toLowerCase()
      filteredProducts = filteredProducts.filter(
        (product) => product.productCategory?.toLowerCase() === filter
      )
    }
    if (userType) {
      const userTypeLower = userType.toLowerCase()
      filteredProducts = filteredProducts.filter(
        (product) => product.user.accountType.toLowerCase() === userTypeLower
      )
    }
  }, [userType])

  const handleSelectPlatinumMember = (e) => {
    navigate(`/category/filter-by-platinum-members/${e.target.value}`)
  }


  const handleTabClick = (value) => {
    setActiveTab(value)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const formattedDate = format(date, "dd MMM yyyy")
    return formattedDate
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

      if (response.status === 200) {
        navigate("/dashboard/chat")
      }
    } catch (error) {
      console.error("chat error", error)
    }
  }



  return (
    <Tabs value={activeTab} className='p-4 min-h-screen'>
      <TabsHeader
        className='flex-wrap 800px:flex-nowrap bg-[#ECF0F9] gap-2'
        indicatorProps={{
          className: "hidden shadow-none rounded-none",
        }}
      >
        {categoriesData.map(({ label, value }) => (
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
        <div className='dropdown flex-1 '>
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
                    <option key={country.name} value={country.name}>{country.name}</option>
                  ))}
              </select>
            </div>
          </div>
        </div>

        <div className='dropdown flex-1 '>
          <div
            tabIndex={0}
            role='button'
            className='rounded-md py-2 px-4  bg-[#ecf0f9] text-center text-nowrap text-primary font-semibold'
          >
            <select
              id='handleSelectPlatinumMember'
              name='handleSelectPlatinumMember'
              onChange={handleSelectPlatinumMember}
              className='w-56 h-[30px] bg-inherit border rounded-md focus:outline-none'
            >
              <option value='' hidden>
                Platinum Member
              </option>
              <option value='free'>
                Free Member
              </option>
              <option value='silver'>
                Silver Member
              </option>
              <option value='gold'>
                Gold Member
              </option>
              <option value='platinum'>
                Platinum Member
              </option>
            </select>
          </div>
          
        </div>
      </TabsHeader>
      <TabsBody className='flex flex-col'>
        {filteredProducts &&
          filteredProducts.map((item, index) => {
            // Check if the user's accountType matches the activeTab
            if (activeTab.toLowerCase() === "product") {
              // Render the products section
              return (
                <TabPanel key={index} value={activeTab} className='p-4 gap-8'>
                  <Link to={`/product/${item._id}`}>
                    <div
                      key={index}
                      className='w-full bg-white shadow-md rounded-md border p-4'
                    >
                      <div className='flex items-center justify-between gap-4'>
                        <h3 className='text-md font-semibold text-primary text-wrap'>
                          {item.productName}
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
                            {item.user &&
                            item.user.isCompanyVerified === true ? (
                              <div className='flex items-center justify-center gap-1 text-green-500'>
                                <MdOutlineVerifiedUser
                                  size={20}
                                  fill='#22c55e'
                                />
                                <p>verified</p>
                              </div>
                            ) : (
                              <div className='flex items-center justify-center gap-1'>
                                <MdOutlineVerifiedUser size={20} fill='gray' />
                                <p>un-verified</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      {/* <div className='flex justify-start gap-2 font-semibold text-xl font-inter items-center mt-2 p-2'>
                  <CircleFlag countryCode='de' className='h-4' />
                  {item.user ? (
                    <>{item.user.fullName}</>
                  ) : (
                    <h3>From Germany</h3>
                  )}
                </div> */}
                      <p className='font-inter text-wrap'>{item.description}</p>
                      <div className='flex flex-col 500px:flex-row items-start 500px:items-center justify-between gap-4 500px:flex-wrap mt-4'>
                        <div className='rating-container self-start 500px:self-end flex items-center justify-center gap-6'>
                          <div className='flex items-center justify-center gap-4'>
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
                            {formatDate(item.updatedAt)}
                          </div>
                        </div>
                        <button
                          className='btn bg-btnprimary text-white'
                          onClick={() => handleSendMessage(item.user._id)}
                        >
                          <div className='flex items-center justify-center gap-2'>
                            <GoMail size={20} fill='#fff' />
                            Contact Buyer
                          </div>
                        </button>
                      </div>
                    </div>
                  </Link>
                </TabPanel>
              )
            } else if (
              item.user?.accountType.toLowerCase() === activeTab.toLowerCase()
            ) {
              // Render the sections for buyer, supplier, and service provider
              return (
                <TabPanel key={index} value={activeTab} className='p-4 gap-8'>
                  <Link to={`/product/${item._id}`}>
                    <div
                      key={index}
                      className='w-full bg-white shadow-md rounded-md border p-4'
                    >
                      <div className='flex items-center justify-between gap-4'>
                        <h3 className='text-md font-semibold text-primary text-wrap'>
                          {item.productName}
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
                            {item.user &&
                            item.user.isCompanyVerified === true ? (
                              <div className='flex items-center justify-center gap-1 text-green-500'>
                                <MdOutlineVerifiedUser
                                  size={20}
                                  fill='#22c55e'
                                />
                                <p>verified</p>
                              </div>
                            ) : (
                              <div className='flex items-center justify-center gap-1'>
                                <MdOutlineVerifiedUser size={20} fill='gray' />
                                <p>un-verified</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      {/* <div className='flex justify-start gap-2 font-semibold text-xl font-inter items-center mt-2 p-2'>
                  <CircleFlag countryCode='de' className='h-4' />
                  {item.user ? (
                    <>{item.user.fullName}</>
                  ) : (
                    <h3>From Germany</h3>
                  )}
                </div> */}
                      <p className='font-inter text-wrap'>{item.description}</p>
                      <div className='flex flex-col 500px:flex-row items-start 500px:items-center justify-between gap-4 500px:flex-wrap mt-4'>
                        <div className='rating-container self-start 500px:self-end flex items-center justify-center gap-6'>
                          <div className='flex items-center justify-center gap-4'>
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
                            {formatDate(item.updatedAt)}
                          </div>
                        </div>
                        <button
                          className='btn bg-btnprimary text-white'
                          onClick={() => handleSendMessage(item.user._id)}
                        >
                          <div className='flex items-center justify-center gap-2'>
                            <GoMail size={20} fill='#fff' />
                            Contact Buyer
                          </div>
                        </button>
                      </div>
                    </div>
                  </Link>
                </TabPanel>
              )
            } else {
              // If accountType doesn't match, return null or an empty fragment
              return (
                <div key={index} className='capitalize py-6'>
                  No products from {activeTab}
                </div>
              )
            }
          })}
      </TabsBody>
    </Tabs>
  )
}
