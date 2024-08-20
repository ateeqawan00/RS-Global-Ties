import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axiosInstance from "../../services/axiosInstance"
import { useSelector } from "react-redux"

import { loadStripe } from "@stripe/stripe-js"
import { Helmet } from "react-helmet"

const stripePromise = loadStripe(
  "pk_test_51OwXJ9RtqZkTuUjdPn7IZ2nUJQ77VYiDdsW3s8ddWFQRUh4yUWKiXhYLAy54Y2249fgzSTPtcvfgUr2MoiWhBE5p00zp6MUFHe"
)

const plans = {
  free: 0,
  silver: 20,
  gold: 70,
  platinum: 100,
}

const DashboardPricing = () => {
  const user = useSelector((state) => state.user.user)

  const handleClick = async (plan) => {
    try {
      const { data } = await axiosInstance.post(
        "/subscribe/subscription",
        { plan },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )

      console.log(data)

    
      const stripe = await stripePromise
      const { error } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      })

      if (error) {
        console.error("Error redirecting to checkout:", error)
      }
    } catch (error) {
      console.log(error.response?.data?.error)
      toast.error(error.response?.data?.error)
    }
  }
  // const handleClick = async (plan) => {
  //   try {
  //     const { data } = await axiosInstance.post(
  //       "/subscribe/subscription",
  //       { plan },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${user?.token}`,
  //         },
  //       }
  //     );
  
  //     console.log("Data:", data);
  
  //     if (data && data.message) {
  //       if (data.message === 'Already subscribed') {
  //         toast.info("Already subscribed", { toastId: 'alreadySubscribed' });
  //       } else {
  //         toast.success(data.message, { toastId: 'subscriptionSuccess' });
  //       }
  //     } else {
  //       toast.error("Unexpected response format.");
  //     }
  
  //   } catch (error) {
  //     console.log(error.response?.data?.error);
  //     toast.error(error.response?.data?.error);
  //   }
  // }


  return (
    <>
      <Helmet>
        <title>{`Pricing - RSGlobalTies`}</title>
        <meta
          name='description'
          content='Get insights, ratings, and user reviews for various products.'
        />
      </Helmet>
      <section className='text-gray-700 body-font overflow-hidden border-t border-gray-200'>
        <ToastContainer />
        <div className='container px-5 py-24 mx-auto flex flex-wrap'>
          <div className='lg:w-1/4 mt-48 hidden lg:block'>
            <div className='mt-px rounded-tl-lg rounded-bl-lg overflow-hidden'>
              <p className=' text-gray-900 h-12 text-2xl border-b text-start px-4 flex items-center justify-start -mt-px'>
                Features
              </p>
              <p className=' text-gray-900 h-12 border-b text-start px-4 flex items-center justify-start text-sm leading-none -mt-px'>
                Complete Business Profile
              </p>
              <p className='text-gray-900 h-12 border-b text-start px-4 flex items-center justify-start text-sm leading-none'>
                Verified Member Icon / Membership Badge
              </p>
              <p className=' text-gray-900 h-12 border-b text-start px-4 flex items-center justify-start text-sm leading-none'>
                Products Display on our Website
              </p>
              <p className='text-gray-900 h-12 border-b text-start px-4 flex items-center justify-start text-sm leading-none'>
                Online & Showcase Product Posting
              </p>
              <p className=' text-gray-900 h-12 border-b text-start px-4 flex items-center justify-start text-sm leading-none'>
                Display Factory Images on Global Ties Website
              </p>
              <p className='text-gray-900 h-12 border-b text-start px-4 flex items-center justify-start text-sm leading-none'>
                Complete Product Catalog & Unlimited Product Posting
              </p>
              <p className=' text-gray-900 h-12 border-b text-start px-4 flex items-center justify-start text-sm leading-none'>
                Video Ad Features
              </p>
              <p className='text-gray-900 h-12 border-b text-start px-4 flex items-center justify-start text-sm leading-none'>
                Directly Contact Suppliers & Buyers
              </p>

              <p className=' text-gray-900 h-12 border-b text-start px-4 flex items-center justify-start text-sm leading-none'>
                Profile Listing on B2B
              </p>
              <p className=' text-gray-900 h-12 border-b text-start px-4 flex items-center justify-start text-sm leading-none'>
                Social Media Marketing on Rs Global Ties Platform
              </p>
              <p className=' text-gray-900 h-12 border-b text-start px-4 flex items-center justify-start text-sm leading-none'>
                Internet & On-site Promotion
              </p>
              <p className=' text-gray-900 h-12 border-b text-start px-4 flex items-center justify-start text-sm leading-none'>
                Priority Ranking & Support on Our Website
              </p>
              <p className=' text-gray-900 h-12 border-b text-start px-4 flex items-center justify-start text-sm leading-none'>
                High Search Ranking on our Website
              </p>
              <p className=' text-gray-900 h-12 border-b text-start px-4 flex items-center justify-start text-sm leading-none'>
                Contact Any Verified Member in our Website Web Chat
              </p>
              <p className=' text-gray-900 h-12 border-b text-start px-4 flex items-center justify-start text-sm leading-none'>
                Dedicated Account Manager
              </p>
              <p className=' text-gray-900 h-12 border-b text-start px-4 flex items-center justify-start text-sm leading-none'>
                Early Access to New Features
              </p>
              <p className=' text-gray-900 h-12 border-b text-start px-4 flex items-center justify-start text-sm leading-none'>
                Exclusive Events Access (Organized by Rs Global Ties)
              </p>
              <p className=' text-gray-900 h-12 border-b text-start px-4 flex items-center justify-start text-sm leading-none'>
                Discounts on Trade Shows and Events (Organized by Rs Global
                Ties)
              </p>
              <p className=' text-gray-900 h-12 border-b text-start px-4 flex items-center justify-start text-sm leading-none'>
                Business Profiling & Tax Consultation (Pakistan)
              </p>
              <p className=' text-gray-900 h-12 border-b text-start px-4 flex items-center justify-start text-sm leading-none'>
                Business Profiling & Tax Consultation (International)
              </p>
              <p className=' text-gray-900 h-12 border-b text-start px-4 flex items-center justify-start text-sm leading-none'>
                Personalized Training Sessions
              </p>
              <p className=' text-gray-900 h-12 border-b text-start px-4 flex items-center justify-start text-sm leading-none'>
                Customer Support Assistance
              </p>
            </div>
          </div>
          <div className='flex lg:w-3/4 w-full flex-wrap lg:border border-gray-300 rounded-lg'>
            <div className='lg:w-1/4 md:w-1/3 sm:w-1/2 lg:mt-px w-full mb-10 lg:mb-0 border-2 border-gray-300 lg:border-none rounded-lg lg:rounded-none'>
              <div className='px-2 text-center h-36 flex flex-col items-center justify-center'>
                <h2 className='text-3xl text-gray-900 font-medium leading-none mb-4 mt-2'>
                  Free
                </h2>
                <span className='flex items-center text-sm text-gray-600 gap-2'>
                  <span className='text-indigo-500 font-bold text-xl'>$00</span>{" "}
                  user / month
                </span>
              </div>
              <div className='border-b p-6 text-center rounded-bl-lg'>
                <button
                  className='text-white bg-indigo-500 border-0 py-2 px-4 w-full focus:outline-none hover:bg-indigo-600 rounded'
                  onClick={() => handleClick(plans.free)}
                >
                  Try for free
                </button>
              </div>

              <p className='text-gray-600 text-center h-12 border-b flex items-center justify-center'>
                <span className='w-5 h-5 inline-flex items-center justify-center bg-gray-500 text-white rounded-full flex-shrink-0'>
                  <svg
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='3'
                    className='w-3 h-3'
                    viewBox='0 0 24 24'
                  >
                    <path d='M20 6L9 17l-5-5'></path>
                  </svg>
                </span>
              </p>
              <p className=' text-gray-600 text-center h-12 flex border-b items-center justify-center'>
                <span className='w-5 h-5 inline-flex items-center justify-center bg-gray-500 text-white rounded-full flex-shrink-0'>
                  <svg
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='3'
                    className='w-3 h-3'
                    viewBox='0 0 24 24'
                  >
                    <path d='M20 6L9 17l-5-5'></path>
                  </svg>
                </span>
              </p>
              <p className='h-12 text-gray-600 px-6 text-center leading-relaxed flex items-center border-b justify-center'>
                Feature
              </p>
              <p className=' text-gray-600 text-center h-12 flex border-b items-center justify-center'>
                <span className='w-5 h-5 inline-flex items-center justify-center bg-gray-500 text-white rounded-full flex-shrink-0'>
                  <svg
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='3'
                    className='w-3 h-3'
                    viewBox='0 0 24 24'
                  >
                    <path d='M20 6L9 17l-5-5'></path>
                  </svg>
                </span>
              </p>
              <p className='text-gray-600 text-center h-12 border-b flex items-center justify-center'>
                <svg
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2.2'
                  className='w-5 h-5 text-gray-500'
                  viewBox='0 0 24 24'
                >
                  <path d='M18 6L6 18M6 6l12 12'></path>
                </svg>
              </p>
              <p className=' text-gray-600 text-center h-12 flex border-b items-center justify-center'>
                <svg
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2.2'
                  className='w-5 h-5 text-gray-500'
                  viewBox='0 0 24 24'
                >
                  <path d='M18 6L6 18M6 6l12 12'></path>
                </svg>
              </p>
              <p className='text-gray-600 text-center h-12 border-b flex items-center justify-center'>
                <svg
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2.2'
                  className='w-5 h-5 text-gray-500'
                  viewBox='0 0 24 24'
                >
                  <path d='M18 6L6 18M6 6l12 12'></path>
                </svg>
              </p>
              <p className=' text-gray-600 text-center h-12 flex border-b items-center justify-center'>
                <svg
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2.2'
                  className='w-5 h-5 text-gray-500'
                  viewBox='0 0 24 24'
                >
                  <path d='M18 6L6 18M6 6l12 12'></path>
                </svg>
              </p>
            </div>
            <div className='lg:w-1/4 md:w-1/3 sm:w-1/2 lg:-mt-px w-full mb-10 lg:mb-0 border-2 rounded-lg relative'>
              <div className='px-2 text-center h-36 flex flex-col items-center justify-center'>
                <h2 className='text-3xl text-gray-900 font-medium flex items-center justify-center leading-none mb-4 mt-2'>
                  Silver
                </h2>
                <span className='flex items-center text-sm text-gray-600 gap-2'>
                  <span className='text-indigo-500 font-bold text-xl'>$50</span>{" "}
                  user / month
                </span>
              </div>

              <div className='p-6 text-center border-b'>
                <button
                  className='text-white  bg-indigo-500 border-0 py-2 px-2 w-full focus:outline-none hover:bg-indigo-600 rounded'
                  onClick={() => handleClick(plans.silver)}
                >
                  Purchase Now
                </button>
              </div>

              <p className='text-gray-600 text-center h-12 border-b flex items-center justify-center'>
                <span className='w-5 h-5 inline-flex items-center justify-center bg-gray-500 text-white rounded-full flex-shrink-0'>
                  <svg
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='3'
                    className='w-3 h-3'
                    viewBox='0 0 24 24'
                  >
                    <path d='M20 6L9 17l-5-5'></path>
                  </svg>
                </span>
              </p>
              <p className=' text-gray-600 text-center h-12 flex border-b items-center justify-center'>
                <span className='w-5 h-5 inline-flex items-center justify-center bg-gray-500 text-white rounded-full flex-shrink-0'>
                  <svg
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='3'
                    className='w-3 h-3'
                    viewBox='0 0 24 24'
                  >
                    <path d='M20 6L9 17l-5-5'></path>
                  </svg>
                </span>
              </p>
              <p className='h-12 text-gray-600 text-center leading-relaxed flex items-center border-b justify-center'>
                Feature
              </p>

              <p className=' text-gray-600 text-center h-12 flex border-b items-center justify-center'>
                <span className='w-5 h-5 inline-flex items-center justify-center bg-gray-500 text-white rounded-full flex-shrink-0'>
                  <svg
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='3'
                    className='w-3 h-3'
                    viewBox='0 0 24 24'
                  >
                    <path d='M20 6L9 17l-5-5'></path>
                  </svg>
                </span>
              </p>
              <p className='text-gray-600 text-center h-12 border-b flex items-center justify-center'>
                <span className='w-5 h-5 inline-flex items-center justify-center bg-gray-500 text-white rounded-full flex-shrink-0'>
                  <svg
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='3'
                    className='w-3 h-3'
                    viewBox='0 0 24 24'
                  >
                    <path d='M20 6L9 17l-5-5'></path>
                  </svg>
                </span>
              </p>
              <p className=' text-gray-600 text-center h-12 flex border-b items-center justify-center'>
                <svg
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2.2'
                  className='w-5 h-5 text-gray-500'
                  viewBox='0 0 24 24'
                >
                  <path d='M18 6L6 18M6 6l12 12'></path>
                </svg>
              </p>
              <p className='text-gray-600 text-center h-12 border-b flex items-center justify-center'>
                <svg
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2.2'
                  className='w-5 h-5 text-gray-500'
                  viewBox='0 0 24 24'
                >
                  <path d='M18 6L6 18M6 6l12 12'></path>
                </svg>
              </p>
              <p className=' text-gray-600 text-center h-12 flex border-b items-center justify-center'>
                <svg
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2.2'
                  className='w-5 h-5 text-gray-500'
                  viewBox='0 0 24 24'
                >
                  <path d='M18 6L6 18M6 6l12 12'></path>
                </svg>
              </p>
            </div>
            <div className='lg:w-1/4 md:w-1/3 sm:w-1/2 w-full lg:mt-px border-2 rounded-lg border-gray-200'>
              <div className='px-2 text-center h-36 flex flex-col items-center justify-center'>
                <h2 className='text-3xl text-gray-900 font-medium flex items-center justify-center leading-none mb-4 mt-2'>
                  Gold
                </h2>
                <span className='text-sm text-gray-600 flex items-center gap-1'>
                  <span className='text-indigo-500 font-bold text-xl'>
                    $150
                  </span>{" "}
                  user / month
                </span>
              </div>
              <div className='p-6 text-center border-b'>
                <button
                  className='text-white bg-indigo-500 border-0 py-2 px-2 w-full focus:outline-none hover:bg-indigo-600 rounded'
                  onClick={() => handleClick(plans.gold)}
                >
                  Purchase Now
                </button>
              </div>
              <p className='text-gray-600 text-center h-12 border-b flex items-center justify-center'>
                <span className='w-5 h-5 inline-flex items-center justify-center bg-gray-500 text-white rounded-full flex-shrink-0'>
                  <svg
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='3'
                    className='w-3 h-3'
                    viewBox='0 0 24 24'
                  >
                    <path d='M20 6L9 17l-5-5'></path>
                  </svg>
                </span>
              </p>
              <p className=' text-gray-600 text-center h-12 flex border-b items-center justify-center'>
                <span className='w-5 h-5 inline-flex items-center justify-center bg-gray-500 text-white rounded-full flex-shrink-0'>
                  <svg
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='3'
                    className='w-3 h-3'
                    viewBox='0 0 24 24'
                  >
                    <path d='M20 6L9 17l-5-5'></path>
                  </svg>
                </span>
              </p>
              <p className='h-12 text-gray-600 text-center leading-relaxed flex items-center border-b justify-center'>
                Feature
              </p>
              <p className=' text-gray-600 text-center h-12 flex border-b items-center justify-center'>
                <span className='w-5 h-5 inline-flex items-center justify-center bg-gray-500 text-white rounded-full flex-shrink-0'>
                  <svg
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='3'
                    className='w-3 h-3'
                    viewBox='0 0 24 24'
                  >
                    <path d='M20 6L9 17l-5-5'></path>
                  </svg>
                </span>
              </p>
              <p className='text-gray-600 text-center h-12 border-b flex items-center justify-center'>
                <svg
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2.2'
                  className='w-5 h-5 text-gray-500'
                  viewBox='0 0 24 24'
                >
                  <path d='M18 6L6 18M6 6l12 12'></path>
                </svg>
              </p>
              <p className=' text-gray-600 text-center h-12 flex border-b items-center justify-center'>
                <svg
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2.2'
                  className='w-5 h-5 text-gray-500'
                  viewBox='0 0 24 24'
                >
                  <path d='M18 6L6 18M6 6l12 12'></path>
                </svg>
              </p>
              <p className='text-gray-600 text-center h-12 border-b flex items-center justify-center'>
                <svg
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2.2'
                  className='w-5 h-5 text-gray-500'
                  viewBox='0 0 24 24'
                >
                  <path d='M18 6L6 18M6 6l12 12'></path>
                </svg>
              </p>
              <p className=' text-gray-600 text-center h-12 flex border-b items-center justify-center'>
                <svg
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2.2'
                  className='w-5 h-5 text-gray-500'
                  viewBox='0 0 24 24'
                >
                  <path d='M18 6L6 18M6 6l12 12'></path>
                </svg>
              </p>
            </div>{" "}
            <div className='lg:w-1/4 md:w-1/3 sm:w-1/2 w-full lg:mt-px border-2 border-gray-200 rounded-lg'>
              <div className='px-2 text-center h-36 flex flex-col items-center justify-center'>
                <h2 className='text-3xl text-gray-900 font-medium flex items-center justify-center leading-none mb-4 mt-2'>
                  Premium
                </h2>
                <span className='text-sm text-gray-600 flex items-center gap-1'>
                  <span className='text-indigo-500 font-bold text-xl'>
                    $150
                  </span>{" "}
                  user / month
                </span>
              </div>

              <div className='p-6 text-center border-b'>
                <button
                  className='text-white bg-indigo-500 border-0 py-2 px-2 w-full focus:outline-none hover:bg-indigo-600 rounded'
                  onClick={() => handleClick(plans.platinum)}
                >
                  Purchase Now
                </button>
              </div>

              <p className='text-gray-600 text-center h-12 border-b flex items-center justify-center'>
                <span className='w-5 h-5 inline-flex items-center justify-center bg-gray-500 text-white rounded-full flex-shrink-0'>
                  <svg
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='3'
                    className='w-3 h-3'
                    viewBox='0 0 24 24'
                  >
                    <path d='M20 6L9 17l-5-5'></path>
                  </svg>
                </span>
              </p>
              <p className=' text-gray-600 text-center h-12 flex border-b items-center justify-center'>
                <span className='w-5 h-5 inline-flex items-center justify-center bg-gray-500 text-white rounded-full flex-shrink-0'>
                  <svg
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='3'
                    className='w-3 h-3'
                    viewBox='0 0 24 24'
                  >
                    <path d='M20 6L9 17l-5-5'></path>
                  </svg>
                </span>
              </p>
              <p className='h-12 text-gray-600 text-center leading-relaxed flex items-center border-b justify-center'>
                Feature
              </p>
              <p className=' text-gray-600 text-center h-12 flex border-b items-center justify-center'>
                <span className='w-5 h-5 inline-flex items-center justify-center bg-gray-500 text-white rounded-full flex-shrink-0'>
                  <svg
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='3'
                    className='w-3 h-3'
                    viewBox='0 0 24 24'
                  >
                    <path d='M20 6L9 17l-5-5'></path>
                  </svg>
                </span>
              </p>
              <p className='text-gray-600 text-center h-12 border-b flex items-center justify-center'>
                <svg
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2.2'
                  className='w-5 h-5 text-gray-500'
                  viewBox='0 0 24 24'
                >
                  <path d='M18 6L6 18M6 6l12 12'></path>
                </svg>
              </p>
              <p className=' text-gray-600 text-center h-12 flex border-b items-center justify-center'>
                <svg
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2.2'
                  className='w-5 h-5 text-gray-500'
                  viewBox='0 0 24 24'
                >
                  <path d='M18 6L6 18M6 6l12 12'></path>
                </svg>
              </p>
              <p className='text-gray-600 text-center h-12 border-b flex items-center justify-center'>
                <svg
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2.2'
                  className='w-5 h-5 text-gray-500'
                  viewBox='0 0 24 24'
                >
                  <path d='M18 6L6 18M6 6l12 12'></path>
                </svg>
              </p>
              <p className=' text-gray-600 text-center h-12 flex border-b items-center justify-center'>
                <svg
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2.2'
                  className='w-5 h-5 text-gray-500'
                  viewBox='0 0 24 24'
                >
                  <path d='M18 6L6 18M6 6l12 12'></path>
                </svg>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default DashboardPricing
