import { FaAngleDown } from "react-icons/fa6"
import { SlOptionsVertical } from "react-icons/sl"
import { useEffect, useState } from "react"
import axiosInstance from "../../services/axiosInstance"
import { Helmet } from "react-helmet"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SuperUsersList = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchValue, setSearchValue] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const { data } = await axiosInstance.get(
          "/subscribe/getAllUsersInformation"
        )
        setUsers(data)
        setLoading(false)
      } catch (error) {
        console.error("error from super users list: fetching users ", error)
        setLoading(false)
      }
    }

    fetchAllUsers()
  }, [])

  const handleDeleteUser = async (userId) => {
    try {
      const res = await axiosInstance.delete(`/subscribe/deleteUser/${userId}`)
      if(res.status === 200) {
        setUsers((prevUsers) =>
          prevUsers.filter((item) => item.user._id !== userId)
        )      
        toast.success(res.data.message)
      }
      setIsDropdownOpen(false)
    } catch (error) {
      console.log(error);
      toast.error('error deleting user')
    }
  }

  const handleSuspendUser = async (userId) => {
    try {
      const {data} = await axiosInstance.post(`/subscribe/suspendUser/${userId}`)
      toast.success(data.message)
      setIsDropdownOpen(false)

    } catch (error) {
      console.log(error);
      toast.error('error suspending user')
    }
  }

  const filteredUsers = users.filter((user) =>
    user.user.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  console.log("users",users)
  return (
    <>
      <Helmet>
        <title>{`users list - RSGlobalTies`}</title>
        <meta
          name='description'
          content='Add Products and services to list on the RSGlobalTies. Get insights, ratings, and user reviews for various products.'
        />
      </Helmet>
      <div className='w-full p-4'>
      <ToastContainer/>
        <div className='flex items-center justify-between w-full flex-wrap'>
          <h1 className='p-2 font-inter text-xl font-[500]'>Users List</h1>
          <div className='flex items-center justify-between '>
            <div className='relative flex items-center  h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden'>
              <div className='grid place-items-center h-full w-12 text-gray-300'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                  />
                </svg>
              </div>

              <input
                className='peer h-full w-full outline-none text-sm text-gray-700 pr-2'
                type='text'
                id='search'
                placeholder='Search by name...'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
            <div className='dropdown dropdown-end'>
              <div
                tabIndex={0}
                role='button'
                className='px-4 py-2 bg-base-200 rounded-md flex items-center gap-2'
              >
                <p> Month</p>
                <FaAngleDown size={20} />
              </div>
              <ul
                tabIndex={0}
                className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52'
              >
                <li>
                  <a>Day</a>
                </li>
                <li>
                  <a>Week</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className='relative overflow-x-auto scrollbar-thin'>
          <table className='w-full text-sm text-left rtl:text-right text-gray-500 '>
            <thead className='text-xs text-gray-400  uppercase bg-gray-50  '>
              <tr>
                <th scope='col' className='px-6 py-3'>
                  Username
                </th>
                <th scope='col' className='px-6 py-3'>
                  Company
                </th>
                <th scope='col' className='px-6 py-3'>
                  Subscription
                </th>
                <th scope='col' className='px-6 py-3'>
                  Email
                </th>
                <th scope='col' className='px-6 py-3'>
                  Country
                </th>
                <th scope='col' className='px-6 py-3'>
                  Join Date
                </th>
                <th scope='col' className='px-6 py-3'>
                  Business Document
                </th>
                <th scope='col' className='px-6 py-3'>
                  Status
                </th>
                <th scope='col' className='px-6 py-3'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Loading Indicator */}
              {loading && <div className='text-center mt-4'>Loading...</div>}
              {filteredUsers.map((item, index) => (
                <tr className='bg-white text-black text-nowrap ' key={index}>
                  <td className='px-6 py-4'>{item.user.name}</td>
                  <td className='px-6 py-4'>{item.user.companyName}</td>

                  <td className='px-6 py-4'>
                  {item.subscription ? item.subscription.planKey : "None"}
                  </td>
                  <td className='px-6 py-4'>{item.user.email}</td>
                  <td className='px-6 py-4'>{item.user.country}</td>
                  <td className='px-6 py-4'>Dec</td>
                  <td className='px-6 py-4'>None</td>
                  <td className='px-3 py-2 '>
                    <span
                      className={`px-3 py-2 font-[500]  rounded-md ${
                        item.user.isCompanyVerifed === true
                          ? "text-blue-400 bg-[#B2CDFF61]"
                          : "text-red-600 bg-[#F7B0B069]"
                      }`}
                    >
                      {" "}
                      {item.user.isCompanyVerifed === true ? (
                        <>Verified</>
                      ) : (
                        <>UnVerified</>
                      )}
                    </span>
                  </td>
                  <td className='flex items-end justify-center px-6 py-4'>
                    <div className='dropdown dropdown-end'>
                      <div tabIndex={0} role='button' className=''>
                        <SlOptionsVertical size={20} onClick={()=>setIsDropdownOpen(true)}/>
                      </div>
                      {isDropdownOpen && (
                        <ul
                        tabIndex={0}
                        className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52'
                      >
                        {item.user.isCompanyVerifed === true ? (
                          ""
                        ) : (
                          <li>
                            <a>Verify</a>
                          </li>
                        )}
                        <li onClick={() => handleSuspendUser(item.user._id)}>
                          <button>Suspend</button>
                        </li>
                        <li onClick={() => handleDeleteUser(item.user._id)}>
                          <button>Delete</button>
                        </li>
                      </ul>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default SuperUsersList
