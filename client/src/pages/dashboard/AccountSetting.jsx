import { useDebugValue, useEffect, useState } from "react"
import { useSelector } from "react-redux"

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import axiosInstance from "../../services/axiosInstance"

import { useDispatch } from "react-redux"
import { setUser } from "../../context/userSlice"

import { Helmet } from 'react-helmet'

const AccountSetting = () => {
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [showChangeEmail, setShowChangeEmail] = useState(false)
  const user = useSelector((state) => state.user.user)
  const [formData, setFormData] = useState({})

  const dispatch = useDispatch()

  const handleInputChange = (e) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      toast.error("passwords do not match!")
      return
    }

    try {
      const response = await axiosInstance.post(
        `/Profile/updateEmailAndPassword/`,
        { email: formData.email, password: formData.password },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      console.log(response)
      dispatch(setUser({ ...user, email: response.data.userData.email }))
      toast.success(response.data.message || "data updated successfully")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Helmet>
        <title>{`Account Setting - RSGlobalTies`}</title>
        <meta
          name='description'
          content='Get insights, ratings, and user reviews for various products.'
        />
      </Helmet>
      <div className='flex items-center justify-center m-auto'>
        <div className='p-4 md:p-20 bg-white shadow-md rounded-md flex flex-col gap-4 w-full  '>
          <h1 className='self-start text-2xl font-bold'>Account Setting</h1>
          <div className='mb-2 '>
            <label className='block text-sm text-label font-inter mb-2'>
              Email Address
            </label>
            <div className='flex items-center justify-between flex-wrap gap-5 600px:gap-40 600px:flex-nowrap w-full'>
              <p>
                Your Email Address is:{" "}
                <span className='font-semibold text-nowrap'>{user.email}</span>
              </p>
              <button
                className='btn'
                onClick={() => setShowChangeEmail((prev) => !prev)}
              >
                Change
              </button>
            </div>
            {showChangeEmail ? (
              <>
                <div>
                  <label
                    className='block text-sm text-label font-inter mb-2'
                    htmlFor='email'
                  >
                    New Email
                  </label>
                  <input
                    type='email'
                    id='email'
                    className='w-full h-[55px] px-4 py-2 text-sm  border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
                    placeholder='new email'
                    name='email'
                    onChange={handleInputChange}
                  />
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className='mb-2'>
            <label
              className='block text-sm text-label font-inter mb-2'
              htmlFor='password'
            >
              Current Password
            </label>
            <div className='flex items-center justify-between flex-wrap gap-5 600px:gap-40 600px:flex-nowrap w-full'>
              <input
                type='password'
                id='currentPassword'
                className='w-full h-[55px] px-4 py-2 text-sm  border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
                placeholder='**********'
                name='currentPassword'
                onChange={handleInputChange}
              />
              <button
                className='btn'
                onClick={() => setShowChangePassword((prevValue) => !prevValue)}
              >
                Change
              </button>
            </div>
          </div>
          {showChangePassword && (
            <div className='mb-2'>
              <div className='mb-2'>
                <label
                  className='block text-sm text-label font-inter mb-2'
                  htmlFor='fullname'
                >
                  New Password
                </label>
                <input
                  type='password'
                  id='password'
                  className='w-full h-[55px] px-4 py-2 text-sm  border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
                  placeholder='**********'
                  name='password'
                  onChange={handleInputChange}
                />
              </div>
              <div className='mb-2'>
                <label
                  className='block text-sm text-label font-inter mb-2'
                  htmlFor='fullname'
                >
                  Confirm New Password
                </label>
                <input
                  type='password'
                  id='confirmPassword'
                  className='w-full h-[55px] px-4 py-2 text-sm  border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
                  placeholder='**********'
                  name='confirmPassword'
                  onChange={handleInputChange}
                />
              </div>
            </div>
          )}

          <div className='flex items-center justify-between  mt-24'>
            <h1 className='btn px-10 '>Cancel</h1>
            <button
              className='btn btn-primary px-10 bg-primary'
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  )
}

export default AccountSetting
