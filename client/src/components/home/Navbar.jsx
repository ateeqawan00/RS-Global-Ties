import { RxHamburgerMenu } from "react-icons/rx"
import { IoIosSearch, IoMdNotificationsOutline } from "react-icons/io"
import { FaChevronDown, FaChevronRight } from "react-icons/fa6"

// import { sidebarCategories } from "../../data/sidebarData"
import { Link, Outlet, useNavigate } from "react-router-dom"

import { logout } from "../../context/userSlice"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useRef, useState } from "react"

import axiosInstance from "../../services/axiosInstance"
import ScaleLoader from "react-spinners/ScaleLoader"

const Navbar = () => {
  const user = useSelector((state) => state.user.user)
  const dispatch = useDispatch()
  const [categories, setCategories] = useState()
  const [selectedCategory, setSelectedCategory] = useState()
  const [subCategories, setSubCategories] = useState()

  const [userType, setUserType] = useState("all-categories")
  const [searchTerm, setSearchTerm] = useState()
  const [loading, setLoading] = useState(false)

  const dropdownRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value)
  }

  // console.log("settted user: ", user)

  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(logout())
  }

  const handleClick = (filterParam) => {
    navigate(`/category/${filterParam}`)
  }

  const handleNavigate = () => {
    if (!searchTerm || !userType) return
    navigate(`/category/${searchTerm}/${userType}`)
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axiosInstance.get("/Catagory/getAllCategories")
        setCategories(data)
      } catch (error) {
        console.error("Error fetching categories: ", error)
      }
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        if (!selectedCategory) return
        setLoading(true) // Set loading state to true before fetching subcategories
        const { data } = await axiosInstance.get(
          `/subcatagory/getAllSubcategories/${selectedCategory}`
        )
        console.log(data);
        setSubCategories(data)
        setLoading(false) // Set loading state to false after fetching subcategories
      } catch (error) {
        console.error("Error fetching subcategories: ", error)
        setLoading(false) // Set loading state to false in case of an error
      }
    }

    fetchSubCategories()
  }, [selectedCategory])

  // console.log("sidebar cats: ", categories)
  // console.log("sidebar sub cats: ", subCategories)

  return (
    <div>
      <div className='bg-gradient-to-r flex from-blue-400 to-indigo-900 items-center justify-center p-2'>
        <div className='flex 400px:w-[90%] w-[100%] items-center justify-between '>
          <label
            htmlFor='my-drawer'
            className='p-2 flex items-center justify-center gap-2 font-inter text-white font-semibold  hover:cursor-pointer hover:bg-black/5 hover:rounded-md'
          >
            <RxHamburgerMenu size={20} className='' /> <p>Categories</p>
          </label>
          <div className='searchbar hidden 800px:block w-[50%]'>
            <form>
              <div className='flex'>
                <select
                  id='dropdown-button'
                  data-dropdown-toggle='dropdown'
                  className='flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-gray-900 bg-white rounded-s-lg hover:bg-gray-200 '
                  value={userType}
                  onChange={handleUserTypeChange}
                >
                  <option
                    value='all-categories'
                    className='inline-flex w-full px-4 py-2 hover:bg-gray-100'
                  >
                    All categories
                  </option>

                  <option
                    value='product'
                    className='inline-flex w-full px-4 py-2 hover:bg-gray-100'
                  >
                    Product
                  </option>

                  <option
                    value='supplier'
                    className='inline-flex w-full px-4 py-2 hover:bg-gray-100'
                  >
                    Supplier
                  </option>

                  <option
                    value='buyer'
                    className='inline-flex w-full px-4 py-2 hover:bg-gray-100'
                  >
                    Buyer
                  </option>

                  <option
                    value='services'
                    className='inline-flex w-full px-4 py-2 hover:bg-gray-100'
                  >
                    Services
                  </option>
                </select>
                <div className='relative w-full'>
                  <input
                    type='search'
                    id='search-dropdown'
                    className='block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-white focus:outline-none'
                    placeholder='Enter search query.....'
                    required
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button
                    type='submit'
                    className='absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg '
                    onClick={handleNavigate}
                  >
                    <IoIosSearch size={25} className='mr-1' />
                  </button>
                </div>
              </div>
            </form>
          </div>
          {user ? (
            <div className='flex items-center justify-center gap-6 relative'>
              <Link to={`/dashboard/chat`}>
                <IoMdNotificationsOutline size={25} fill='#fff' />
              </Link>
              <div
                ref={dropdownRef}
                tabIndex={0}
                role='button'
                className='dropdown dropdown-bottom dropdown-end relative'
                onClick={() => setIsOpen(!isOpen)}
              >
                <div className=' rounded-md flex items-center gap-2'>
                  <img
                    src={
                      user?.avatar
                        ? user?.avatar
                        : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Fvector-art%2F9292244-default-avatar-icon-vector-of-social-media-user&psig=AOvVaw026x5iZnIBxK76P46LWVI6&ust=1712690870341000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMjF9-qss4UDFQAAAAAdAAAAABAE"
                    }
                    alt='user-img'
                    className='rounded-full w-[40px] h-[40px] object-cover'
                  />
                  <span className='text-white f text-md'>
                    {user?.fullName ? user?.fullName : "Shamila"}
                  </span>
                  <FaChevronDown size={15} fill='#fff' />
                </div>
                {isOpen && (
                  <ul className='dropdown-content z-[10] menu p-2 shadow bg-base-100 rounded-box w-52 absolute top-[40px] right-0'>
                    <li>
                      <Link to={`/dashboard`}>Dashboard</Link>
                    </li>
                    <li>
                      <Link to={`/dashboard/user-profile`}>Profile</Link>
                    </li>
                    <li>
                      <button onClick={handleLogout}>Logout</button>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          ) : (
            <div className='flex items-center justify-center gap-2'>
              <button
                className='bg-white py-2 px-4 rounded-md'
                onClick={() => navigate("/login")}
              >
                Sign In
              </button>
              <button
                className='bg-white py-2 px-4 rounded-md'
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
      {/* DRAWER - SIDEBAR  */}
      <div className='drawer '>
        <input id='my-drawer' type='checkbox' className='drawer-toggle' />
        <div className='drawer-content'>
          <Outlet />
        </div>
        <div className='drawer-side z-[999] scrollbar scrollbar-w-[0px]'>
          <label
            htmlFor='my-drawer'
            aria-label='close sidebar'
            className='drawer-overlay'
          ></label>
          <ul className='menu p-2 w-60 min-h-full bg-base-200 '>
            {/* DRAWER SEARCHBAR  +800px */}
            <li>
              <div className='searchbar block 800px:hidden'>
                <form>
                  <div className='flex flex-col sm:flex-row'>
                    <select
                      id='dropdown-button'
                      data-dropdown-toggle='dropdown'
                      className='flex-shrink-0 z-10 inline-flex items-center py-2.5 px-2 sm:px-4 text-sm font-medium text-center text-gray-900 bg-white rounded-s-lg hover:bg-gray-200 sm:w-[150px]'
                    >
                      <option
                        value='all-categories'
                        className='inline-flex w-full hover:bg-gray-100'
                      >
                        All categories
                      </option>
                      <option
                        value='product'
                        className='inline-flex w-full hover:bg-gray-100'
                      >
                        Product
                      </option>
                      <option
                        value='supplier'
                        className='inline-flex w-full px-4 py-2 hover:bg-gray-100'
                      >
                        Supplier
                      </option>
                      <option
                        value='buyer'
                        className='inline-flex w-full px-4 py-2 hover:bg-gray-100'
                      >
                        Buyer
                      </option>
                      <option
                        value='services'
                        className='inline-flex w-full px-4 py-2 hover:bg-gray-100'
                      >
                        Services
                      </option>
                    </select>
                    <div className='relative w-full mt-2 sm:mt-0 sm:ml-4'>
                      <input
                        type='search'
                        id='search-dropdown'
                        className='block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-white'
                        placeholder='Enter search query.....'
                        required
                      />
                      <button
                        type='submit'
                        className='absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg'
                      >
                        <IoIosSearch size={25} className='mr-1' />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </li>
            {categories && categories.length > 0 ? (
              categories.map((item, index) => (
                <li
                  key={index}
                  className='rounded-md font-bold hover:cursor-pointer hover:bg-slate-300 text-base'
                >
                  <button onClick={() => setSelectedCategory(item._id)}>
                    <div className='flex items-center justify-start gap-1'>
                      {selectedCategory === item._id ? (
                        <FaChevronDown size={15} />
                      ) : (
                        <FaChevronRight size={15} />
                      )}
                      <p className='text-slate-800'>{item.name}</p>{" "}
                      {/* Category text is bolder */}
                    </div>
                  </button>
                  {selectedCategory === item._id && (
                    <ul className='pl-3 flex flex-col'>
                      {loading ? ( // Display ClipLoader while loading is true
                        <li>
                          <ScaleLoader
                            color={"#456789"}
                            loading={loading}
                            size={20}
                            css={"background-color: transparent;"}
                          />
                        </li>
                      ) : (
                        <>
                          {subCategories && subCategories.length > 0 ? (
                            subCategories.map((subItem, subIndex) => (
                              <button
                                onClick={() => handleClick(subItem.names[0])}
                                key={subIndex}
                              >
                                <li>
                                  <Link className='text-slate-500  font-medium'>
                                    {subItem.names[0]}
                                  </Link>{" "}
                                  {/* Subcategory text is lighter */}
                                </li>
                              </button>
                            ))
                          ) : (
                            <li>No subcategories found.</li>
                          )}
                        </>
                      )}
                    </ul>
                  )}
                </li>
              ))
            ) : (
              <li>No categories found.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
