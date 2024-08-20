import { useState } from "react"
import axiosInstance from "../../services/axiosInstance"

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { Helmet } from "react-helmet"

const SuperSuccessStories = () => {
  const [selectedAvatar, setSelectedAvatar] = useState(null)
  const [formData, setFormData] = useState({
    fullName: '',
    jobName: '',
    description: ''
  })
  const [hasChanges, setHasChanges] = useState(false)

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
      fullName: '',
      jobName: '',
      description: ''
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

      await axiosInstance.post(
        `/successstories/createSuccessStories`,
        formDataWithFile
      )

      setFormData({
        fullName: '',
        jobName: '',
        description: ''
      })
      setHasChanges(false)
      toast.success('story added')
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


  // console.log(user);
  console.log("log form data: ", formData)

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
            <h1 className='text-2xl font-bold'>Success Stories</h1>
          </div>
          {/* PROFILE AREA  */}
          <div className='flex items-center space-x-6 justify-center gap-2 500px:justify-normal 500px:gap-0 flex-wrap 500px:flex-row'>
            <div className='shrink-0'>
              <img
                id='preview_img'
                className='h-16 w-16 object-cover rounded-full'
                src={
                  selectedAvatar ? URL.createObjectURL(selectedAvatar) : ''
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
              value={formData?.fullName}
              onChange={handleInputChange}
              className='w-full bg-white h-[55px]  px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600'
              placeholder=''
            />
          </div>
          <div className='mb-2'>
            <label className='block text-sm text-label font-inter mb-2'>
              Job
            </label>
            <input
              type='text'
              name='jobName'
              value={formData?.jobName}
              onChange={handleInputChange}
              className='w-full bg-white h-[55px]  px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600'
              placeholder=''
            />
          </div>
          <div className='mb-2'>
            <label className='block text-sm text-label font-inter mb-2'>
              Description
            </label>
            <textarea
              name='description'
              value={formData?.description}
              onChange={handleInputChange}
              className='w-full bg-white h-[80px] px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600'
              placeholder=''
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

export default SuperSuccessStories
