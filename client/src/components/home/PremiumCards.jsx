import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import Rating from "react-rating";
import ratingStarPlaceholder from "../../assets/images/star-yellow.png";

import axiosInstance from "../../services/axiosInstance";
import { Link } from "react-router-dom";
import Loader from "../Loader";

const PremiumCards = () => {
  const swiperRef = useRef(null);
  const [premiumProducts, setPremiumProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPremiumProducts = async () => {
      try {
        const response = await axiosInstance.get(
          "/product/fetchPremiumProducts"
        );
        // console.log("premium:", response);
        setPremiumProducts(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log("error from premium cards: ", error);
        setIsLoading(true);
      }
    };

    fetchPremiumProducts();
  }, []);

  useEffect(() => {
    const swiper = swiperRef.current.swiper;
    swiper.on("reachEnd", () => {
      setTimeout(() => {
        swiper.slideTo(0);
      }, 5000);
    });
  }, []);

  // console.log(premiumpro);

  return (
    <div className="p-8 space-y-2">
      <h1 className="font-inter text-[1.8rem] self-start text-primary font-bold">
        Top Products
      </h1>
      <Swiper
        breakpoints={{
          0: {
            slidesPerView: 1.15,
            spaceBetween: 5,
          },
          390: {
            slidesPerView: 1.5,
            spaceBetween: 5,
          },
          480: {
            slidesPerView: 2.25,
            spaceBetween: 30,
          },
          785: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          960: { slidesPerView: 4.15, spaceBetween: 15 },
          1200: {
            slidesPerView: 5,
            spaceBetween: 15,
          },
        }}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        scrollbar={{
          hide: true,
        }}
        modules={[FreeMode, Pagination, Scrollbar]}
        className=""
        ref={swiperRef}
      >
        {premiumProducts &&
          premiumProducts.map((item) => (
            <SwiperSlide key={item._id} className="p-8">
              {isLoading ? (
                <>
                  <Loader />
                </>
              ) : (
                <>
                  <Link to={`/product/${item._id}`}>
                    <div className="shadow-md">
                      <div className="w-full h-[160px] overflow-hidden">
                        <img
                          src={item.productImages[0]}
                          alt={item.productName}
                          className="object-cover rounded-md h-full w-full"
                        />
                      </div>
                      <h1 className="p-4 font-semibold">{item.productName}</h1>
                      <div className="flex items-center gap-2 px-4">
                        <div className="">
                          <Rating
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
                        </div>
                        <span className="text-sm">3</span>
                      </div>
                      <h1 className="px-4 text-sm">Pakistan</h1>
                    </div>
                  </Link>
                </>
              )}
            </SwiperSlide>
          ))}

        <div className="flex absolute -right-3 top-[40%] transform z-[999] bg-none items-center justify-center w-[45px] px-2 py-6 rounded-md hover:cursor-pointer ">
          <FaChevronRight
            size={30}
            color="#000"
            onClick={() => swiperRef.current.swiper.slideNext()}
          />
        </div>
        <div className="flex absolute -left-3 top-[40%] transform z-[999] bg-none items-center justify-center w-[45px] px-2 py-6 rounded-md hover:cursor-pointer">
          <FaChevronLeft
            size={30}
            color="#000"
            onClick={() => swiperRef.current.swiper.slidePrev()}
          />
        </div>
      </Swiper>
    </div>
  );
};

export default PremiumCards;
