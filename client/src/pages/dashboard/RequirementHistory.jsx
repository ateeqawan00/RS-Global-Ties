import Rating from "react-rating"
import ratingStarPlaceholder from "../../assets/images/star-yellow.png"
import { GoMail } from "react-icons/go"
import { requirementPageData as data } from "../../data/requirementPageData"
import { MdOutlineVerifiedUser } from "react-icons/md"
import { CircleFlag } from "react-circle-flags"
import { useEffect, useState } from "react"
import axiosInstance from "../../services/axiosInstance"
import { useSelector } from "react-redux"

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Helmet } from "react-helmet"

const RequirementHistory = () => {
  const user = useSelector((state) => state.user.user)

  const [requirementHistory, setRequirementHistory] = useState(null)

  const convertDateToMonths = (dateString) => {
    // Create a new Date object from the provided date string
    const date = new Date(dateString)

    // Get the month index (0-11) from the Date object
    const monthIndex = date.getMonth()

    // Define an array of month names
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]

    // Return the month name using the month index
    return months[monthIndex]
  }

  useEffect(() => {
    const fetchRequirementHistory = async () => {
      try {
        const response = await axiosInstance.get(
          "/Requirements/getRequirement",
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        )

        setRequirementHistory(response.data.requirements)
      } catch (error) {
        if (error.response) {
          console.error(
            "Error occurred in requirement history: ",
            error.response.data.error
          )
          toast.error(error.response.data?.error)
        }
      }
    }

    fetchRequirementHistory()
  }, [])

  console.log(requirementHistory)

  return (
    <>
      <Helmet>
        <title>{`Requirement History - RSGlobalTies`}</title>
        <meta
          name='description'
          content='Get insights, ratings, and user reviews for various products.'
        />
      </Helmet>
      <div className='p-6  '>
        <h1 className='self-start text-[2rem] font-bold mb-5'>
          Requirement History
        </h1>

        {requirementHistory &&
          requirementHistory.map((item, index) => (
            <div
              key={index}
              className='w-full 700px:max-w-[600px] p-4 rounded-md shadow-md border mb-6'
            >
              <div className=' flex  items-center justify-between gap-4 300px:flex-wrap '>
                <h3 className='text-md font-semibold text-primary text-wrap'>
                  {item.name}
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
                    {item.verificationStatus === "verified" ? (
                      <div className='flex items-center justify-center gap-1 text-green-500'>
                        <MdOutlineVerifiedUser size={20} fill='#22c55e' />
                        <p>verified</p>
                      </div>
                    ) : (
                      "un-verified"
                    )}
                  </div>
                </div>
              </div>
              <div className='flex justify-start gap-2 font-semibold text-xl font-inter items-center mt-2 p-2'>
                <CircleFlag countryCode='de' className='h-4' />
                <h3>From Germany</h3>
              </div>
              <p className='font-inter text-wrap mb-2'>{item.description}</p>

              <div className='flex items-center justify-between mb-2'>
                <div>
                  <p>
                    Quantity required :{" "}
                    <span className='text-md font-semibold text-primary text-wrap'>
                      {item.quantityRequired}
                    </span>
                  </p>
                </div>
                <div>
                  <p>
                    Annual Purchased Volume :{" "}
                    <span className='text-md font-semibold text-primary text-wrap'>
                      {item.annualPurchasedVolume}
                    </span>
                  </p>
                </div>
              </div>

              <div className='flex items-center justify-between mb-2'>
                <div>
                  <p>
                    Time of Validity:{" "}
                    <span className='text-md font-semibold text-primary text-wrap'>
                      {convertDateToMonths(item.timeOfValidity)}
                    </span>
                  </p>
                </div>
                <div>
                  <p>
                    Destination Port :{" "}
                    <span className='text-md font-semibold text-primary text-wrap'>
                      {item.destinationPort}
                    </span>
                  </p>
                </div>
              </div>

              <div>
                <span className='text-md font-semibold text-wrap'>
                  Shipment Terms:
                </span>
                <div>
                  <span>{item.shipmentTerm}</span>
                </div>
              </div>

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
                  <div className='font-bold text-[12px]'>{item.date}</div>
                </div>
                <button className='btn bg-btnprimary text-white'>
                  <div className='flex items-center justify-center gap-2'>
                    <GoMail size={20} fill='#fff' />
                    <p> Inquire Now</p>
                  </div>
                </button>
              </div>
            </div>
          ))}

        {/*  
        {data.map((item, index) => (
          <div
            key={index}
            className="w-full 700px:max-w-[600px] p-4 rounded-md shadow-md border mb-6"
          >
            <div className=" flex  items-center justify-between gap-4 300px:flex-wrap ">
              <h3 className="text-md font-semibold text-primary text-wrap">
                {item.cardTitle}
              </h3>
              <div className="flex items-center gap-4">
                <p>
                  {item.memberType === "Gold Member" ? (
                    <p className="text-[#D4AF37] font-semibold">
                      {item.memberType}
                    </p>
                  ) : (
                    "Premium Member"
                  )}
                </p>
                <div>
                  {item.verificationStatus === "verified" ? (
                    <div className="flex items-center justify-center gap-1 text-green-500">
                      <MdOutlineVerifiedUser size={20} fill="#22c55e" />
                      <p>verified</p>
                    </div>
                  ) : (
                    "un-verified"
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-start gap-2 font-semibold text-xl font-inter items-center mt-2 p-2">
              <CircleFlag countryCode="de" className="h-4" />
              <h3>From Germany</h3>
            </div>
            <p className="font-inter text-wrap">{item.description}</p>
            <div className=" flex flex-col 500px:flex-row items-start  500px:items-center justify-between gap-4 500px:flex-wrap mt-4 ">
              <div className="rating-container  self-start 500px:self-end flex items-center justify-center gap-6">
                <div className="flex items-center justify-center gap-4 ">
                  <Rating
                  readonly
                    placeholderRating={3}
                    emptySymbol={
                      <img
                        src={ratingStarPlaceholder}
                        className="icon w-[18px] grayscale"
                      />
                    }
                    placeholderSymbol={
                      <img
                        src={ratingStarPlaceholder}
                        className="icon w-[18px]"
                      />
                    }
                    fullSymbol={
                      <img
                        src={ratingStarPlaceholder}
                        className="icon w-[18px]"
                      />
                    }
                  />
                  <p className="mt-[-7px] font-bold">3</p>
                </div>
                <div className="font-bold text-[12px]">{item.date}</div>
              </div>
              <button className="btn bg-btnprimary text-white">
                <div className="flex items-center justify-center gap-2">
                  <GoMail size={20} fill="#fff" />
                  <p> Inquire Now</p>
                </div>
              </button>
            </div>
          </div>
        ))}
        */}
        <ToastContainer />
      </div>
    </>
  )
}

export default RequirementHistory
