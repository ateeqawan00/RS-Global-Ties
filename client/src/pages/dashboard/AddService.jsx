import { useState } from "react"
import axiosInstance from "../../services/axiosInstance"
import { useSelector } from "react-redux"

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Helmet } from "react-helmet"

const AddService = () => {
  const user = useSelector((state) => state.user.user)
  const [isDisabled, setIsDisabled] = useState(true)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    setIsDisabled(false)
  }

  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.post(
        "/service/createService",
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      if (response.data.error) {
        toast.error(response.data.error)
      }
      toast.success(response.statusText || "Service Created")
      setFormData({
        title: "",
        description: "",
        durationOfService: "",
        yearsOfExperienceRequired: "",
        skillsExpertiseNeeded: "",
        serviceDeliveryMethod: "",
        professionalCertification: "",
      })
    } catch (error) {
      toast.warn(error.response.data.error)
    }
  }

  return (
    <>
      <Helmet>
        <title>{`Add Service - RSGlobalTies`}</title>
        <meta
          name='description'
          content='Get insights, ratings, and user reviews for various products.'
        />
      </Helmet>
      <div className='flex items-center justify-center m-auto'>
        <div className='p-4 md:p-20 bg-white shadow-md rounded-md flex flex-col gap-4 w-full  '>
          <h1 className='self-start text-2xl font-semibold'>
            Add Your Services
          </h1>
          <div className='mb-2 '>
            <label className='block text-sm text-label font-inter mb-2'>
              Title
            </label>
            <input
              type='text'
              id='title'
              className='w-full h-[55px] px-4 py-2 text-sm  border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
              placeholder='Your Title Here'
              name='title'
              onChange={handleInputChange}
              value={formData.title}
            />
          </div>
          
          <div className='mb-2 '>
            <label className='block text-sm text-label font-inter mb-2'>
              Duration of service
            </label>
            <select
              id='durationOfService'
              className='w-full h-[55px] px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
              name='durationOfService'
              onChange={handleInputChange}
              value={formData.durationOfService}
            >
              <option value='1 month'>select option</option>
              <option value='1 month'>1 month</option>
              <option value='2 months'>2 months</option>
              <option value='3 months'>3 months</option>
              <option value='6 months'>6 months</option>
              <option value='1 year'>1 year</option>
            </select>
          </div>
          <div className='mb-2 '>
            <label className='block text-sm text-label font-inter mb-2'>
              Years of experience Required
            </label>
            <input
              type='number'
              id='yearsOfExperienceRequired'
              className='w-full h-[55px] px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
              placeholder='Years of Experience Required'
              name='yearsOfExperienceRequired'
              onChange={handleInputChange}
              value={formData.yearsOfExperienceRequired}
            />
          </div>
          <div className='mb-2 '>
            <label className='block text-sm text-label font-inter mb-2'>
              Skills/expertise needed
            </label>
            <input
              type='text'
              id='skillsExpertiseNeeded'
              className='w-full h-[55px] px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
              placeholder='Skills/Expertise Needed'
              name='skillsExpertiseNeeded'
              onChange={handleInputChange}
              value={formData.skillsExpertiseNeeded}
            />
          </div>
          <div className='mb-2 '>
            <label className='block text-sm text-label font-inter mb-2'>
              Service delivery method / Workplace type
            </label>
            <select
              id='serviceDeliveryMethod'
              className='w-full h-[55px] px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
              name='serviceDeliveryMethod'
              onChange={handleInputChange}
              value={formData.serviceDeliveryMethod}
            >
              <option value='On-site Service'>Select option</option>
              <option value='On-site Service'>On-site Service</option>
              <option value='Remote Service'>Remote Service</option>
              <option value='Online Service'>Online Service</option>
              <option value='Self-Service'>Self-Service</option>
              <option value='Subscription Service'>Subscription Service</option>
              <option value='Freemium Service'>Freemium Service</option>
              <option value='In-App Service'>In-App Service</option>
              <option value='Collaborative Service'>
                Collaborative Service
              </option>
              <option value='Distributed Service'>Distributed Service</option>
              <option value='Hybrid Service'>Hybrid Service</option>
            </select>
          </div>
          <div className='mb-2 '>
            <label className='block text-sm text-label font-inter mb-2'>
              Professional certification
            </label>
            <input
              type='text'
              id='professionalCertification'
              className='w-full h-[55px] px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
              placeholder='Professional Certification'
              name='professionalCertification'
              onChange={handleInputChange}
              value={formData.professionalCertification}
            />
          </div>
          <div className='mb-2'>
            <label
              className='block text-sm text-label font-inter mb-2'
              htmlFor='description'
            >
              Description
            </label>
            <textarea
              rows={5}
              cols={20}
              id='description'
              className='w-full  px-4 py-2 text-sm  border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
              placeholder='Service description here'
              name='description'
              onChange={handleInputChange}
              value={formData.description}
            />
          </div>
          <div className='flex items-center justify-between 600px:gap-60 400px:gap-32   mt-24'>
            <h1
              className='btn px-10 flex-grow'
              onClick={() =>
                setFormData({
                  title: "",
                  description: "",
                  durationOfService: "",
                  yearsOfExperienceRequired: "",
                  skillsExpertiseNeeded: "",
                  serviceDeliveryMethod: "",
                  professionalCertification: "",
                })
              }
            >
              Cancel
            </h1>
            <button
              className='btn btn-primary px-10 bg-primary flex-grow'
              onClick={handleSubmit}
              disabled={isDisabled}
            >
              Save
            </button>{" "}
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  )
}

export default AddService
