import { useState, useEffect } from "react"
import { countryCodeData } from "../../data/profileInputData"
import Flag from "react-world-flags"

import { useSelector } from "react-redux"
import axiosInstance from "../../services/axiosInstance"

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { setUser } from "../../context/userSlice"
import { useDispatch } from "react-redux"

import "react-phone-number-input/style.css"
import PhoneInput from "react-phone-number-input"
import { Helmet } from "react-helmet"

const UserProfile = () => {
  const user = useSelector((state) => state.user.user)

  // const [selectedCountry, setSelectedCountry] = useState(countryCodeData[0])
  const [selectedAvatar, setSelectedAvatar] = useState(null)
  const [formData, setFormData] = useState({})
  const [hasChanges, setHasChanges] = useState(false)

  const [phoneNo, setPhoneNo] = useState(user.mobileNumber || "")

  const dispatch = useDispatch()

  const { avatar, fullName, email } = user

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setSelectedAvatar(file)
    setHasChanges(true)
  }

  const handlePhoneNoChange = (value) => {
    setPhoneNo(value)
    setHasChanges(true)
  }

  useEffect(() => {
    setFormData({
      fullName: fullName || "",
      email: email || "",
      phoneNumber: phoneNo || "",
    })
  }, [fullName, email, phoneNo])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    setHasChanges(true)
  }

  const handleRemoveAvatar = () => {
    document.getElementById("Avatar").value = null
    setSelectedAvatar(null)
    setHasChanges(true)
  }

  const handleCancel = () => {
    setFormData({
      fullName: fullName || "",
      email: email || "",
      phoneNumber: user.mobileNumber || "",
    })
    setHasChanges(false)
  }

  const handleRemoveCurrentAvatar = async () => {
    try {
      const res = await axiosInstance.delete("/Profile/deleteImage", {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      if (res.status === 200) {
        dispatch(
          setUser({
            ...user,
            avatar: null,
          })
        )
        setSelectedAvatar(null)
        toast.success(res.data?.message)
      }
    } catch (error) {
      console.error("error deleting avatar: ", error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const formDataWithFile = new FormData()

      if (selectedAvatar) {
        formDataWithFile.append("Avatar", selectedAvatar)
      }

      for (const key in formData) {
        formDataWithFile.append(key, formData[key])
      }

      formDataWithFile.append("phoneNumber", phoneNo)

      const response = await axiosInstance.put(
        "/Profile/updateProfile",
        formDataWithFile,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )

      // console.log(response)

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

  return (
    <>
      <Helmet>
        <title>{`User Profile - RSGlobalTies`}</title>
        <meta
          name='description'
          content='Get insights, ratings, and user reviews for various products.'
        />
      </Helmet>
      <div className='flex items-center justify-start max-w-[600px]'>
        <div className='p-4 md:p-14 bg-white shadow-md rounded-md flex flex-col gap-4 w-full  '>
          <div className='flex items-center justify-between '>
            <h1 className='text-2xl font-bold'>User Profile</h1>
            <button className='btn btn-primary bg-primary'>
              Export Profile
            </button>
          </div>
          {/* PROFILE AREA  */}
          <div className='flex items-center space-x-6 '>
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
                className=' block w-full text-sm text-slate-500 mr-4 py-2 px-4 rounded-full border-0 font-semibold bg-violet-50 hover:bg-violet-100 hover:cursor-pointer'
              >
                Choose Avatar
                <input
                  type='file'
                  className='hidden'
                  id='Avatar'
                  onChange={handleFileChange}
                />
              </label>
              {selectedAvatar && (
                <button
                  className='btn'
                  onClick={handleRemoveAvatar}
                  disabled={selectedAvatar === null ? true : false}
                >
                  Deselect
                </button>
              )}
              <button
                className='btn'
                onClick={handleRemoveCurrentAvatar}
                // disabled={selectedAvatar === null ? true : false}
              >
                Remove Current Avatar
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
            />
          </div>
          <div className='flex items-center'>
            {/* <div className='relative'>
            <select
              value={selectedCountry.code}
              onChange={(e) =>
                setSelectedCountry(
                  countryCodeData.find(
                    (country) => country.code === e.target.value
                  )
                )
              }
              name='countryCode'
              className='flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100'
            >
              {countryCodeData.map((country) => (
                <option key={country.code} value={country.code}>
                  <Flag code={country.flag} />({country.code})
                </option>
              ))}
            </select>
          </div> */}
            <PhoneInput
              placeholder='Enter phone number'
              name='phoneNumber'
              id='phoneNumber'
              value={phoneNo}
              onChange={handlePhoneNoChange}
              className='w-full h-[55px] px-4 py-2 text-sm bg-white border rounded-md'
              required
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

export default UserProfile
