import { useEffect, useState } from "react"
import axiosInstance from "../../services/axiosInstance"

import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Scrollbar, A11y, Autoplay, Keyboard } from "swiper/modules"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/scrollbar"

const HeroCarousel = () => {
  const [carousels, setCarousels] = useState([])

  useEffect(() => {
    const fetchCarousels = async () => {
      try {
        const response = await axiosInstance.get("/Caurasoul/getCaurosol")
        const urls = response.data?.map((item) => item.imageUrl)
        setCarousels(urls)
      } catch (error) {
        console.log(error.response?.data)
      }
    }

    fetchCarousels()
  }, [])


  return (
    <div className='carousel w-full'>
      <Swiper
        modules={[Pagination, Scrollbar, A11y, Autoplay, Keyboard]}
        spaceBetween={0}
        slidesPerView={1}
        keyboard
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
      >
        {carousels.length > 0 &&
          carousels.map((image, index) => (
            <SwiperSlide
              key={index}
              id='carousel-img'
              className='carousel-item relative w-full'
            >
              <img
                src={image}
                className='min-w-full object-cover h-[300px] sm:h-[400px] md:h-[400px] lg:h-[400px] xl:h-[500px]'
                alt='carousel-img'
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  )
}

export default HeroCarousel
