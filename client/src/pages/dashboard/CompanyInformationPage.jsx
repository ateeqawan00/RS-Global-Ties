import { useState } from "react"
import { companyEditCheckboxData } from "../../data/companyEditData"
import { useEffect } from "react"
import { FaPlus } from "react-icons/fa"
import axiosInstance from "../../services/axiosInstance"
import { useSelector } from "react-redux"

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Error from "../auth/Error"
import { useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet"

const CompanyInformationPage = () => {
  const [productCount, setProductCount] = useState(1)
  const [inputArray, setInputArray] = useState(Array.from({ length: 0 }))
  const user = useSelector((state) => state.user.user)
  const [formData, setFormData] = useState({
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
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const [fetchedFormData, setfetchedFormData] = useState({})
  const [companyExists, setCompanyExists] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name.startsWith("mainProduct")) {
      const index = parseInt(name.split("-")[1])
      const updatedMainProduct = [...formData.mainProduct]
      updatedMainProduct[index] = value
      setFormData({ ...formData, mainProduct: updatedMainProduct })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleEditButtonClick = () => {
    const data = fetchedFormData.data
    setFormData({
      companyName: data.companyName || "",
      businessType: data.businessType[0] || "",
      officialWebsite: data.officialWebsite || "",
      companyAddress: data.registeredAddress.country || "",
      companyState: data.registeredAddress.state || "",
      companyCity: data.registeredAddress.city || "",
      companyStreet: data.registeredAddress.street || "",
      operationalAddress: data.operationalAddress.country || "",
      operationalState:
        data.operationalAddress.provinceState || "",
      operationalCity: data.operationalAddress.city || "",
      operationalStreet: data.operationalAddress.street || "",
      yearsEstablished: data.yearEstablished || "",
      employeeCount: 0 || "",
      mainProduct: data.mainProducts || [],
      aboutUs: data.aboutUs || "",
    })
    document.getElementById("edit-company-modal").showModal()
  }

  const handleAddCompanyClick = () => {
    navigate("/dashboard/add-company-info")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
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
      const response = await axiosInstance.put(
        "/companyProfile/getCompanyProfiles",
        data,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      const message = response.data?.message
      setfetchedFormData(response.data)
      toast.success(message)
      document.getElementById("edit-company-modal").close()
    } catch (error) {
      setError(error.response.data?.error)
      if (error.response) {
        console.error("Error occurred during company profile creation:", error)
        toast.error(error.response.data?.error)
      } else {
        console.error("Error occurred during company profile creation:", error)
      }
    }
  }

  useEffect(() => {
    setInputArray(Array.from({ length: productCount }))
  }, [productCount])

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("")
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [error])

  useEffect(() => {
    const fetchCompanyProfile = async () => {
      try {
        const response = await axiosInstance.get(
          "/companyProfile/getCompanyProfiles",
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        )
        setfetchedFormData(response.data)
        setCompanyExists(true)
      } catch (error) {
        setCompanyExists(false)
        if (error.response) {
          console.error("Error occurred: ", error.response.data.message)
          // toast.error(error.response.data?.message)
        } else {
          console.error("Error occurred: ", error)
        }
      }
    }
    fetchCompanyProfile()
  }, [user])

  console.log("form data: ", formData)
  console.log("fetched form data: ", fetchedFormData)

  return (
    <>
    <Helmet>
        <title>{`Company Info Page - RSGlobalTies`}</title>
        <meta
          name='description'
          content='Get info and insights for you company. Get insights, ratings, and user reviews for various products.'
        />
      </Helmet>
      <div className='flex items-center justify-center m-auto'>
        <div className='p-4 md:p-10 bg-white shadow-xl rounded-md flex flex-col gap-4 w-full 700px:min-w-[600px] 1000px:w-full 1200px:min-w-[800px] '>
          <div className='flex items-center justify-between w-full  '>
            <h1 className='text-2xl font-bold'>Company Information</h1>
            {companyExists && (
              <button className='btn' onClick={handleEditButtonClick}>
                Edit
              </button>
            )}
          </div>
          {companyExists ? (
            <div className='flex flex-col gap-5 text-black'>
              <div className='flex items-center justify-between gap-5 flex-wrap w-full'>
                <div className='flex gap-4'>
                  <label htmlFor='name' className=''>
                    Company Name:
                  </label>
                  <h1 className='text-black font-semibold '>
                    {fetchedFormData.data?.companyName || "None"}
                  </h1>
                </div>
                <div className='flex gap-4'>
                  <label htmlFor='name' className=''>
                    Platform Of Selling:
                  </label>
                  <h1 className='text-black font-semibold '>None</h1>
                </div>
              </div>

              <div className='flex items-center justify-between gap-5 flex-wrap w-full'>
                <div className='flex gap-4'>
                  <label htmlFor='name' className=''>
                    Year Established:
                  </label>
                  <h1 className='text-black font-semibold '>
                    {fetchedFormData.data?.yearEstablished || "None"}
                  </h1>
                </div>
                <div className='flex gap-4'>
                  <label htmlFor='name' className=''>
                    Main Product:
                  </label>
                  {fetchedFormData.data?.mainProducts.map((product, index) => (
                    <h1 className='text-black font-semibold' key={index}>
                      {product}
                    </h1>
                  ))}
                </div>
              </div>
              <div className='flex items-center justify-between gap-5 flex-wrap w-full'>
                <div className='flex gap-4'>
                  <label htmlFor='name' className=''>
                    Official Website:
                  </label>
                  <h1 className='text-black font-semibold '>
                    {fetchedFormData.data?.officialWebsite || "None"}
                  </h1>
                </div>
                <div className='flex gap-4'>
                  <label htmlFor='name' className=''>
                    Registered Address:
                  </label>
                  <div className='text-black font-semibold '>
                    <div>
                      {fetchedFormData.data?.registeredAddress.country ||
                        "None"}
                    </div>
                    <div>
                      {fetchedFormData.data?.registeredAddress.state || "None"}
                    </div>
                    <div>
                      {fetchedFormData.data?.registeredAddress.city || "None"}
                    </div>
                    <div>
                      {fetchedFormData.data?.registeredAddress.street || "None"}
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex items-center justify-between gap-5 flex-wrap w-full'>
                {" "}
                <div className='flex gap-4'>
                  <label htmlFor='name' className=''>
                    Business Type:
                  </label>
                  <h1 className='text-black font-semibold '>
                    {fetchedFormData.data?.businessType || "None"}
                  </h1>
                </div>
                <div className='flex gap-4'>
                  <label htmlFor='name' className=''>
                    Operational Address:
                  </label>
                  <div className='text-black font-semibold '>
                    <div>
                      {fetchedFormData.data?.operationalAddress.country ||
                        "None"}
                    </div>
                    <div>
                      {fetchedFormData.data?.operationalAddress.provinceState ||
                        "None"}
                    </div>
                    <div>
                      {fetchedFormData.data?.operationalAddress.city || "None"}
                    </div>
                    <div>
                      {fetchedFormData.data?.operationalAddress.street ||
                        "None"}
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex items-center justify-between gap-5 flex-wrap w-full'>
                <div className='flex gap-4'>
                  <label htmlFor='name' className=''>
                    Total Number of Employee:
                  </label>
                  <h1 className='text-black font-semibold '>
                    {fetchedFormData.data?.noOfEmployees || "None"}
                  </h1>
                </div>
                <div className='flex gap-4'>
                  <label htmlFor='name' className=''>
                    About Us:
                  </label>
                  <h1 className='text-black font-semibold '>
                    {fetchedFormData.data?.aboutUs || "None"}
                  </h1>
                </div>
              </div>
            </div>
          ) : (
            <div className='flex flex-col gap-5 text-black'>
              <h1>No company info found</h1>
              <button className='btn' onClick={handleAddCompanyClick}>
                Add Company
              </button>
            </div>
          )}
        </div>
      </div>
      {/* // EDIT COMPANY MODAL  */}

      <dialog id='edit-company-modal' className='modal p-4'>
        <div className=' modal-box  max-w-[1000px] scrollbar-hide scrollbar-thumb-blue-300 scrollbar-thin scrollbar-thumb-rounded-scrollBarDefault scrollbar-track-blue-100 '>
          <h3 className='font-bold text-2xl font-inter'>
            Edit Company Information
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
                value={formData.companyName || ""}
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
                value={formData?.officialWebsite || ""}
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
                Registered Address
              </label>
              <div className='flex items-center gap-4 flex-wrap md:flex-nowrap'>
                {" "}
                <input
                  type='text'
                  id='companyAddress'
                  value={formData?.companyAddress || ""}
                  onChange={handleInputChange}
                  className='w-full h-[55px] px-4 py-2 text-sm  border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
                  placeholder='Company Address'
                  name='companyAddress'
                />{" "}
                <input
                  type='text'
                  id='companyState'
                  value={formData?.companyState || ""}
                  onChange={handleInputChange}
                  className='w-full h-[55px] px-4 py-2 text-sm  border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
                  placeholder='Company State'
                  name='companyState'
                />{" "}
                <input
                  type='text'
                  id='companyCity'
                  value={formData?.companyCity || ""}
                  onChange={handleInputChange}
                  className='w-full h-[55px] px-4 py-2 text-sm  border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
                  placeholder='Company City'
                  name='companyCity'
                />
                <input
                  type='text'
                  id='companyStreet'
                  value={formData?.companyStreet || ""}
                  onChange={handleInputChange}
                  className='w-full h-[55px] px-4 py-2 text-sm  border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
                  placeholder='Company Street'
                  name='companyStreet'
                />
              </div>
            </div>
            <div className='mb-1 '>
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
                  value={formData?.operationalAddress || ""}
                  onChange={handleInputChange}
                  className='w-full h-[55px] px-4 py-2 text-sm  border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
                  placeholder='Operational Address'
                  name='operationalAddress'
                />{" "}
                <input
                  type='text'
                  id='operationalState'
                  value={formData?.operationalState || ""}
                  onChange={handleInputChange}
                  className='w-full h-[55px] px-4 py-2 text-sm  border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
                  placeholder='Operational State'
                  name='operationalState'
                />{" "}
                <input
                  type='text'
                  id='operationalCity'
                  value={formData?.operationalCity || ""}
                  onChange={handleInputChange}
                  className='w-full h-[55px] px-4 py-2 text-sm  border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
                  placeholder='Operational City'
                  name='operationalCity'
                />
                <input
                  type='text'
                  id='operationalStreet'
                  value={formData?.operationalStreet || ""}
                  onChange={handleInputChange}
                  className='w-full h-[55px] px-4 py-2 text-sm  border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
                  placeholder='Operational Street'
                  name='operationalStreet'
                />
              </div>
            </div>
          </div>
          <div className='flex items-center gap-4 mb-2'>
            <input
              type='checkbox'
              id='addressCheckbox'
              // defaultChecked
              name='sameAsRegistered'
              className='checkbox checkbox-primary'
            />
            <label htmlFor='addressCheckbox'>Same as registered address</label>
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
                  value={formData?.yearsEstablished || ""}
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
                  value={formData?.employeeCount || ""}
                  onChange={handleInputChange}
                  className='w-full h-[55px] px-4 py-2 text-sm  border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
                  placeholder=''
                  name='employeeCount'
                />
              </div>
            </div>
          </div>
          <div className='mb-2'>
            <label
              className='block text-sm text-black font-inter mb-2'
              htmlFor='companyName'
            >
              Main Product
            </label>
            <div className='flex items-center gap-3 flex-wrap '>
              {inputArray.map((_, index) => (
                <input
                  key={index}
                  type='text'
                  id={`companyName-${index}`}
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
          </div>
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
              value={formData?.aboutUs || ""}
              onChange={handleInputChange}
              className='w-full  px-4 py-2 text-sm  border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
              placeholder='Product Name'
              name='aboutUs'
            />
          </div>
          {error && <Error errorMessage={error} />}
          <div className='modal-action'>
            <form method='dialog'>
              {/* if there is a button in form, it will close the modal */}
              <button className='btn'>Close</button>
            </form>
            <button
              className='btn bg-primary text-white hover:bg-btnhover'
              type='submit'
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </dialog>
      <ToastContainer />
    </>
  )
}

export default CompanyInformationPage
