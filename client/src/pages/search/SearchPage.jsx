import { useState } from "react"
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react"
import { IoChevronDownOutline } from "react-icons/io5"
import { searchPageData } from "../../data/searchpageData"
import Rating from "react-rating"
import ratingStarPlaceholder from "../../assets/images/star-yellow.png"
import { MdOutlineVerifiedUser } from "react-icons/md"
import { CircleFlag } from "react-circle-flags"
import { GoMail } from "react-icons/go"
import { Helmet } from "react-helmet"

export default function SearchPage() {
  const [activeTab, setActiveTab] = useState("buyer")

  const handleTabClick = (value) => {
    setActiveTab(value)
  }

  return (
    <>
      <Helmet>
        <title>{`Search Page - RSGlobalTies`}</title>
        <meta
          name='description'
          content='Explore product details and reviews at RSGlobalTies. Get insights, ratings, and user reviews for various products.'
        />
      </Helmet>
      <Tabs value={activeTab} className='p-4'>
        <TabsHeader className='flex-wrap 800px:flex-nowrap bg-[#ECF0F9] gap-2'>
          {searchPageData.map(({ label, value }) => (
            <Tab
              key={value}
              value={value}
              onClick={() => handleTabClick(value)}
              className={`py-2 px-4 ${
                activeTab === value
                  ? "bg-gradient-to-b from-blue-500 to-indigo-900 !text-white"
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
                <p>Countries</p>
                <IoChevronDownOutline />
              </div>
            </div>
            <ul
              tabIndex={0}
              className='dropdown-content z-[1000] menu p-2 shadow bg-white rounded-box w-52'
            >
              <li>
                <a>Pakistan</a>
              </li>
              <li>
                <a>Saudi Arabia</a>
              </li>
            </ul>
          </div>

          <div className='dropdown flex-1 '>
            <div
              tabIndex={0}
              role='button'
              className='rounded-md py-2 px-4  bg-[#ecf0f9] text-center text-nowrap text-primary font-semibold'
            >
              <div className='flex items-center justify-center'>
                <p>Premium Members </p>
                <IoChevronDownOutline />
              </div>
            </div>
            <ul
              tabIndex={0}
              className='dropdown-content z-[1000] menu p-2 shadow bg-white rounded-box w-52'
            >
              <li>
                <a>Member 1</a>
              </li>
              <li>
                <a>Member 2</a>
              </li>
            </ul>
          </div>
        </TabsHeader>
        <TabsBody>
          {searchPageData.map(({ value, data }) => (
            <TabPanel
              key={value}
              value={value}
              className='p-4 flex flex-wrap items-center justify-center gap-8 font-inter'
            >
              {value !== "product" &&
                value !== "supplier" &&
                data.map((item, index) => (
                  <div
                    key={index}
                    className='w-full  p-4 rounded-md shadow-md border'
                  >
                    <div className='w-full flex items-center justify-between gap-8 500px:flex-row flex-col'>
                      <div className='500px:max-w-[60%] w-full flex flex-col  gap-4'>
                        <h3 className='font-semibold'>{item.cardTitle}</h3>
                        <p className='font-normal'>{item.description}</p>
                        <div className='flex items-center gap-2'>
                          <Rating
                            readonly
                            className='mt-2'
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
                          <span className='mt-[-1px] font-semibold'>3</span>
                        </div>
                      </div>
                      <div className='flex flex-col gap-2 items-end self-end 500px:self-center'>
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
                        <h1 className='text-primary font-semibold text-lg text-nowrap'>
                          Unknown Buyer
                        </h1>
                        <div className='flex justify-start gap-1 font-semibold text-md font-inter items-center'>
                          <CircleFlag
                            countryCode={item.countryCode}
                            className='h-5'
                          />
                          <h3 className='text-sm'>{item.location}</h3>
                        </div>
                        <h2 className='text-black text-sm self-end'>
                          {item.date}
                        </h2>
                        <button className='btn bg-btnprimary text-white'>
                          <div className='flex items-center justify-center gap-2'>
                            <GoMail size={20} fill='#fff' />
                            <p> Inquire Now</p>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              {(value === "product" || value === "supplier") &&
                data.map((item, index) => (
                  <div
                    key={index}
                    className='w-full  p-4 rounded-md shadow-md border'
                  >
                    <div className='w-full flex items-center justify-between gap-8 flex-col 400px:flex-row'>
                      <div className='flex items-center gap-2'>
                        <img
                          src={item.imageSrc}
                          alt='image'
                          className='rounded-md w-[200px] h-[200px] object-cover hidden 800px:block '
                        />
                        <div className='max-w-[100%] flex flex-col gap-2'>
                          <h3 className='font-semibold'>{item.cardTitle}</h3>
                          <p className='font-normal'>{item.description}</p>
                          <div className='flex items-center gap-2'>
                            <Rating
                              readonly
                              className='mt-2'
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
                            <span className='mt-[-1px] font-semibold'>3</span>
                          </div>
                        </div>
                      </div>
                      <div className='flex flex-col gap-2 items-end self-end 400px:self-center'>
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
                        <h1 className='text-primary font-semibold text-lg text-nowrap'>
                          Unknown Buyer
                        </h1>
                        <div className='flex justify-start gap-1 font-semibold text-md font-inter items-center'>
                          <CircleFlag
                            countryCode={item.countryCode}
                            className='h-5'
                          />
                          <h3 className='text-sm'>{item.location}</h3>
                        </div>
                        <h2 className='text-black text-sm self-end'>
                          {item.date}
                        </h2>
                        <button className='btn bg-btnprimary text-white'>
                          <div className='flex items-center justify-center gap-2'>
                            <GoMail size={20} fill='#fff' />
                            <p> Inquire Now</p>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </>
  )
}
