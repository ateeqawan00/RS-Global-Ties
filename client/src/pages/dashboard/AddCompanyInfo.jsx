import { useState } from "react"
import { companyEditCheckboxData } from "../../data/companyEditData"
import { useEffect } from "react"
import { FaPlus } from "react-icons/fa"
import axiosInstance from "../../services/axiosInstance"
import { useSelector } from "react-redux"

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Helmet } from "react-helmet"
import { useNavigate } from "react-router-dom"

const AddCompanyInfo = () => {
  const [productCount, setProductCount] = useState(1)
  const [inputArray, setInputArray] = useState(
    Array.from({ length: 0 }, () => "")
  )
  const user = useSelector((state) => state.user.user)
  const [formData, setformData] = useState({
    companyName: "",
    businessType: "",
    officialWebsite: "",
    companyAddress: "",
    companyState: "",
    companyCity: "",
    companyStreet: "",
    operationalAddress: "",
    operationalState: "",
    operationalCity: "",
    operationalStreet: "",
    yearsEstablished: "",
    employeeCount: "",
    mainProduct: [],
    aboutUs: "",
  })
  const [sameAsRegistered, setSameAsRegistered] = useState(false)
  const [categories, setCategories] = useState()

  const navigate = useNavigate()

  if (sameAsRegistered) {
    formData.operationalAddress = formData.companyAddress || ""
    formData.operationalState = formData.companyState || ""
    formData.operationalCity = formData.companyCity || ""
    formData.operationalStreet = formData.companyStreet || ""
  } else {
    formData.operationalAddress = ""
    formData.operationalState = ""
    formData.operationalCity = ""
    formData.operationalStreet = ""
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axiosInstance.get("/Catagory/getAllCategories")
        setCategories(data)
      } catch (error) {}
    }

    fetchCategories()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name.startsWith("mainProduct")) {
      const index = parseInt(name.split("-")[1])
      if (formData.mainProduct) {
        // Check if mainProduct is defined
        const updatedMainProduct = [...formData.mainProduct]
        updatedMainProduct[index] = value
        setformData({ ...formData, mainProduct: updatedMainProduct })
      }
    } else {
      setformData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = async () => {
    try {
      let data = {
        companyName: formData.companyName,
        businessType: [formData.businessType],
        officialWebsite: formData.officialWebsite,
        registeredAddress: {
          country: formData.companyAddress,
          state: formData.companyState,
          city: formData.companyCity,
          street: formData.companyStreet,
        },
        operationalAddress: {
          country: formData.operationalAddress,
          provinceState: formData.operationalState,
          city: formData.operationalCity,
          street: formData.operationalStreet,
        },
        yearEstablished: formData.yearsEstablished.split("-")[0],
        mainProducts: formData.mainProduct,
        aboutUs: formData.aboutUs,
      }

      const response = await axiosInstance.post(
        "/companyProfile/createCompanyProfiles",
        data,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      if (response.data.error) {
        toast.error(response.data.error)
      }
      const message = response.data?.message
      setformData(response.data)
      toast.success(message)
      setformData({
        companyName: "",
        businessType: "",
        officialWebsite: "",
        companyAddress: "",
        companyState: "",
        companyCity: "",
        companyStreet: "",
        operationalAddress: "",
        operationalState: "",
        operationalCity: "",
        operationalStreet: "",
        yearsEstablished: "",
        employeeCount: "",
        mainProduct: [],
        aboutUs: "",
      })
      navigate("/dashboard/company-information")
    } catch (error) {
      if (error.response) {
        console.error("Error occurred during company profile creation:", error)
        toast.error(error.response.data?.error)
      } else {
        console.error("Error occurred during company profile creation:", error)
      }
    }
  }

  useEffect(() => {
    setInputArray(Array.from({ length: productCount }, () => ""))
  }, [productCount])

  return (
    <>
      <Helmet>
        <title>{`Add Company Info - RSGlobalTies`}</title>
        <meta
          name='description'
          content='Add your company info to get better reach. Get insights, ratings, and user reviews for various products.'
        />
      </Helmet>
      <div className='p-8'>
        <h3 className='font-bold text-2xl font-inter'>
          Add Company Information
        </h3>
        <div className='py-4 '>
          <div className='mb-2'>
            <label
              className='block text-sm text-black font-inter mb-2'
              htmlFor='companyName'
            >
              <span className='text-red-500 mx-1'>*</span>Company Name
            </label>
            <input
              type='text'
              id='companyName'
              value={formData?.companyName}
              onChange={handleInputChange}
              required
              className='w-full h-[55px] px-4 py-2 text-sm  border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
              placeholder='Company Name'
              name='companyName'
            />
          </div>
          <div className='mb-2'>
            <label
              className='block text-sm text-black font-inter mb-2'
              htmlFor='companyName'
            >
              <span className='text-red-500 mx-1'>*</span>Company Type
            </label>
            {companyEditCheckboxData.map((item, key) => (
              <div className='flex items-center gap-4 mb-2' key={key}>
                <input
                  type='radio'
                  required
                  value={item}
                  onChange={handleInputChange}
                  className='radio checked:bg-primary'
                  name='businessType'
                />
                <span className='label-text'>{item}</span>
              </div>
            ))}
          </div>
          <div className='mb-2'>
            <label
              className='block text-sm text-black font-inter mb-2'
              htmlFor='officialWebsite'
            >
              Official Website
            </label>
            <input
              type='text'
              id='officialWebsite'
              value={formData?.officialWebsite}
              onChange={handleInputChange}
              className='w-full h-[55px] px-4 py-2 text-sm  border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
              placeholder='Company Name'
              name='officialWebsite'
            />
          </div>
          <div className='mb-2 '>
            <label
              className='block text-sm text-black font-inter mb-2'
              htmlFor='companyName'
            >
              <span className='text-red-500 mx-1'>*</span>Registered Address
            </label>
            <div className='flex items-center gap-4 flex-wrap md:flex-nowrap'>
              {" "}
              <input
                type='text'
                id='companyAddress'
                value={formData?.companyAddress}
                onChange={handleInputChange}
                className='w-full h-[55px] px-4 py-2 text-sm  border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
                placeholder='Company Address'
                name='companyAddress'
              />{" "}
              <input
                type='text'
                id='companyState'
                value={formData?.companyState}
                onChange={handleInputChange}
                className='w-full h-[55px] px-4 py-2 text-sm  border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
                placeholder='Company State'
                name='companyState'
              />{" "}
              <input
                type='text'
                id='companyCity'
                value={formData?.companyCity}
                onChange={handleInputChange}
                className='w-full h-[55px] px-4 py-2 text-sm  border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
                placeholder='Company City'
                name='companyCity'
              />
              <input
                type='text'
                id='companyStreet'
                value={formData?.companyStreet}
                onChange={handleInputChange}
                className='w-full h-[55px] px-4 py-2 text-sm  border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
                placeholder='Company Street'
                name='companyStreet'
              />
            </div>
          </div>
          <div className='flex items-center gap-4 mb-2'>
            <input
              type='checkbox'
              id='addressCheckbox'
              name='sameAsRegistered'
              checked={sameAsRegistered}
              onChange={(e) => setSameAsRegistered(e.target.checked)}
              className='checkbox checkbox-primary'
            />
            <label htmlFor='addressCheckbox'>Same as registered address</label>
          </div>
          <div className='mb-1'>
            <label
              className='block text-sm text-black font-inter mb-2'
              htmlFor='companyName'
            >
              <span className='text-red-500 mx-1'>*</span>Operational Address
            </label>
            <div className='flex items-center gap-4 flex-wrap md:flex-nowrap'>
              {" "}
              <input
                type='text'
                id='operationalAddress'
                value={formData?.operationalAddress}
                onChange={handleInputChange}
                className='w-full h-[55px] px-4 py-2 text-sm  border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
                placeholder='Operational Address'
                name='operationalAddress'
              />{" "}
              <input
                type='text'
                id='operationalState'
                value={formData?.operationalState}
                onChange={handleInputChange}
                className='w-full h-[55px] px-4 py-2 text-sm  border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
                placeholder='Operational State'
                name='operationalState'
              />{" "}
              <input
                type='text'
                id='operationalCity'
                value={formData?.operationalCity}
                onChange={handleInputChange}
                className='w-full h-[55px] px-4 py-2 text-sm  border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
                placeholder='Operational City'
                name='operationalCity'
              />
              <input
                type='text'
                id='operationalStreet'
                value={formData?.operationalStreet}
                onChange={handleInputChange}
                className='w-full h-[55px] px-4 py-2 text-sm  border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
                placeholder='Operational Street'
                name='operationalStreet'
              />
            </div>
          </div>
        </div>

        <div className='mb-2'>
          <div className='flex items-center 500px:gap-20 flex-wrap 500px:flex-nowrap '>
            <div className='w-full 500px:w-[40%] '>
              <label
                className='block text-sm text-black font-inter mb-2 '
                htmlFor='companyName'
              >
                Year Established
              </label>
              <input
                type='date'
                id='yearsEstablished'
                value={formData?.yearsEstablished}
                onChange={handleInputChange}
                className='w-full h-[55px] px-4 py-2 text-sm  border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
                placeholder='Company Name'
                name='yearsEstablished'
              />
            </div>
            <div className='w-full '>
              <label
                className='block text-sm text-black font-inter mb-2 '
                htmlFor='companyName'
              >
                Total Employees
              </label>
              <input
                type='number'
                id='employeeCount'
                value={formData?.employeeCount}
                onChange={handleInputChange}
                className='w-full h-[55px] px-4 py-2 text-sm  border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
                placeholder='1'
                name='employeeCount'
              />
            </div>
          </div>
        </div>
        <div className='mb-2'>
            <label
              className='block text-sm text-label font-inter mb-2'
              htmlFor='mainProducts'
            >
              Product Category
            </label>
            <select
              id='mainProducts'
              className='w-full h-[55px] px-4 py-2 text-sm  border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
              name='mainProducts'
              value={formData.mainProduct || ""}
              onChange={handleInputChange}
            >
              <option hidden>Choose Category</option>
              {categories &&
                categories.map((cat) => (
                  <option value={cat.name} key={cat._id}>
                    {cat.name}
                  </option>
                ))}
            </select>
          </div>
        {/* <div className='mb-2'>
          <label
            className='block text-sm text-black font-inter mb-2'
            htmlFor='mainProduct'
          >
            Main Product
          </label>
          <div className='flex items-center gap-3 flex-wrap '>
            {inputArray.map((_, index) => (
              <input
                key={index}
                type='text'
                id={`mainProduct-${index}`}
                value={formData?.mainProduct[index] || ""}
                onChange={handleInputChange}
                className=' h-[55px] min-w-[160px] px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
                placeholder={`Product ${index + 1}`}
                name={`mainProduct-${index}`}
              />
            ))}
            <div
              onClick={() => setProductCount((prevValue) => prevValue + 1)}
              className='flex min-w-[160px] h-[55px] px-4 py-2 text-sm border rounded-md items-center justify-center hover:cursor-pointer hover:bg-gray-400'
            >
              <FaPlus />
            </div>
          </div>
        </div> */}
        <div className='mb-2'>
          <label
            className='block text-sm text-label font-inter mb-2'
            htmlFor='productDescription'
          >
            About Us
          </label>
          <textarea
            rows={5}
            cols={20}
            id='aboutUs'
            value={formData?.aboutUs}
            onChange={handleInputChange}
            className='w-full  px-4 py-2 text-sm  border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
            placeholder='Product Name'
            name='aboutUs'
          />
        </div>
        <div className='space-x-5'>
          {/* <button className='btn'>Close</button> */}
          <button
            className='btn bg-primary text-white hover:bg-btnhover px-10'
            type='submit'
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default AddCompanyInfo
