import { useEffect, useState } from "react"
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react"
import { superProductListsTabsData } from "../../data/superProductPageData"
import { LuSettings2 } from "react-icons/lu"

import axiosInstance from "../../services/axiosInstance"

import { FiPlus, FiTrash } from "react-icons/fi"
import { Helmet } from "react-helmet"
import { FaMinus, FaPlus } from "react-icons/fa"
export default function SuperProductListsPage() {
  const [activeTab, setActiveTab] = useState()
  const [categoryName, setCategoryName] = useState("")
  const [subCategoryNames, setSubCategoryNames] = useState([])
  const [categories, setCategories] = useState()
  const [subCategories, setSubCategories] = useState()
  const [categoryId, setCategoryId] = useState("")

  const [inputArray, setInputArray] = useState([])
  const [subCategoryCount, setsubCategoryCount] = useState(1)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    const index = parseInt(name.split("-")[1])
    const updatedSubCategories = [...subCategoryNames]
    updatedSubCategories[index] = value
    setSubCategoryNames([...updatedSubCategories])
  }

  const handleTabClick = (value) => {
    setActiveTab(value)
  }

  const handleCategorySubmit = async () => {
    try {
      const response = await axiosInstance.post("/Catagory/createCatagory", {
        name: categoryName,
      })
      setCategories((prevCategories) => [...prevCategories, response.data])
      document.getElementById("create-category").close()
      setCategoryName("")
      // console.log('category res: ', response);
    } catch (error) {
      console.error("error from create category: ", error)
    }
  }

  const handleSubCategorySubmit = async () => {
    if (!subCategoryNames) {
      console.error("Subcategory name cannot be empty.")
      return
    }
    try {
      const response = await axiosInstance.post(
        "/subcatagory/createSubCatagory",
        { categoryId, names: subCategoryNames }
      )
      setSubCategories((prevCategories) => [
        ...prevCategories,
        ...response.data.subcategories.map((subcategory) => ({
          category: response.data.category,
          names: subcategory.flat()
        })),
      ]);
      document.getElementById("create-subCategory").close()
      setSubCategoryNames("")
      console.log("sub category data response: ", response)
    } catch (error) {
      console.error("error from create sub category: ", error)
    }
  }

  const handleDeleteSubCategory = async (categoryId) => {
    try {
      const res = await axiosInstance.delete(
        `/subcatagory/getAllSubcategories/${categoryId}`
      )
      if (res.status === 200) {
        setSubCategories((prevSubCategories) =>
          prevSubCategories.filter(
            (subCategory) => subCategory._id !== categoryId
          )
        )
      }
    } catch (error) {
      console.error("error deleteing category: ", error)
    }
  }

  const handleDeleteCategory = async (categoryId) => {
    try {
      const res = await axiosInstance.delete(
        `/Catagory/deleteCategory/${categoryId}`
      )
      if (res.status === 200) {
        setCategories((prevCategories) =>
          prevCategories.filter((category) => category._id !== categoryId)
        )
      }
    } catch (error) {
      console.error("error deleteing category: ", error)
    }
  }

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        if (!categoryId) return
        // console.log(categoryId)
        const { data } = await axiosInstance.get(
          `/subcatagory/getAllSubcategories/${categoryId}`
        )
        console.log("sub categories data: ", data)
        setSubCategories(data)
      } catch (error) {
        console.error("error from sub category: ", error)
      }
    }

    fetchSubCategories()
  }, [categoryId])

  // console.log("sub cats: ", subCategories)

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

  useEffect(
    () => setInputArray(Array.from({ length: subCategoryCount })),
    [subCategoryCount]
  )

  // console.log("category: ", category);
  // console.log("categories: ", categories)

  // console.log("input array: ", inputArray)
  // console.log("sub categories count: ", subCategoryCount)
  // console.log('sub categories state: ', subCategories);

  return (
    <>
      <Helmet>
        <title>{`Super product list - RSGlobalTies`}</title>
        <meta
          name='description'
          content='Add Products and services to list on the RSGlobalTies. Get insights, ratings, and user reviews for various products.'
        />
      </Helmet>
      <Tabs value={activeTab} className='p-4'>
        <h1 className='mb-4 text-2xl font-semibold'>Product Lists</h1>
        <div className='flex justify-between'>
          <button
            className='px-6 py-2 border border-primary font-[500] flex items-center gap-2 rounded-md'
            onClick={() =>
              document.getElementById("create-category").showModal()
            }
          >
            <LuSettings2 size={25} />
            <p>Create Categories</p>
          </button>
        </div>

        {/* category */}
        <dialog id='create-category' className='modal p-4'>
          <div className='modal-box  max-w-[400px] scrollbar-hide scrollbar-thumb-blue-300 scrollbar-thin scrollbar-thumb-rounded-scrollBarDefault scrollbar-track-blue-100 flex flex-col space-y-6 place-items-center'>
            <p className='font-semibold self-start'>Category Name</p>
            <div className='flex justify-center flex-col'>
              <input
                type='text'
                className='border border-gray-400 p-2 mb-2'
                placeholder='Enter Category Name'
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>
            <div className='space-x-6'>
              <button
                className='px-4 py-2 text-center text-white bg-primary border rounded-md sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
                onClick={handleCategorySubmit}
              >
                Save
              </button>
              <button
                className='px-4 py-1 text-center text-black bg-white border border-black rounded-md sm:w-fit hover:bg-primary-800'
                onClick={() =>
                  document.getElementById("create-category").close()
                }
              >
                Close
              </button>
            </div>
          </div>
        </dialog>

        {/* sub category */}
        <dialog id='create-subCategory' className='modal p-4'>
          <div className='modal-box  max-w-[400px] scrollbar-hide scrollbar-thumb-blue-300 scrollbar-thin scrollbar-thumb-rounded-scrollBarDefault scrollbar-track-blue-100 flex flex-col space-y-6 place-items-center'>
            <button className='font-semibold self-start'>
              Sub Category Name
            </button>
            <div className='flex flex-col gap-2'>
              {inputArray &&
                inputArray.map((_, index) => (
                  <div className='flex gap-2'>
                    <input
                      type='text'
                      name={`subcategory-${index}`}
                      className='border border-gray-400 p-2'
                      placeholder='Enter Sub Category Name'
                      value={subCategoryNames[index] || ""}
                      onChange={handleInputChange}
                    />
                    {/* {inputArray.length > 1 && (
                      <div
                        onClick={() =>
                          setsubCategoryCount((prevValue) => prevValue - 1)
                        }
                        className='flex px-3 text-sm border rounded-md items-center justify-center hover:cursor-pointer hover:bg-gray-400 text-red-500'
                      >
                        <FaMinus />
                      </div>
                    )} */}
                  </div>
                ))}
              <div
                onClick={() =>
                  setsubCategoryCount((prevValue) => prevValue + 1)
                }
                className='flex min-w-[160px] h-[55px] px-4 py-2 text-sm border rounded-md items-center justify-center hover:cursor-pointer hover:bg-gray-400'
              >
                <FaPlus />
              </div>
            </div>
            <div className='space-x-6'>
              <button
                className='px-4 py-2 text-center text-white bg-primary border rounded-md sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
                onClick={handleSubCategorySubmit}
              >
                Save
              </button>
              <button
                className='px-4 py-1 text-center text-black bg-white border border-black rounded-md sm:w-fit hover:bg-primary-800'
                onClick={() => {
                  setSubCategoryNames([])
                  setsubCategoryCount(1)
                  document.getElementById("create-subCategory").close()
                }}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>

        <div className='overflow-x-auto max-w-screen-lg'>
          <TabsHeader className='flex-wrap 800px:flex-nowrap gap-2'>
            {categories &&
              categories.map(({ name, _id }, index) => (
                <Tab
                  key={index}
                  value={name}
                  onClick={() => {
                    handleTabClick(index)
                    setCategoryId(_id)
                  }}
                  className={`py-2 px-4 ${
                    activeTab === index
                      ? "text-primary border-b border-primary"
                      : "bg-inherit"
                  } flex-1 text-nowrap`}
                >
                  {name}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteCategory(_id)
                    }}
                    className='ml-4 text-red-500'
                  >
                    <FiTrash size={15} />
                  </button>
                </Tab>
              ))}
          </TabsHeader>
        </div>
        <TabsBody>
          {categories &&
            categories.map(({ name }, index) => (
              <TabPanel
                key={index}
                value={name}
                className='p-4 flex flex-wrap items-center justify-start 500px:text-nowrap gap-8'
              >
                <button
                  onClick={() =>
                    document.getElementById("create-subCategory").showModal()
                  }
                >
                  <div className='flex items-center justify-center rounded-md shadow-sm overflow-hidden w-[300px] hover:bg-gray-200 hover:cursor-pointer h-[150px] border-dashed border-2 border-sky-500'>
                    <div className='flex flex-col gap-4 items-center justify-center '>
                      <FiPlus size={50} />
                      <p>Create Sub Category</p>
                    </div>
                  </div>
                </button>

                {subCategories &&
                  subCategories.map(
                    ({ names: subCatNames, _id: subCatId }, subIndex) => (
                      <div
                        key={subIndex}
                        className='flex items-center justify-center rounded-md shadow-sm overflow-hidden w-[300px] hover:bg-gray-200 hover:cursor-pointer h-[150px] border-dashed border-2'
                      >
                        {subCatNames[0] || ""}
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteSubCategory(subCatId)
                          }}
                          className='ml-6 text-red-500'
                        >
                          <FiTrash size={15} />
                        </button>
                      </div>
                    )
                  )}
              </TabPanel>
            ))}
        </TabsBody>
      </Tabs>
    </>
  )
}
