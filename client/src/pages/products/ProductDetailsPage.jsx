import { useEffect, useState } from "react"
import { CircleFlag } from "react-circle-flags"
import { GoMail } from "react-icons/go"
import { MdOutlineVerifiedUser } from "react-icons/md"
import ratingStarPlaceholder from "../../assets/images/star-yellow.png"
import Rating from "react-rating"
import { productPageData } from "../../data/productPageData"
import { useSelector } from "react-redux"
import { formatDistanceToNow, format } from "date-fns"

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { Helmet } from "react-helmet"

import axiosInstance from "../../services/axiosInstance"
import { Link, useNavigate, useParams } from "react-router-dom"

const StarRating = ({ rating }) => {
  const starIcons = []
  const yellowStarStyle = {
    color: "#fbbc04",
  }
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      starIcons.push(
        <span key={i} style={yellowStarStyle}>
          ★
        </span>
      )
    } else {
      starIcons.push(
        <span key={i} style={yellowStarStyle}>
          ☆
        </span>
      )
    }
  }
  return <div>{starIcons}</div>
}

const ProductDetailsPage = () => {
  const user = useSelector((state) => state.user.user)
  const [review, setReview] = useState("")
  const [activeImage, setActiveImage] = useState()
  const [product, setProduct] = useState({})
  const [reviews, setReviews] = useState([])
  const [rating, setRating] = useState(0)
  const [starsHovered, setStarsHovered] = useState(0)
  const [chatData, setChatData] = useState(null)
  const [similarUserProducts, setSimilarUserProducts] = useState()
  const [similarUserDetails, setSimilarUserDetails] = useState()

  const navigate = useNavigate()

  const { productId } = useParams()

  const handleChatDataChange = (e) => {
    const { value, name } = e.target
    setChatData({
      ...chatData,
      [name]: value,
    })
  }

  const formatDate = (date) => {
    return format(date, "MMMM dd, yyyy")
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()

    if (!user) {
      toast.error("Login to send a message.")
      return
    }

    try {
      const bodyData = {
        receiverId: product.userId || "",
        message: chatData.message || "",
        yourName: chatData.yourName || "",
        phoneNumber: chatData.phoneNumber || 0,
        country: chatData.country || "",
        companyName: chatData.companyName || "",
      }

      const response = await axiosInstance.post("/chat/createChat", bodyData, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })

      // console.log("chat response: ", response)

      if (response.status === 200) {
        navigate("/dashboard/chat")
      }
    } catch (error) {
      console.error("chat error", error)
    }
  }

  const handleInputChange = (e) => {
    let { value } = e.target
    setReview(value)
  }

  const handleStarHover = (hoveredStar) => {
    setStarsHovered(hoveredStar)
  }

  const handleStarClick = (selectedStar) => {
    setRating(selectedStar)
    setStarsHovered(0) // Reset starsHovered state after clicking
  }

  const handleSubmitReview = async () => {
    try {
      const response = await axiosInstance.post(
        "/review/AddReview",
        { content: review, rating, productId },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      console.log(response)
      toast.success("Review Submitted")
      setReview("")
      document.getElementById("user-review").close()
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".star-rating-container")) {
        setStarsHovered(0)
      }
    }
    document.body.addEventListener("click", handleOutsideClick)
    return () => {
      document.body.removeEventListener("click", handleOutsideClick)
    }
  }, [])

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axiosInstance.get(`/product/${productId}`)
        setProduct(response.data)
        setActiveImage(response.data.productImages[0])
        window.scrollTo(0, 0)
        // console.log("product details: ",response.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchProductDetails()
  }, [productId])

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axiosInstance.get(`/review/${productId}`)
        setReviews(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchReviews()
  }, [])

  useEffect(() => {
    const fetchSimilarUserProducts = async () => {
      try {
        const response = await axiosInstance.get(
          `/product/user/${product.userId}`
        )
        setSimilarUserProducts(response.data.products)
        setSimilarUserDetails(response.data.user)
      } catch (error) {
        console.log("error fetching products similar to user: ", error)
      }
    }

    if (product) {
      fetchSimilarUserProducts()
    }
  }, [product])

  console.log("similar user product: ", similarUserProducts)
  console.log("similar user details: ", similarUserDetails)
  // console.log("reviews: ", reviews)
  // console.log("product: ", product);

  return (
    <>
      <Helmet>
        <title>{`Product Details - RSGlobalTies`}</title>
        <meta
          name='description'
          content='Explore product details and reviews at RSGlobalTies. Get insights, ratings, and user reviews for various products.'
        />
      </Helmet>
      <div className='w-full border-b border-solid border-blue-500 p-4'>
        <div className='w-full md:w-[40%] p-8'>
          <h1 className='text-[#D4AF37] font-semibold text-[1.2rem] capitalize'>
            {product ? `${product.subscriptionPlan} Member` : "Gold Member"}
          </h1>
          <div className='flex items-center justify-between gap-1 text-green-500'>
            <div className='flex items-center gap-2'>
              <MdOutlineVerifiedUser size={20} fill='#22c55e' />
              <p>verified</p>
            </div>
            <div className='flex items-center gap-4 text-black font-semibold'>
              {/* <CircleFlag countryCode="uk" className="h-4" /> */}
              {/* <h3>{user ? `${user.fullName}` : 'Antonio From Germany'}</h3> */}
              {/* {user && <h3>{user?.fullName}</h3>} */}
            </div>
          </div>
        </div>
        <div className='flex flex-col justify-between lg:flex-row gap-16 lg:items-start p-8'>
          <div className='flex flex-col gap-6 lg:w-2/4'>
            <img
              src={
                product.productImages
                  ? activeImage
                    ? activeImage
                    : product.productImages[0]
                  : ""
              }
              alt=''
              className='w-2/3 h-full aspect-square object-cover rounded-xl'
            />
            <div className='flex flex-row items-center gap-3'>
              {product &&
                product.productImages?.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt=''
                    className='w-[6rem] h-[6rem] 500px:w-1/4 object-cover rounded-md cursor-pointer'
                    onClick={() => setActiveImage(image)}
                  />
                ))}
            </div>
          </div>
          {/* ABOUT */}
          <div className='flex flex-wrap lg:w-2/4  500px:flex-row flex-col'>
            <div className='flex flex-col gap-4 w-full 700px:w-2/4 p-6'>
              <div>
                <h1 className='text-3xl font-bold text-primary'>
                  {product.productName}
                </h1>
              </div>
              <p className='text-gray-700'>{product?.description}</p>
            </div>

            {/* chat section */}

            <section className='bg-white  w-full 700px:w-2/4'>
              <div className='py-8 px-4 mx-auto max-w-screen-md'>
                <form action='#' className='space-y-8'>
                  <div className='sm:col-span-2'>
                    <textarea
                      id='message'
                      name='message'
                      rows='6'
                      className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                      placeholder='Message'
                      onChange={handleChatDataChange}
                      required
                    ></textarea>
                  </div>
                  <div>
                    <input
                      type='text'
                      id='message'
                      name='companyName'
                      className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light'
                      placeholder='Company Name'
                      onChange={handleChatDataChange}
                      required
                    />
                  </div>
                  <div>
                    <input
                      type='text'
                      id='yourName'
                      name='yourName'
                      className='block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light'
                      onChange={handleChatDataChange}
                      placeholder='Your Name'
                      required
                    />
                  </div>
                  <div>
                    <input
                      type='number'
                      id='phoneNumber'
                      name='phoneNumber'
                      className='block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light'
                      onChange={handleChatDataChange}
                      placeholder='Phone No'
                      required
                    />
                  </div>
                  <div>
                    <input
                      type='text'
                      id='country'
                      name='country'
                      className='block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light'
                      onChange={handleChatDataChange}
                      placeholder='Country'
                      required
                    />
                  </div>
                  <button
                    type='submit'
                    className='py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
                    onClick={handleSendMessage}
                  >
                    Send message
                  </button>
                </form>
              </div>
            </section>
          </div>
        </div>
      </div>
      <div className='p-6  border-b border-solid border-blue-500'>
        <h1 className='text-primary font-semibold text-[1.5rem] font-inter'>
          Recent User Reviews
        </h1>

        {/* Reviews Section */}

        {reviews.length > 0 ? (
          <div className='p-6 space-y-5'>
            {reviews.map((review, index) => (
              <div key={index}>
                <div className='flex gap-2'>
                  <p>{review.fullName}</p>
                  <StarRating rating={review.rating} />
                </div>
                <div className='text-gray-400'>
                  {formatDistanceToNow(
                    new Date(review.createdAt || new Date())
                  )}{" "}
                  ago
                </div>
                <p>{review.content}</p>
              </div>
            ))}
          </div>
        ) : (
          <>
            <p className='font-semibold'>
              The user hasn&apos;t received any reviews yet
            </p>
          </>
        )}

        <div className='flex items-center justify-center flex-col p-4 gap-4'>
          <button
            className='py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
            onClick={() => document.getElementById("user-review").showModal()}
          >
            Write a Review
          </button>
        </div>
      </div>

      {/* dialog modal */}
      <dialog id='user-review' className='modal p-4'>
        <div className='modal-box  max-w-[600px] scrollbar-hide scrollbar-thumb-blue-300 scrollbar-thin scrollbar-thumb-rounded-scrollBarDefault scrollbar-track-blue-100 flex flex-col space-y-3'>
          <div className='flex justify-between'>
            <p className='text-primary font-semibold'>Write a Review</p>
            <div className='flex items-center space-x-1 star-rating-container'>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`cursor-pointer ${
                    star <= (starsHovered || rating)
                      ? "text-yellow-600"
                      : "text-gray-400"
                  }`}
                  onMouseEnter={() => handleStarHover(star)}
                  onClick={() => handleStarClick(star)}
                >
                  &#9733;
                </span>
              ))}
            </div>
          </div>
          <div>
            <textarea
              placeholder='Type Here'
              className='border border-gray-300 rounded-md w-full h-32 textarea-sm'
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className='flex justify-end space-x-3'>
            <button
              className='py-1 px-8 text-xs text-center border border-primary rounded-full text-primary sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
              onClick={() => document.getElementById("user-review").close()}
            >
              Cancel
            </button>
            <button
              className='py-1 px-8 text-xs text-center text-white bg-primary border rounded-full sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
              onClick={handleSubmitReview}
            >
              Done
            </button>
          </div>
        </div>
      </dialog>

      {similarUserProducts && (
        <div className='p-6'>
          <h1 className='text-primary font-semibold text-[1.5rem] font-inter'>
            {similarUserDetails && (
              <h3>More items from {similarUserDetails?.fullName}</h3>
            )}
          </h1>
          <div className='p-4 flex flex-wrap items-center justify-center 500px:text-nowrap gap-8'>
            {similarUserProducts &&
              similarUserProducts
                .filter((item) => item._id !== product._id)
                .map((item, index) => (
                  <Link to={`/product/${item._id}`}>
                    <div
                      key={index}
                      className='w-full  700px:w-[300px] 1100px:w-[500px] 1200px:w-[550px] 1300px:w-[600px] p-4 rounded-md shadow-md border'
                    >
                      <div className=' flex  items-center justify-between gap-4 300px:flex-wrap '>
                        <h3 className='text-md font-semibold text-primary text-wrap'>
                          {item.productName}
                        </h3>
                        <div className='flex items-center gap-4'>
                          <p className='capitalize'>
                            {item.subscriptionPlan
                              ? item.subscriptionPlan
                              : " "}{" "}
                            Member
                          </p>
                          <div>
                            {similarUserDetails.isCompanyVerified === true ? (
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
                        </div>
                      </div>
                      <div className='flex justify-start gap-2 font-semibold text-xl font-inter items-center mt-2 p-2'>
                        <CircleFlag countryCode='de' className='h-4' />
                        {similarUserDetails && (
                          <h3>From {similarUserDetails.country}</h3>
                        )}
                      </div>
                      <p className='font-inter text-wrap'>{item.description}</p>
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
                            {formatDate(item.createdAt)}
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
                  </Link>
                ))}
          </div>
        </div>
      )}

      {/* <div className="p-6">
        <h1 className="text-primary font-semibold text-[1.5rem] font-inter">
          More Similar Items
        </h1>
        <div className="p-4 flex flex-wrap items-center justify-center 500px:text-nowrap gap-8">
          {productPageData.map((item, index) => (
            <div
              key={index}
              className="w-full  700px:w-[300px] 1100px:w-[500px] 1200px:w-[550px] 1300px:w-[600px] p-4 rounded-md shadow-md border"
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
        </div>
      </div> */}
      <ToastContainer />
    </>
  )
}

export default ProductDetailsPage
