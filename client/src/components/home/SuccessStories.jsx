import { successStoriesData } from "../../data/homepageData"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules"
import axiosInstance from '../../services/axiosInstance'

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/scrollbar"
import { useEffect, useRef, useState } from "react"

import { FaChevronLeft, FaChevronRight } from "react-icons/fa6"

const SuccessStories = () => {
  const swiperRef = useRef(null)

  const [successStories, setSuccessStories] = useState()

  const fetchSuccessStories = async () => {
    try {
      const {data} = await axiosInstance.get('/successstories/getSuccessStories')
      setSuccessStories(data)
    } catch (error) {
      console.log("error fetching success stories: ", error)
    }
  }
  
  useEffect(() => {
    
    fetchSuccessStories()

  }, [])

  return (
    <div className='flex items-center justify-center w-full'>
      <div className='p-2 md:p-4 w-full'>
        <p className='text-center bg-gradient-to-r from-[#F26921] to-[#d12f35] text-[1.5rem] mt-2 text-transparent bg-clip-text font-bold '>
          Success Stories
        </p>
        <div className='rounded-box flex gap-4 pt-2 md:pt-4 items-center justify-center'>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2.2,
              },
              1024: {
                slidesPerView: 3.2,
              },
            }}
            ref={swiperRef}
            className="p-6"
          >
            {successStories && successStories.map((item) => (
              <SwiperSlide
                className='500px:w-[500px] w-[300px] h-full block relative p-6 border bg-[#ECF0F9] shadow-md rounded-md'
                key={item._id}
              >
                <p className='font-inter block'>{item.description}</p>
                <div className='flex items-center justify-end mt-4'>
                  <div className='flex items-center justify-start gap-3 '>
                    <img
                      src={item.avatar}
                      alt='carousel-img'
                      className='rounded-md  w-[50px] h-[50px] object-cover '
                    />
                    <div className='flex flex-col '>
                      <h3 className='  bg-gradient-to-r from-[#F26921] to-[#d12f35] ml-4 text-transparent bg-clip-text font-bold text-[14px]'>
                        {item.fullName}
                      </h3>
                      <h2>{item.jobName}</h2>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}

            <div className='flex absolute  top-[30%] -right-3 transform z-[999] bg-none items-center justify-center w-[45px] px-2 py-6 rounded-md hover:cursor-pointer '>
              <FaChevronRight
                size={30}
                color='#000'
                onClick={() => swiperRef.current.swiper.slideNext()}
              />
            </div>
            <div className='flex absolute top-[30%] -left-3 transform z-[999] bg-none items-center justify-center w-[45px] px-2 py-6 rounded-md hover:cursor-pointer'>
              <FaChevronLeft
                size={30}
                color='#000'
                onClick={() => swiperRef.current.swiper.slidePrev()}
              />
            </div>
          </Swiper>
        </div>
      </div>
    </div>
  )
}

export default SuccessStories
