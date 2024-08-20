import { useEffect, useState } from "react"
import { countryCodeData } from "../../data/profileInputData"
import Flag from "react-world-flags"

import { useSelector } from "react-redux"
import axiosInstance from "../../services/axiosInstance"

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { setUser } from "../../context/userSlice"
import { useDispatch } from "react-redux"
import { Helmet } from "react-helmet"

const SuperUserProfile = () => {
  const [selectedCountry, setSelectedCountry] = useState(countryCodeData[0])
  const user = useSelector((state) => state.user.user)
  const [selectedAvatar, setSelectedAvatar] = useState(null)
  const [formData, setFormData] = useState({})
  const [hasChanges, setHasChanges] = useState(false)

  const { fullName, email, avatar } = user

  const dispatch = useDispatch()

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setSelectedAvatar(file)
    setHasChanges(true)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    setHasChanges(true)
  }

  const handleRemoveAvatar = () => {
    document.getElementById("avatar").value = null
    setSelectedAvatar(null)
  }

  const handleCancel = () => {
    setFormData({
      fullName: fullName || "",
      email: email || "",
      avatar: avatar || "",
    })
    setHasChanges(false)
  }

  const handleSubmit = async () => {
    try {
      const formDataWithFile = new FormData()

      if (selectedAvatar) {
        formDataWithFile.append("avatar", selectedAvatar)
      }

      for (const key in formData) {
        formDataWithFile.append(key, formData[key])
      }

      const response = await axiosInstance.put(
        `/admin/updateAdmin/${user?._id}`,
        formDataWithFile
      )

      console.log(response)

      dispatch(
        setUser({
          ...user,
          email: response.data?.userData.email,
          avatar: response.data?.userData.avatar,
          fullName: response.data?.userData.fullName,
        })
      )
      setHasChanges(false)
      toast.success(response.data?.message)
    } catch (error) {
      if (error.response) {
        console.error(
          "Error occurred updating the profile:",
          error.response.data.error
        )
        toast.error(error.response.data?.error)
      } else {
        console.error("Error occurred updating the profile:", error)
      }
    }
  }

  useEffect(() => {
    setFormData({
      fullName: fullName || "",
      email: email || "",
      avatar: avatar || "",
    })
  }, [fullName, email, avatar])

  // console.log(user);
  // console.log("log form data: ", formData)

  return (
    <>
      <Helmet>
        <title>{`Super User Profile - RSGlobalTies`}</title>
        <meta
          name='description'
          content='Add Products and services to list on the RSGlobalTies. Get insights, ratings, and user reviews for various products.'
        />
      </Helmet>
      <div className='flex items-center justify-center m-auto'>
        <div className='p-4 md:p-20 bg-white shadow-md rounded-md flex flex-col gap-4 w-full  '>
          <div className='flex items-center justify-between '>
            <h1 className='text-2xl font-bold'>User Profile</h1>
            <button className='btn btn-primary bg-primary'>
              Export Profile
            </button>
          </div>
          {/* PROFILE AREA  */}
          <div className='flex items-center space-x-6 justify-center gap-2 500px:justify-normal 500px:gap-0 flex-wrap 500px:flex-row'>
            <div className='shrink-0'>
              <img
                id='preview_img'
                className='h-16 w-16 object-cover rounded-full'
                src={
                  selectedAvatar ? URL.createObjectURL(selectedAvatar) : avatar
                }
                alt='Current profile photo'
              />
            </div>
            <div className='flex gap-3 items-center'>
              <label
                htmlFor='Avatar'
                className=' block w-full text-sm text-slate-500 mr-4 py-2 px-4 rounded-full border-0 font-semibold bg-violet-50 hover:bg-violet-100 hover:cursor-pointer text-nowrap'
              >
                Choose Avatar
                <input
                  type='file'
                  className='hidden'
                  id='Avatar'
                  onChange={handleFileChange}
                />
              </label>
              <button
                className='btn'
                disabled={selectedAvatar === null ? true : false}
                onClick={handleRemoveAvatar}
              >
                Remove
              </button>
            </div>
          </div>
          {/* INPUTS  */}
          <div className='mb-2'>
            <label className='block text-sm text-label font-inter mb-2'>
              Name
            </label>
            <input
              type='text'
              name='fullName'
              value={formData.fullName || ""}
              onChange={handleInputChange}
              className='w-full bg-white h-[55px]  px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600'
              placeholder=''
            />
          </div>
          <div className='mb-2'>
            <label className='block text-sm text-label font-inter mb-2'>
              Email Address
            </label>
            <input
              type='email'
              name='email'
              value={formData.email || ""}
              onChange={handleInputChange}
              className='w-full bg-white h-[55px]  px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600'
              placeholder=''
              disabled
            />
          </div>
          <div className='flex items-center'>
            <div className='relative'>
              {/* Country code dropdown */}
              <select
                value={selectedCountry.code}
                onChange={(e) =>
                  setSelectedCountry(
                    countryCodeData.find(
                      (country) => country.code === e.target.value
                    )
                  )
                }
                className='flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100'
              >
                {countryCodeData.map((country) => (
                  <option key={country.code} value={country.code}>
                    <Flag code={country.flag} />({country.code})
                  </option>
                ))}
              </select>
            </div>
            <input
              type='text'
              className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-r-lg border-s-0 border border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              placeholder='123-456-7890'
            />
          </div>
          <div className='flex items-center justify-between mt-6'>
            <h1 className='btn px-10' onClick={handleCancel}>
              Cancel
            </h1>
            <button
              className={`btn btn-primary px-10 bg-primary ${
                !hasChanges && "opacity-50 cursor-not-allowed"
              }`}
              onClick={handleSubmit}
              disabled={!hasChanges}
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

export default SuperUserProfile
