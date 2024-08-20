import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";

import { companyEditCheckboxData } from "../../data/companyEditData"
import axiosInstance from "../../services/axiosInstance"
import { useSelector } from "react-redux"

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Helmet } from "react-helmet";

const SuperCompanyInfo = () => {
  const [productCount, setProductCount] = useState(1)
  const [inputArray, setInputArray] = useState(Array.from({ length: 0 }))
  const user = useSelector((state) => state.user.user)
  const [companyData, setCompanyData] = useState({
    companyName: "",
    companyType: "",
    companyWebsite: "",
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

  const [fetchedCompanyData, setFetchedCompanyData] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name.startsWith("mainProduct")) {
      const index = parseInt(name.split("-")[1])
      const updatedMainProduct = [...companyData.mainProduct]
      updatedMainProduct[index] = value
      setCompanyData({ ...companyData, mainProduct: updatedMainProduct })
    } else {
      setCompanyData({ ...companyData, [name]: value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let data = {
        companyName: companyData.companyName,
        businessType: [companyData.companyType],
        officialWebsite: companyData.companyWebsite,
        registeredAddress: {
          country: companyData.companyAddress,
          state: companyData.companyState,
          city: companyData.companyCity,
          street: companyData.companyStreet,
        },
        operationalAddress: {
          country: companyData.operationalAddress,
          provinceState: companyData.operationalState,
          city: companyData.operationalCity,
          street: companyData.operationalStreet,
        },
        yearEstablished: companyData.yearsEstablished.split("-")[0],
        mainProducts: companyData.mainProduct,
        aboutUs: companyData.aboutUs,
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
      const message = response.data?.message
      // setFetchedCompanyData(response.data)
      toast.success(message)
      document.getElementById("edit-company-modal").close()
    } catch (error) {
      if (error.response) {
        console.error(
          "Error occurred during company profile creation:",
          error.response.data.error
        )
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
        setFetchedCompanyData(response.data)
      } catch (error) {
        if (error.response) {
          console.error("Error occurred: ", error.response.data)
          // toast.error(error.response.data?.message)
        } else {
          console.error("Error occurred: ", error)
        }
      }
    }
    fetchCompanyProfile()
  }, [user])
  console.log(fetchedCompanyData)
  return (
    <>
    <Helmet>
        <title>{`Super Company info - RSGlobalTies`}</title>
        <meta
          name='description'
          content='Add Products and services to list on the RSGlobalTies. Get insights, ratings, and user reviews for various products.'
        />
      </Helmet>
      <div className='flex items-center justify-center m-auto'>
        <div className='p-4 md:p-10 bg-white shadow-xl rounded-md flex flex-col gap-4 w-full 700px:min-w-[600px] 1000px:w-full 1200px:min-w-[800px] '>
          <div className='flex items-center justify-between w-full  '>
            <h1 className='text-2xl font-bold'>Company Information</h1>
            <button
              className='btn'
              onClick={() =>
                document.getElementById("edit-company-modal").showModal()
              }
            >
              Edit
            </button>
          </div>
          <div className='flex flex-col gap-5 text-black'>
            <div className='flex items-center justify-between gap-5 flex-wrap w-full'>
              <div className='flex gap-4'>
                <label htmlFor='name' className=''>
                  Company Name:
                </label>
                <h1 className='text-black font-semibold '>
                  {fetchedCompanyData.data?.companyName || "None"}
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
                  {fetchedCompanyData.data?.yearEstablished || "None"}
                </h1>
              </div>
              <div className='flex gap-4'>
                <label htmlFor='name' className=''>
                  Main Product:
                </label>
                {fetchedCompanyData.data?.mainProducts.map((product, index) => (
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
                  {fetchedCompanyData.data?.officialWebsite || "None"}
                </h1>
              </div>
              <div className='flex gap-4'>
                <label htmlFor='name' className=''>
                  Registered Address:
                </label>
                <div className='text-black font-semibold '>
                  <div>
                    {fetchedCompanyData.data?.registeredAddress.country || "None"}
                  </div>
                  <div>
                    {fetchedCompanyData.data?.registeredAddress.state || "None"}
                  </div>
                  <div>
                    {fetchedCompanyData.data?.registeredAddress.city || "None"}
                  </div>
                  <div>
                    {fetchedCompanyData.data?.registeredAddress.street || "None"}
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
                  {fetchedCompanyData.data?.businessType || "None"}
                </h1>
              </div>
              <div className='flex gap-4'>
                <label htmlFor='name' className=''>
                  Operational Address:
                </label>
                <div className='text-black font-semibold '>
                  <div>
                    {fetchedCompanyData.data?.operationalAddress.country || "None"}
                  </div>
                  <div>
                    {fetchedCompanyData.data?.operationalAddress.provinceState || "None"}
                  </div>
                  <div>
                    {fetchedCompanyData.data?.operationalAddress.city || "None"}
                  </div>
                  <div>
                    {fetchedCompanyData.data?.operationalAddress.street || "None"}
                  </div>
                </div>
              </div>
            </div>
            <div className='flex items-center justify-between gap-5 flex-wrap w-full'>
              <div className='flex gap-4'>
                <label htmlFor='name' className=''>
                  Total Number of Employee:
                </label>
                <h1 className='text-black font-semibold '>{fetchedCompanyData.data?.noOfEmployees || "None"}</h1>
              </div>
              <div className='flex gap-4'>
                <label htmlFor='name' className=''>
                  About Us:
                </label>
                <h1 className='text-black font-semibold '>{fetchedCompanyData.data?.aboutUs || "None"}</h1>
              </div>
            </div>
          </div>
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
                value={companyData.companyName || ""}
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
                    name='companyType'
                  />
                  <span className='label-text'>{item}</span>
                </div>
              ))}
            </div>
            <div className='mb-2'>
              <label
                className='block text-sm text-black font-inter mb-2'
                htmlFor='companyWebsite'
              >
                Official Website
              </label>
              <input
                type='text'
                id='companyWebsite'
                value={companyData.companyWebsite || ""}
                onChange={handleInputChange}
                className='w-full h-[55px] px-4 py-2 text-sm  border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
                placeholder='Company Name'
                name='companyWebsite'
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
                  value={companyData.companyAddress || ""}
                  onChange={handleInputChange}
                  className='w-full h-[55px] px-4 py-2 text-sm  border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
                  placeholder='Company Address'
                  name='companyAddress'
                />{" "}
                <input
                  type='text'
                  id='companyState'
                  value={companyData.companyState || ""}
                  onChange={handleInputChange}
                  className='w-full h-[55px] px-4 py-2 text-sm  border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
                  placeholder='Company State'
                  name='companyState'
                />{" "}
                <input
                  type='text'
                  id='companyCity'
                  value={companyData.companyCity || ""}
                  onChange={handleInputChange}
                  className='w-full h-[55px] px-4 py-2 text-sm  border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
                  placeholder='Company City'
                  name='companyCity'
                />
                <input
                  type='text'
                  id='companyStreet'
                  value={companyData.companyStreet || ""}
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
                  value={companyData.operationalAddress || ""}
                  onChange={handleInputChange}
                  className='w-full h-[55px] px-4 py-2 text-sm  border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
                  placeholder='Operational Address'
                  name='operationalAddress'
                />{" "}
                <input
                  type='text'
                  id='operationalState'
                  value={companyData.operationalState || ""}
                  onChange={handleInputChange}
                  className='w-full h-[55px] px-4 py-2 text-sm  border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
                  placeholder='Operational State'
                  name='operationalState'
                />{" "}
                <input
                  type='text'
                  id='operationalCity'
                  value={companyData.operationalCity || ""}
                  onChange={handleInputChange}
                  className='w-full h-[55px] px-4 py-2 text-sm  border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
                  placeholder='Operational City'
                  name='operationalCity'
                />
                <input
                  type='text'
                  id='operationalStreet'
                  value={companyData.operationalStreet || ""}
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
                  value={companyData.yearsEstablished || ""}
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
                  value={companyData.employeeCount || ""}
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
                  value={companyData.mainProduct[index] || ""}
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
              value={companyData.aboutUs || ""}
              onChange={handleInputChange}
              className='w-full  px-4 py-2 text-sm  border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
              placeholder='Product Name'
              name='aboutUs'
            />
          </div>
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
};

export default SuperCompanyInfo;
