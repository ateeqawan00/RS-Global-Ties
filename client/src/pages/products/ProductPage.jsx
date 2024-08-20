import { useState } from "react"
import { CircleFlag } from "react-circle-flags"
import { GoMail } from "react-icons/go"
import { MdOutlineVerifiedUser } from "react-icons/md"
import ratingStarPlaceholder from "../../assets/images/star-yellow.png"
import Rating from "react-rating"
import { productPageData } from "../../data/productPageData"
import { Helmet } from "react-helmet"
const ProductPage = () => {
  const [images, setImages] = useState({
    img1: "https://s3-alpha-sig.figma.com/img/041a/e1ef/baab2bad1dc397ac1c746f9eb41c34cf?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BtAupBNVYG98z2O87p2Gyn~tvEBEdTDP0nTT2Tfr9gTuZ27XRY21OYWtX8kN54VfYkHRv01-LldP7IB4kYS6euwrcbIRQmrGCYUYbUJjDOa-Gqa27Yp02iI1xGfTPgQ9OxFOypxNs08utVEOMLBQzGo5Aw-Ut3iqsvMePtDcE5YILZ6OSo0l6SOFE7ZPhIKJ0PDIDogOCCeruxxBBwSSQOR-iQjcmyCwfA2to0s9ysg8et0TzDRB3~9BncSSZOgNraP3l24nXZgV62NU0IgcAaCVJfJJptnPv4rmnA3E3O4KEGFfQ898MpNoPbeStLqMhE1HDP04kWhmpxWI5dQvow__",
    img2: "https://s3-alpha-sig.figma.com/img/08cd/4868/25066c7e1fd7dbd0ed44dca9d3c0605e?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jsZk0GxewCJZSV5GvKuW2xEDS7M1FvyShVGw3JBVcQoCITdvMCGMSNeEl5tprFGSkHWkDn1rhFJvZ2pAvnGiaHjwAF6fJpmjrPV3k-2FEP7xsffhIu-en-7vrLNASpgYRQMSsCcgTrMORfAV50ZmQR2WXnSvFE0EYA4wf90Biq8iCQJe47R~H1zHTitYfdJZYi0m6dbs9AeUZ7KSFCVldur-zgKGqs5ef3UrIDEyS-zXv5NVDY5eMyTDugmmPUUllrYsBuhvmiID1ppjHeOko11n3EgfNN5gPVcqzL6H74QKOYmpDUVg3IF2HB8glxJQngySL1cS8mOjh~1vIR80nQ__",
    img3: "https://s3-alpha-sig.figma.com/img/08cd/4868/25066c7e1fd7dbd0ed44dca9d3c0605e?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jsZk0GxewCJZSV5GvKuW2xEDS7M1FvyShVGw3JBVcQoCITdvMCGMSNeEl5tprFGSkHWkDn1rhFJvZ2pAvnGiaHjwAF6fJpmjrPV3k-2FEP7xsffhIu-en-7vrLNASpgYRQMSsCcgTrMORfAV50ZmQR2WXnSvFE0EYA4wf90Biq8iCQJe47R~H1zHTitYfdJZYi0m6dbs9AeUZ7KSFCVldur-zgKGqs5ef3UrIDEyS-zXv5NVDY5eMyTDugmmPUUllrYsBuhvmiID1ppjHeOko11n3EgfNN5gPVcqzL6H74QKOYmpDUVg3IF2HB8glxJQngySL1cS8mOjh~1vIR80nQ__",
    img4: "https://s3-alpha-sig.figma.com/img/08cd/4868/25066c7e1fd7dbd0ed44dca9d3c0605e?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jsZk0GxewCJZSV5GvKuW2xEDS7M1FvyShVGw3JBVcQoCITdvMCGMSNeEl5tprFGSkHWkDn1rhFJvZ2pAvnGiaHjwAF6fJpmjrPV3k-2FEP7xsffhIu-en-7vrLNASpgYRQMSsCcgTrMORfAV50ZmQR2WXnSvFE0EYA4wf90Biq8iCQJe47R~H1zHTitYfdJZYi0m6dbs9AeUZ7KSFCVldur-zgKGqs5ef3UrIDEyS-zXv5NVDY5eMyTDugmmPUUllrYsBuhvmiID1ppjHeOko11n3EgfNN5gPVcqzL6H74QKOYmpDUVg3IF2HB8glxJQngySL1cS8mOjh~1vIR80nQ__",
  })

  const [activeImg, setActiveImage] = useState(images.img1)

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
          <h1 className='text-[#D4AF37] font-semibold text-[1.2rem]'>
            Gold Member
          </h1>
          <div className='flex items-center justify-between gap-1 text-green-500'>
            <div className='flex items-center gap-2'>
              <MdOutlineVerifiedUser size={20} fill='#22c55e' />
              <p>verified</p>
            </div>
            <div className='flex items-center gap-4 text-black font-semibold'>
              <CircleFlag countryCode='uk' className='h-4' />
              <h3>Antonio From Germany</h3>
            </div>
          </div>
        </div>
        <div className='flex flex-col justify-between lg:flex-row gap-16 lg:items-start p-8'>
          <div className='flex flex-col gap-6 lg:w-2/4'>
            <img
              src={activeImg}
              alt=''
              className='w-full h-full aspect-square object-cover rounded-xl'
            />
            <div className='flex flex-row items-center gap-3  flex-wrap '>
              <img
                src={images.img1}
                alt=''
                className='w-[6rem] h-[6rem] 500px:w-1/4 object-cover rounded-md cursor-pointer'
                onClick={() => setActiveImage(images.img1)}
              />

              <img
                src={images.img2}
                alt=''
                className='w-[6rem] h-[6rem] 500px:w-1/4 object-cover rounded-md cursor-pointer'
                onClick={() => setActiveImage(images.img2)}
              />
              <img
                src={images.img3}
                alt=''
                className='w-[6rem] h-[6rem] 500px:w-1/4 object-cover rounded-md cursor-pointer'
                onClick={() => setActiveImage(images.img3)}
              />
            </div>
          </div>
          {/* ABOUT */}
          <div className='flex flex-wrap lg:w-2/4  500px:flex-row flex-col'>
            <div className='flex flex-col gap-4 w-full 700px:w-2/4 p-6'>
              <div>
                <h1 className='text-3xl font-bold text-primary'>Grapes</h1>
              </div>
              <p className='text-gray-700'>
                Experience seamless 24/7 jeep services from Raikot Bridge to
                Shambala Resort in Fairy Meadow. Our reliable and convenient
                transportation ensures a hassle-free journey, allowing you to
                fully enjoy the enchanting beauty of this mesmerizing
                destination. Sit back, relax, and let us take care of your
                travel needs while you create unforgettable memories in Fairy
                Meadow. Experience seamless 24/7 jeep services from Raikot
                Bridge to Shambala Resort in Fairy Meadow. Our reliable and
                convenien
              </p>
            </div>
            <section className='bg-white  w-full 700px:w-2/4'>
              <div className='py-8 px-4 mx-auto max-w-screen-md'>
                <form action='#' className='space-y-8'>
                  <div>
                    <label
                      htmlFor='email'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                    >
                      Your email
                    </label>
                    <input
                      type='email'
                      id='email'
                      className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light'
                      placeholder='name@globalties.com'
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='subject'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                    >
                      Subject
                    </label>
                    <input
                      type='text'
                      id='subject'
                      className='block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light'
                      placeholder='Let us know how we can help you'
                      required
                    />
                  </div>
                  <div className='sm:col-span-2'>
                    <label
                      htmlFor='message'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400'
                    >
                      Your message
                    </label>
                    <textarea
                      id='message'
                      rows='6'
                      className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                      placeholder='Leave a comment...'
                    ></textarea>
                  </div>
                  <button
                    type='submit'
                    className='py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
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
        <div className='flex items-center justify-center flex-col p-4 gap-4'>
          <p className='font-semibold'>
            The user hasn&apos;t received any reviews yet
          </p>
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
          <div>
            <p className='text-primary font-semibold'>Write a Review</p>
          </div>
          <div>
            <textarea
              placeholder='Type Here'
              className='border border-gray-300 rounded-md w-full h-32 textarea-sm'
            ></textarea>
          </div>
          <div className='flex justify-end space-x-3'>
            <button
              className='py-1 px-8 text-xs text-center border border-primary rounded-full text-primary sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
              onClick={() => document.getElementById("user-review").close()}
            >
              Cancel
            </button>
            <button className='py-1 px-8 text-xs text-center text-white bg-primary border rounded-full sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'>
              Done
            </button>
          </div>
        </div>
      </dialog>
      <div className='p-6  '>
        <h1 className='text-primary font-semibold text-[1.5rem] font-inter'>
          More Similar Items
        </h1>
        <div className='p-4 flex flex-wrap items-center justify-center 500px:text-nowrap gap-8'>
          {productPageData.map((item, index) => (
            <div
              key={index}
              className='w-full  700px:w-[300px] 1100px:w-[500px] 1200px:w-[550px] 1300px:w-[600px] p-4 rounded-md shadow-md border'
            >
              <div className=' flex  items-center justify-between gap-4 300px:flex-wrap '>
                <h3 className='text-md font-semibold text-primary text-wrap'>
                  {item.cardTitle}
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
        </div>
      </div>
    </>
  )
}

export default ProductPage
