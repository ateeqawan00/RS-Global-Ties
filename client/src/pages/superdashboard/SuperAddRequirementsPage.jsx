import { useState } from "react"
import axiosInstance from "../../services/axiosInstance"
import { useSelector } from "react-redux"

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Helmet } from "react-helmet"

const SuperAddRequirementsPage = () => {
  const [formData, setFormData] = useState({})
  const user = useSelector((state) => state.user.user)

  const handleInputChange = (e) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axiosInstance.post(
        "/Requirements/addRequirement",
        formData,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      const message = response.statusText
      toast.success(message)
      console.log("response: ", response)
    } catch (error) {
      if (error.response) {
        console.error(
          "Error occurred during add requirement: ",
          error.response.data.error
        )
        toast.error(error.response.data?.error)
      } else {
        console.error("Error occurred during add requirement: ", error)
      }
    }
  }

  return (
    <>
      <Helmet>
        <title>{`Super add requirements page - RSGlobalTies`}</title>
        <meta
          name='description'
          content='Add Products and requirements to list on the RSGlobalTies. Get insights, ratings, and user reviews for various products.'
        />
      </Helmet>
      <div className='flex items-center justify-center m-auto'>
        <div className=' p-4 md:p-20 bg-white rounded-md flex flex-col gap-4 w-full '>
          <h1 className='self-start text-2xl font-bold'>
            Add Your Requirement
          </h1>
          <div className='mb-2'>
            <label
              className='block text-sm text-label font-inter mb-2'
              htmlFor='name'
            >
              Name
            </label>
            <input
              type='text'
              id='name'
              value={formData.name || ""}
              onChange={handleInputChange}
              className='w-full h-[55px] px-4 py-2 text-sm  border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
              placeholder='Product Name'
              name='name'
            />
          </div>
          <div className='mb-2'>
            <label
              className='block text-sm text-label font-inter mb-2'
              htmlFor='timeOfValidity'
            >
              Time of Validity
            </label>
            <select
              id='timeOfValidity'
              className='w-full h-[55px] px-4 py-2 text-sm  border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
              name='timeOfValidity'
              value={formData.timeOfValidity || ""}
              onChange={handleInputChange}
            >
              <option value='0' className=''>
                Select Time{" "}
              </option>
              <option value='1' className=''>
                1 Month
              </option>
              <option value='2' className=''>
                2 Month
              </option>
              <option value='3' className=''>
                3 Month
              </option>
              <option value='4' className=''>
                4 Month
              </option>
              <option value='5' className=''>
                5 Month
              </option>
            </select>
          </div>
          <div className='mb-2'>
            <label
              className='block text-sm text-label font-inter mb-2'
              htmlFor='buyingFrequency'
            >
              Buying Frequency
            </label>
            <select
              id='buyingFrequency'
              className='w-full h-[55px] px-4 py-2 text-sm  border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
              name='buyingFrequency'
              value={formData.buyingFrequency || ""}
              onChange={handleInputChange}
            >
              <option value='0' className=''>
                Select Frequency{" "}
              </option>

              <option value='1' className=''>
                1 Month
              </option>
              <option value='2' className=''>
                2 Month
              </option>
              <option value='3' className=''>
                3 Month
              </option>
              <option value='4' className=''>
                4 Month
              </option>
              <option value='5' className=''>
                5 Month
              </option>
            </select>
          </div>
          <div className='flex items-center w-full gap-6 flex-wrap md:flex-nowrap'>
            <div className='mb-2  min-w-[250px] w-full'>
              <label
                className='block text-sm text-label font-inter mb-2'
                htmlFor='quantity'
              >
                Quantity Required
              </label>
              <select
                id='quantityRequired'
                className='w-full h-[55px] px-4 py-2 text-sm  border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
                name='quantityRequired'
                value={formData.quantityRequired || ""}
                onChange={handleInputChange}
              >
                <option value='0' className=''>
                  Select Quantity{" "}
                </option>
                <option value='1' className=''>
                  1
                </option>
                <option value='2' className=''>
                  2
                </option>
                <option value='3' className=''>
                  3
                </option>
                <option value='4' className=''>
                  4
                </option>
                <option value='5' className=''>
                  5
                </option>
              </select>
            </div>
            <div className='mb-2 min-w-[250px] w-full'>
              <label
                className='block text-sm text-label font-inter mb-2'
                htmlFor='unit'
              >
                Select Unit
              </label>
              <select
                id='quantityUnit'
                className='w-full h-[55px] px-4 py-2 text-sm  border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
                name='quantityUnit'
                value={formData.quantityUnit || ""}
                onChange={handleInputChange}
              >
                <option value='0' className=''>
                  Select Unit{" "}
                </option>

                <option value='1' className=''>
                  1 Kg
                </option>
                <option value='2' className=''>
                  2 Kg
                </option>
                <option value='3' className=''>
                  3 Kg
                </option>
                <option value='4' className=''>
                  4 Kg
                </option>
                <option value='5' className=''>
                  5 Kg
                </option>
              </select>
            </div>
          </div>
          <div className='flex items-center w-full gap-6 flex-wrap md:flex-nowrap'>
            <div className='mb-2  min-w-[250px] w-full'>
              <label
                className='block text-sm text-label font-inter mb-2'
                htmlFor='quantity'
              >
                Annual Purchased Volume
              </label>
              <select
                id='annualPurchasedVolume'
                className='w-full h-[55px] px-4 py-2 text-sm  border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
                name='annualPurchasedVolume'
                value={formData.annualPurchasedVolume || ""}
                onChange={handleInputChange}
              >
                <option value='0' className=''>
                  Select Volume{" "}
                </option>

                <option value='1' className=''>
                  1
                </option>
                <option value='2' className=''>
                  2
                </option>
                <option value='3' className=''>
                  3
                </option>
                <option value='4' className=''>
                  4
                </option>
                <option value='5' className=''>
                  5
                </option>
              </select>
            </div>
            <div className='mb-2 min-w-[250px] w-full'>
              <label
                className='block text-sm text-label font-inter mb-2'
                htmlFor='unit'
              >
                Select Unit
              </label>
              <select
                id='volumeUnit'
                className='w-full h-[55px] px-4 py-2 text-sm  border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
                name='volumeUnit'
                value={formData.volumeUnit || ""}
                onChange={handleInputChange}
              >
                <option value='0' className=''>
                  Select Unit{" "}
                </option>

                <option value='1' className=''>
                  1 Kg
                </option>
                <option value='2' className=''>
                  2 Kg
                </option>
                <option value='3' className=''>
                  3 Kg
                </option>
                <option value='4' className=''>
                  4 Kg
                </option>
                <option value='5' className=''>
                  5 Kg
                </option>
              </select>
            </div>
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
              placeholder='Product Name'
              name='description'
              value={formData.description || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className='mb-2'>
            <label
              className='block text-sm text-label font-inter mb-2'
              htmlFor='shipmentTerm'
            >
              Shipment Terms
            </label>
            <input
              type='text'
              id='shipmentTerm'
              className='w-full h-[55px] px-4 py-2 text-sm  border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
              placeholder='You can include your shipping terms if any'
              name='shipmentTerm'
              value={formData.shipmentTerm || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className='mb-2'>
            <label
              className='block text-sm text-label font-inter mb-2'
              htmlFor='destinationPort'
            >
              Destination Port
            </label>
            <input
              type='text'
              id='destinationPort'
              className='w-full h-[55px] px-4 py-2 text-sm  border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
              placeholder='What is your desired destination port'
              name='destinationPort'
              value={formData.destinationPort || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className='mb-2'>
            <label
              className='block text-sm text-label font-inter mb-2'
              htmlFor='paymentType'
            >
              Select Payment Type
            </label>
            <select
              id='paymentType'
              className='w-full h-[55px] px-4 py-2 text-sm  border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
              name='paymentType'
              value={formData.paymentType || ""}
              onChange={handleInputChange}
            >
              <option value='0' className=''>
                Select Payment Type{" "}
              </option>

              <option value='cash' className=''>
                Cash
              </option>
              <option value='card' className=''>
                Card
              </option>
              <option value='escrow' className=''>
                Escrow
              </option>
            </select>
          </div>
          <div className='flex items-center justify-between  mt-12'>
            <h1 className='btn px-10 '>Cancel</h1>
            <button
              className='btn btn-primary px-10 bg-primary text-white'
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
          <ToastContainer />
        </div>
      </div>
    </>
  )
}

export default SuperAddRequirementsPage
