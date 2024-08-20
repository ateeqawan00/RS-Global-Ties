import Rating from "react-rating"
import ratingStarPlaceholder from "../../assets/images/star-yellow.png"
import { GoMail } from "react-icons/go"
import { requirementPageData as data } from "../../data/requirementPageData"
import { MdOutlineVerifiedUser } from "react-icons/md"
import { CircleFlag } from "react-circle-flags"
import { useEffect, useState } from "react"
import axiosInstance from "../../services/axiosInstance"
import { useSelector } from "react-redux"
import { Helmet } from "react-helmet"

const ServicesHistory = () => {
  const user = useSelector((state) => state.user.user)

  const [services, setServices] = useState()

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await axiosInstance.get("/service/getUserServices", {
          headers: { Authorization: `Bearer ${user?.token}` },
        })
        setServices(data)
        console.log("services: ", data)
      } catch (error) {
        console.error("error from ServicesHistory: ", error)
      }
    }

    fetchServices()
  }, [])

  return (
    <>
      <Helmet>
        <title>{`Services History - RSGlobalTies`}</title>
        <meta
          name='description'
          content='Get insights, ratings, and user reviews for various products.'
        />
      </Helmet>
      <div className='p-6  '>
        <h1 className='self-start text-[2rem] font-bold mb-5'>
          Services History
        </h1>
        {services &&
          services.services.map((item, index) => (
            <div
              key={index}
              className='w-full 700px:max-w-[600px] p-4 rounded-md shadow-md border mb-6'
            >
              <div className=' flex  items-center justify-between gap-4 300px:flex-wrap '>
                <h3 className='text-md font-semibold text-primary text-wrap'>
                  {item.title}
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
                  <div>
                    
                      <div className='flex items-center justify-center gap-1 text-green-500'>
                        <p>{item.durationOfService}</p>
                      </div>
                  </div>

                </div>
              </div>
              <div className='flex justify-start gap-2 font-semibold text-xl font-inter items-center mt-2 p-2'>
                <CircleFlag countryCode='de' className='h-4' />
                <h3>{user && user.fullName}</h3>
              </div>
              <p className='font-inter text-wrap'>{item.description}</p>
              <p className='font-inter text-wrap'>{item.professionalCertification}</p>
              <p className='font-inter text-wrap '>{item.skillsExpertiseNeeded}</p>


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
                  <div className='font-bold text-[12px]'>{item.serviceDeliveryMethod}</div>
                  
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
      </div>
    </>
  )
}

export default ServicesHistory
