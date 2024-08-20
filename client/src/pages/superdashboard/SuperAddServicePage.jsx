import { useState } from "react"
import axiosInstance from "../../services/axiosInstance"
import { useSelector } from "react-redux"

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Helmet } from "react-helmet"

const SuperAddServicePage = () => {
  const user = useSelector((state) => state.user.user)
  const [isDisabled, setIsDisabled] = useState(true)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    serviceDetail2: "",
    serviceTitle2: "",
    durationOfService2: "",
    serviceDeliveryMethod2: "",
    yearsOfExperience: "",
    professionalCertification2: ""
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
        `/service/createServiceByAdmin/${user._id}`,
        formData
      )
      // console.log(response);
      toast.success(response.statusText || "Service Created")
      setFormData({
        title: "",
        description: "",
        serviceDetail2: "",
        serviceTitle2: "",
        durationOfService2: "",
        serviceDeliveryMethod2: "",
        yearsOfExperience2: "",
        professionalCertification2: ""
      });
    } catch (error) {
      toast.warn(error.response.data.error)
    }
  }

  // console.log('service form data: ', formData)
  // console.log('user: ', user)

  return (
    <>
      <Helmet>
        <title>{`Super add service - RSGlobalTies`}</title>
        <meta
          name='description'
          content='Add Products and services to list on the RSGlobalTies. Get insights, ratings, and user reviews for various products.'
        />
      </Helmet>
      <div className='max-w-[500px] bg-white  rounded-md flex flex-col gap-4 w-full  '>
        <h1 className='self-start text-2xl font-semibold'>Add Your Services</h1>
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
    
        <div className='mb-4'>
    <label className='block text-sm text-label font-inter mb-2'>
        Service Detail
    </label>
    <input
        type='text'
        id='serviceDetail2'
        className='w-full h-[55px] px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
        placeholder='Your Service Detail2 Here'
        name='serviceDetail2'
        onChange={handleInputChange}
        value={formData.serviceDetail2}
    />
</div>

<div className='mb-4'>
    <label className='block text-sm text-label font-inter mb-2'>
        Type of Service / Service Title
    </label>
    <input
        type='text'
        id='serviceTitle2'
        className='w-full h-[55px] px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
        placeholder='Your Type of Service / Service Title2 Here'
        name='serviceTitle2'
        onChange={handleInputChange}
        value={formData.serviceTitle2}
    />
</div>

<div className='mb-4'>
    <label className='block text-sm text-label font-inter mb-2'>
        Duration of service
    </label>
    <input
        type='text'
        id='durationOfService2'
        className='w-full h-[55px] px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
        placeholder='Your Duration of service2 Here'
        name='durationOfService2'
        onChange={handleInputChange}
        value={formData.durationOfService2}
    />
</div>

<div className='mb-4'>
    <label className='block text-sm text-label font-inter mb-2'>
        Service delivery method / Workplace type 2
    </label>
    <select
        id='serviceDeliveryMethod2'
        className='w-full h-[55px] px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
        name='serviceDeliveryMethod2'
        onChange={handleInputChange}
        value={formData.serviceDeliveryMethod2}
    >
        <option value=''>Select a delivery method</option>
        <option value='In-Person'>In-Person</option>
        <option value='Remote'>Remote</option>
        <option value='Hybrid'>Hybrid</option>
        <option value='Online'>Online</option>
    </select>
</div>



<div className='mb-2'>
    <label className='block text-sm text-label font-inter mb-2'>
        Years of experience Required
    </label>
    <input
        type='number'
        id='yearsOfExperience'
        className='w-full h-[55px] px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
        placeholder='Enter Years of Experience'
        name='yearsOfExperience2'
        onChange={handleInputChange}
        value={formData.yearsOfExperience2}
    />
</div>


<div className='mb-2'>
    <label className='block text-sm text-label font-inter mb-2'>
        Professional certification
    </label>
    <input
        type='number'
        id='professionalCertification2'
        className='w-full h-[55px] px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
        placeholder='Enter Number of Certifications'
        name='professionalCertification2'
        onChange={handleInputChange}
        value={formData.professionalCertification2}
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



        <div className='flex items-center justify-between 600px:gap-60  flex-wrap gap-2  mt-24'>
          <h1
            className='btn px-10 flex-grow'
            onClick={() => setFormData({
              title: "",
              description: "",
              serviceDetail2: "",
              serviceTitle2: "",
              durationOfService2: "",
              serviceDeliveryMethod2: "",
              yearsOfExperience2: "",
              professionalCertification2: ""
            })}
          >
            Cancel
          </h1>
          <button
            className='btn btn-primary px-10 bg-primary flex-grow'
            onClick={handleSubmit}
            disabled={isDisabled}
          >
            Save
          </button>
        </div>
        <ToastContainer />
      </div>
    </>
  )
}

export default SuperAddServicePage
