import { RxHamburgerMenu } from "react-icons/rx"
import { IoMdNotificationsOutline } from "react-icons/io"
import { IoChevronDown, IoHomeOutline } from "react-icons/io5"
import { dashboardSidebarData } from "../../data/dashboardSidebarData"
import { FaChevronDown } from "react-icons/fa6"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../context/userSlice"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DashboardNavbar = () => {
  const user = useSelector((state) => state.user.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate("/")
  }

  return (
    <div>
      <div className='bg-gradient-to-r flex from-blue-400 to-indigo-900 items-center justify-center p-2'>
        <div className='flex 400px:w-[90%] w-[100%] items-center justify-between '>
          <Link to={"/"}>
            <div className=' hidden  p-2 lg:flex items-center justify-center gap-2 font-inter text-white font-semibold  hover:cursor-pointer hover:bg-black/5 hover:rounded-md'>
              <IoHomeOutline size={25} /> Home
            </div>
          </Link>

          <label
            htmlFor='my-drawer-2'
            className=' drawer-button lg:hidden p-2 flex items-center justify-center gap-2 font-inter text-white font-semibold  hover:cursor-pointer hover:bg-black/5 hover:rounded-md'
          >
            <RxHamburgerMenu size={25} /> <p>Menu</p>
          </label>

          {user && (
            <div className='flex items-center justify-center gap-2'>
              <div className='flex items-center justify-center gap-6 relative'>
                <Link to={`/dashboard/chat`}>
                  <IoMdNotificationsOutline size={25} fill='#fff' />
                </Link>
                <div className='dropdown dropdown-bottom dropdown-end'>
                  <div
                    tabIndex={0}
                    role='button'
                    className=' rounded-md flex items-center gap-2'
                  >
                    <img
                      src={`${
                        user?.avatar
                          ? user?.avatar
                          : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                      }`}
                      alt='user-img'
                      className='rounded-full w-[40px] h-[40px] object-cover'
                    />
                    <span className='text-white f text-md'>
                      {user?.fullName ? user?.fullName : "Shamila"}{" "}
                    </span>
                    <FaChevronDown size={15} fill='#fff' />
                  </div>
                  <ul
                    tabIndex={0}
                    className='dropdown-content z-[10] menu p-2 shadow bg-base-100 rounded-box w-52 absolute top-[40px] right-0'
                  >
                    <li>
                      <Link to={`/`}>Home</Link>
                    </li>
                    <li>
                      <button onClick={handleLogout}>Logout</button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* DRAWER  */}
      <div className='drawer lg:drawer-open '>
        <input id='my-drawer-2' type='checkbox' className='drawer-toggle' />
        <div className='drawer-content flex flex-col p-4 bg-[#f9f9f9]'>
          <Outlet />
        </div>
        <div className='drawer-side'>
          <label
            htmlFor='my-drawer-2'
            aria-label='close sidebar'
            className='drawer-overlay'
          ></label>
          <ul className='menu p-4 w-80 min-h-full bg-[#ECF0F9] text-black'>
            {dashboardSidebarData.map((item, index) =>
              item.type ? (
                <div className='collapse bg-[#ECF0F9]  ' key={index}>
                  <input type='checkbox' />
                  <div className=' collapse-title text-sm font-medium flex items-center justify-between '>
                    {item.title} <IoChevronDown />
                  </div>
                  <div className='collapse-content'>
                    {item.subItems.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          onClick={() =>
                            document.getElementById("my-drawer-2").click()
                          }
                          to={subItem.path}
                          className='block p-3 hover:!bg-primary hover:!text-white'
                        >
                          {subItem.title}
                        </Link>
                      </li>
                    ))}
                  </div>
                </div>
              ) : (
                <li
                  key={index}
                  className='rounded-md hover:bg-primary hover:text-white'
                >
                  <Link
                    className='h-[50px] flex items-center font-[500]'
                    to={item.path}
                    onClick={() =>
                      document.getElementById("my-drawer-2").click()
                    }
                  >
                    {item.title}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default DashboardNavbar
