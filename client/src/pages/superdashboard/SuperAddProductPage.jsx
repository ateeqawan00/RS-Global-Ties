import { useEffect, useState } from "react"
import axiosInstance from "../../services/axiosInstance"
import { useSelector } from "react-redux"

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Helmet } from "react-helmet"

const SuperAddProductPage = () => {
  const [formData, setFormData] = useState({})
  const user = useSelector((state) => state.user.user)
  const [productAvatars, setProductAvatars] = useState(null)
  const [categories, setCategories] = useState()
  const [subCategories, setSubCategories] = useState([])
  const [categoryId, setCategoryId] = useState("")

  const handleInputChange = (e) => {
    let { name, value } = e.target
    if (name === "productCategory") {
      const { _id } = categories.find((category) => category.name === value)
      setCategoryId(_id)
      // console.log("category _id: ", _id)
    }
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleFileChange = (e) => {
    const files = e.target.files
    const selectedFiles = Array.from(files).slice(0, 5)
    setProductAvatars(selectedFiles)
  }

  const handleRemoveAvatar = () => {
    document.getElementById("productAvatars").value = null
    setProductAvatars(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formDataWithFiles = new FormData()
      productAvatars.forEach((file) => {
        formDataWithFiles.append(`productAvatar`, file)
      })
      for (const key in formData) {
        formDataWithFiles.append(key, formData[key])
      }

      const response = await axiosInstance.post(
        "/product/productDetail",
        formDataWithFiles,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      // console.log(response)
      const message = response.statusText
      toast.success(message)
    } catch (error) {
      if (error.response) {
        console.error(
          "Error occurred during add product:",
          error.response.data.error
        )
        toast.error(error.response.data?.error)
      } else {
        console.error("Error occurred during add product:", error)
      }
    }
  }

  useEffect(() => {
    const fetchSubCategories = async () => {
      if (!categoryId) return
      try {
        if (!categoryId) return
        // console.log(categoryId)
        const { data } = await axiosInstance.get(
          `/subcatagory/getAllSubcategories/${categoryId}`
        )
        setSubCategories(data)
      } catch (error) {
        console.error("error from sub category: ", error)
      }
    }

    fetchSubCategories()
  }, [categoryId])

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const response = await axiosInstance.get("/Catagory/getAllCategories")
        setCategories(response.data)
      } catch (error) {
        console.error("categories error: ", error)
      }
    }

    fetchAllCategories()
  }, [])

  // console.log("cats: ",categories);
  // console.log("form data: ", formData)

  return (
    <>
      <Helmet>
        <title>{`Add Product- RSGlobalTies`}</title>
        <meta
          name='description'
          content='Add Products to list on the RSGlobalTies. Get insights, ratings, and user reviews for various products.'
        />
      </Helmet>
      <div className='flex items-center justify-start 400px:justify-center w-full'>
        <div className=' 400px:p-4 md:p-16 bg-white  rounded-md flex flex-col gap-4 w-full 400px:min-w-[70%]'>
          <h1 className='self-start text-2xl font-semibold'>
            Enter Product Details
          </h1>
          <div className='flex items-center space-x-6 '>
            <div className='shrink-0'>
              <img
                id='preview_img'
                className='h-20 w-20 object-cover rounded-md'
                src={
                  productAvatars
                    ? URL.createObjectURL(productAvatars[0])
                    : "https://icon-library.com/images/image-placeholder-icon/image-placeholder-icon-5.jpg"
                }
                alt='Current profile photo'
              />
            </div>
            <div className='flex gap-3 items-center 500px:flex-nowrap flex-wrap text-nowrap'>
              <label
                htmlFor='productAvatars'
                className='block w-full text-sm text-slate-500 mr-4 py-2 px-4 rounded-md border-0 font-semibold bg-violet-50 hover:bg-violet-100 hover:cursor-pointer'
              >
                Choose upto 5 Images
                <input
                  type='file'
                  className='hidden'
                  name='productAvatars'
                  id='productAvatars'
                  onChange={handleFileChange}
                  multiple
                />
              </label>
              <button
                className='btn'
                disabled={productAvatars ? false : true}
                onClick={handleRemoveAvatar}
              >
                Remove
              </button>
            </div>
          </div>

          <div className='mb-2'>
            <label
              className='block text-sm text-label font-inter mb-2'
              htmlFor='productName'
            >
              Product Name
            </label>
            <input
              type='text'
              id='productName'
              className='w-full h-[55px]  px-4 py-2 text-sm  border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
              placeholder='Product Name'
              name='productName'
              value={formData.productName || ""}
              onChange={handleInputChange}
            />
          </div>

          {/* category */}
          <div className='mb-2'>
            <label
              className='block text-sm text-label font-inter mb-2'
              htmlFor='productCategory'
            >
              Product Category
            </label>
            <select
              id='productCategory'
              className='w-full h-[55px] px-4 py-2 text-sm  border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
              name='productCategory'
              value={formData.productCategory || ""}
              onChange={handleInputChange}
            >
              <option value='' hidden>
                Select Category
              </option>
              {categories &&
                categories.map((category, index) => (
                  <option key={index} value={category.value} className=''>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>

          {/* sub categories */}
          {categoryId && (
            <div className='mb-2'>
              <label
                className='block text-sm text-label font-inter mb-2'
                htmlFor='productSubcategory'
              >
                Sub Category
              </label>
              <select
                id='productSubcategory'
                className='w-full h-[55px] px-4 py-2 text-sm  border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
                name='productSubcategory'
                value={formData.productSubcategory || ""}
                onChange={handleInputChange}
              >
                <option value='' hidden>
                  Select Sub Category
                </option>
                {subCategories.map(({ name }, index) => (
                  <option key={index} value={name} className=''>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className='mb-2'>
            <label
              className='block text-sm text-label font-inter mb-2'
              htmlFor='productName'
            >
              Product Price
            </label>
            <input
              type='number'
              id='price'
              className='w-full h-[55px]  px-4 py-2 text-sm  border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
              placeholder='Product Price'
              name='price'
              value={formData.price || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className='mb-2'>
            <label
              className='block text-sm text-label font-inter mb-2'
              htmlFor='productDescription'
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
          <div className='flex items-center justify-between gap-1 mt-12'>
            <h1 className='btn px-10 ' onClick={() => setFormData({})}>
              Cancel
            </h1>
            <button
              className='btn btn-primary px-10 bg-primary text-white'
              onClick={handleSubmit}
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

export default SuperAddProductPage
