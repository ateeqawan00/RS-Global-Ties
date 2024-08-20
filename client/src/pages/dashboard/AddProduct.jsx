import { useEffect, useState } from "react"
import axiosInstance from "../../services/axiosInstance"
import { useSelector } from "react-redux"

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Helmet } from "react-helmet"

const AddProduct = () => {
  const [formData, setFormData] = useState({})
  const [productAvatars, setProductAvatars] = useState(null)
  const user = useSelector((state) => state.user.user)
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)
  // console.log("user: ", user);

  const [categories, setCategories] = useState()
  const [subCategories, setSubCategories] = useState()

  const handleFileChange = (e) => {
    const files = e.target.files
    const selectedFiles = Array.from(files).slice(0, 5)
    setProductAvatars(selectedFiles)
  }

  // console.log("avatar files: ", productAvatars)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    if (name === "productCategory") {
      // Get the selected category object based on its name
      const selectedCategory = categories.find((cat) => cat.name === value)
      if (selectedCategory) {
        // Update the selected category ID in the state
        setSelectedCategoryId(selectedCategory._id)
      } else {
        // If no category is found, set selectedCategoryId to null
        setSelectedCategoryId(null)
      }
    }
  }

  const handleRemoveAvatar = () => {
    document.getElementById("productAvatar").value = null
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
      if (response.data.error) {
        toast.error(response.data.error)
      }
      const message = response.statusText
      toast.success(message)
      console.log(response)
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
    if (selectedCategoryId) {
      const fetchSubcategories = async () => {
        try {
          const { data } = await axiosInstance.get(
            `/subcatagory/getAllSubcategories/${selectedCategoryId}`
          )
          // Handle fetched subcategories data
          setSubCategories(data)
        } catch (error) {
          console.log("Error fetching subcategories: ", error)
        }
      }
      fetchSubcategories()
    }
  }, [selectedCategoryId])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axiosInstance.get("/Catagory/getAllCategories")
        setCategories(data)
      } catch (error) {
        console.log("error fetching categories: ", error)
      }
    }
    fetchCategories()
  }, [])

  // console.log("cats: ", categories);
  // console.log("form data: ", formData);
  // console.log("cat id: ", selectedCategoryId);

  return (
    <>
      <Helmet>
        <title>{`Add product - RSGlobalTies`}</title>
        <meta
          name='description'
          content='Add your product. Get insights, ratings, and user reviews for various products.'
        />
      </Helmet>
      <div className='flex items-center justify-center m-auto'>
        <div className=' p-4 md:p-16 bg-white shadow-md rounded-md flex flex-col gap-4 w-full '>
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
              <option hidden>Choose Category</option>
              {categories &&
                categories.map((cat) => (
                  <option value={cat.name} key={cat._id}>
                    {cat.name}
                  </option>
                ))}
            </select>
          </div>
          {subCategories && (
            <div className='mb-2'>
              <label
                className='block text-sm text-label font-inter mb-2'
                htmlFor='productSubcategory'
              >
                Select Sub Category
              </label>
              <select
                id='productSubcategory'
                className='w-full h-[55px] px-4 py-2 text-sm  border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white'
                name='productSubcategory'
                value={formData.productSubcategory || ""}
                onChange={handleInputChange}
              >
                <option hidden>Choose Sub Category</option>
                {subCategories &&
                  subCategories.map((cat) => (
                    <option value={cat.name} key={cat._id}>
                      {cat.name}
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
          <div className='flex items-center justify-between  mt-12'>
            <h1 className='btn px-10 '>Cancel</h1>
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

export default AddProduct
