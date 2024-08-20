import Rating from "react-rating"
import ratingStarPlaceholder from "../../assets/images/star-yellow.png"
import { GoMail } from "react-icons/go"
import { requirementPageData as data } from "../../data/requirementPageData"
import { MdOutlineVerifiedUser } from "react-icons/md"
import { CircleFlag } from "react-circle-flags"

import { format } from "date-fns"

import axiosInstance from "../../services/axiosInstance"
import { useEffect, useState } from "react"
import { Helmet } from "react-helmet"

const SuperMyServicesPage = () => {
  const [services, setServices] = useState()

  useEffect(() => {
    const fetchAllServices = async () => {
      try {
        const { data } = await axiosInstance.get("/service/getAllServices")
        setServices(data)
      } catch (error) {
        console.error("error fetching all services")
      }
    }

    fetchAllServices()
  }, [])

  console.log(services)

  return (
    <>
      <Helmet>
        <title>{`Super my service - RSGlobalTies`}</title>
        <meta
          name='description'
          content='Add Products and services to list on the RSGlobalTies. Get insights, ratings, and user reviews for various products.'
        />
      </Helmet>
      {services &&
        services.map((item, index) => (
          <div
            key={index}
            className='w-full 700px:max-w-[600px] p-4 rounded-md shadow-md border mb-6'
          >
            <div className=' flex  items-center justify-between gap-4 300px:flex-wrap '>
              <h3 className='text-md font-semibold text-primary text-wrap'>
                {item.latestService.title}
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
            <p className='font-inter text-wrap'>
              {item.latestService.description}
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
                  {format(item.latestService.updatedAt, "dd MMM yyyy")}
                </div>
              </div>
              <button className='btn bg-btnprimary text-white'>
                <div className='flex items-center justify-center gap-2'>
                  <GoMail size={20} fill='#fff' />
                  <p>Inquire Now</p>
                </div>
              </button>
            </div>
          </div>
        ))}
    </>
  )
}

export default SuperMyServicesPage
