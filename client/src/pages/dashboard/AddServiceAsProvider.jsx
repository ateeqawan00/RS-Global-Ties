import { useEffect, useState } from "react"
import axiosInstance from "../../services/axiosInstance"
import { useSelector } from "react-redux"

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Helmet } from "react-helmet"
import { FaPlus } from "react-icons/fa"

const AddServiceAsProvider = () => {
  const user = useSelector((state) => state.user.user)
  const [isDisabled, setIsDisabled] = useState(true)

  const [inputArray, setInputArray] = useState([])
  const [servicesCount, setServicesCount] = useState(1)
  const [services, setServices] = useState([
    { description: "", pricing: "", portfolioLink: "" },
  ])
  const [selectedFiles, setSelectedFiles] = useState([])

  const [formData, setFormData] = useState({})

  const handleServiceInputChange = (e, index, property) => {
    const { value } = e.target
    setServices((prevServices) => {
      const updatedServices = [...prevServices]
      if (updatedServices[index]) {
        updatedServices[index][property] = value
      }
      return updatedServices
    })
  }

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
      // const data = {
      //   companyName: formData.companyName,
      //   qualification: formData.qualification,
      //   missionStatement: formData.missionStatement,
      //   additionalInformation: formData.additionalInformation,
      //   services: services,
      //   preferredMethodOfContact: formData.preferredMethodOfContact,
      //   availability: formData.availability,
      //   documentPicture: selectedFiles,
      // }

      let data = new FormData()

      data.append('companyName', formData.companyName)
      data.append('qualification', formData.qualification)
      data.append('missionStatement', formData.missionStatement)
      data.append('additionalInformation', formData.additionalInformation)
      data.append('services', JSON.stringify(services))
      data.append('preferredMethodOfContact', formData.preferredMethodOfContact)
      data.append('availability', formData.availability)
      selectedFiles.forEach(file => {
        data.append('documentPicture', file)
      })
      // data.append('documentPicture', selectedFiles)
      

      const response = await axiosInstance.post(
        "/ServiveProvider/serviceProvider",
        data,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      toast.success(response.statusText || "Service Created")
      // setFormData({

      // })
    } catch (error) {
      console.log(error);
      // toast.warn(error.response.data.error)
    }
  }

  const handleSelectFiles = (e) => {
    const files = e.target.files
    if (files.length > 5) {
      // Handle exceeding the maximum file limit (5 files) here
      alert("You can select up to 5 files.")
      e.target.value = null // Reset the input field
      return
    }

    // Convert FileList object to an array and update the state
    const filesArray = Array.from(files)
    setSelectedFiles(filesArray)
  }

  useEffect(
    () => setInputArray(Array.from({ length: servicesCount })),
    [servicesCount]
  )

  // console.log("services: ", services)
  // console.log("selected files: ", selectedFiles);
  // console.log("form data: ", formData);

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
            Add Your Services As Provider
          </h1>

          <div className='mb-2 '>
            <label className='block text-sm text-label font-inter mb-2'>
              Company Name
            </label>
            <input
              type='text'
              id='companyName'
              className='w-full h-[55px] px-4 py-2 text-sm  border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
              placeholder='Your Company Here'
              name='companyName'
              onChange={handleInputChange}
              value={formData.companyName}
            />
          </div>

          <div className='mb-2 '>
            <label className='block text-sm text-label font-inter mb-2'>
              Biography
            </label>
            <input
              type='text'
              id='biography'
              className='w-full h-[55px] px-4 py-2 text-sm  border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
              placeholder='Your Title Here'
              name='biography'
              onChange={handleInputChange}
              value={formData.biography}
            />
          </div>

          <div className='mb-2 '>
            <label className='block text-sm text-label font-inter mb-2'>
              Qualifications/Certifications
            </label>
            <input
              type='text'
              id='qualification'
              className='w-full h-[55px] px-4 py-2 text-sm  border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
              placeholder='Your Title Here'
              name='qualification'
              onChange={handleInputChange}
              value={formData.qualification}
            />
          </div>

          {/* <div className='mb-2 '>
            <label className='block text-sm text-label font-inter mb-2'>
              Experience
            </label>
            <input
              type='text'
              id='experience'
              className='w-full h-[55px] px-4 py-2 text-sm  border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
              placeholder='Your Title Here'
              name='experience'
              onChange={handleInputChange}
              value={formData.experience}
            />
          </div> */}

          <div className='mb-2 '>
            <label className='block text-sm text-label font-inter mb-2'>
              Mission Statement
            </label>
            <input
              type='text'
              id='missionStatement'
              className='w-full h-[55px] px-4 py-2 text-sm  border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
              placeholder='Your Title Here'
              name='missionStatement'
              onChange={handleInputChange}
              value={formData.missionStatement}
            />
          </div>

          <div className='mb-2 '>
            <label className='block text-sm text-label font-inter mb-2'>
              Additional Information
            </label>
            <input
              type='text'
              id='additionalInformation'
              className='w-full h-[55px] px-4 py-2 text-sm  border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
              placeholder='Your Title Here'
              name='additionalInformation'
              onChange={handleInputChange}
              value={formData.additionalInformation}
            />
          </div>

          <div className='mb-2'>
            <label className='block text-sm text-label font-inter mb-2'>
              Service Category
            </label>
          </div>
          {inputArray &&
            inputArray.map((_, index) => (
              <div key={index}>
                {/* <input
                  type='text'
                  name={`service-${index}-name`}
                  className='border border-gray-400 p-2'
                  placeholder={`Service ${index + 1} Name`}
                  value={services[index]?.name || ""}
                  onChange={(e) => handleServiceInputChange(e, index, "name")}
                /> */}
                <input
                  type='text'
                  name={`service-${index}-description`}
                  className='border border-gray-400 p-2'
                  placeholder={`Service ${index + 1} Description`}
                  value={services[index]?.description || ""}
                  onChange={(e) =>
                    handleServiceInputChange(e, index, "description")
                  }
                />
                <input
                  type='number'
                  name={`service-${index}-pricing`}
                  className='border border-gray-400 p-2'
                  placeholder={`Service ${index + 1} Pricing`}
                  value={services[index]?.pricing || ""}
                  onChange={(e) =>
                    handleServiceInputChange(e, index, "pricing")
                  }
                />
                <input
                  type='text'
                  name={`service-${index}-portfolio`}
                  className='border border-gray-400 p-2'
                  placeholder={`Service ${index + 1} PortfolioLink`}
                  value={services[index]?.portfolioLink || ""}
                  onChange={(e) =>
                    handleServiceInputChange(e, index, "portfolioLink")
                  }
                />
              </div>
            ))}

          <div
            onClick={() => {
              setServicesCount((prevValue) => prevValue + 1)
              setServices((prevServices) => [
                ...prevServices,
                { description: "", pricing: "", portfolioLink: "" },
              ])
            }}
            className='flex min-w-[160px] h-[55px] px-4 py-2 text-sm border rounded-md items-center justify-center hover:cursor-pointer hover:bg-gray-400'
          >
            <FaPlus />
          </div>

          <div className='mb-2 '>
            <label className='block text-sm text-label font-inter mb-2'>
              Preffered Method of contact
            </label>
            <input
              type='text'
              id='preferredMethodOfContact'
              className='w-full h-[55px] px-4 py-2 text-sm  border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
              placeholder='Your Title Here'
              name='preferredMethodOfContact'
              onChange={handleInputChange}
              value={formData.preferredMethodOfContact}
            />
          </div>

          <div className='mb-2 '>
            <label className='block text-sm text-label font-inter mb-2'>
              Availability
            </label>
            <input
              type='text'
              id='availability'
              className='w-full h-[55px] px-4 py-2 text-sm  border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
              placeholder='Your Title Here'
              name='availability'
              onChange={handleInputChange}
              value={formData.availability}
            />
          </div>

          <div className='mb-2 '>
            <label className='block text-sm text-label font-inter mb-2'>
              Profile Picture images or documents
            </label>
            <input
              type='file'
              id='documentPictures'
              className='w-full h-[55px] px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
              name='documentPictures'
              onChange={handleSelectFiles}
              multiple
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

export default AddServiceAsProvider
