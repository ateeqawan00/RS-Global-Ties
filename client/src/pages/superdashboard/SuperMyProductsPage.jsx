import { productsData } from "../../data/myProductsData"

import { useEffect, useState } from "react"

import axiosInstance from "../../services/axiosInstance"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Helmet } from "react-helmet"

const SuperMyProductsPage = () => {
  const user = useSelector((state) => state.user.user)
  const navigate = useNavigate()

  const [myProducts, setMyProducts] = useState(null)

  useEffect(() => {
    const fetchMyProducts = async () => {
      try {
        const response = await axiosInstance.get("/product/getProduct")
        console.log("get all products: ", response)
        setMyProducts(response.data)
      } catch (error) {
        if (error.response) {
          console.error(
            "Error occurred fetching products: ",
            error.response.data.error
          )
          toast.error(error.response.data?.error)
        }
      }
    }

    fetchMyProducts()
  }, [])

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const handleUpdateProduct = async (productId) => {
    navigate(`/admin/edit-product/${productId}`)
  }

  const handleDeleteProduct = async (productId) => {
    try {
      const res = await axiosInstance.delete(
        `/product/productDetail/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      console.log("product delete: ", res)
    } catch (error) {
      console.error("error deleting product: ", error)
    }
  }

  return (
    <>
      <Helmet>
        <title>{`super products page - RSGlobalTies`}</title>
        <meta
          name='description'
          content='Add Products and services to list on the RSGlobalTies. Get insights, ratings, and user reviews for various products.'
        />
      </Helmet>
      <div className='overflow-x-scroll w-full'>
        <h1 className='self-start text-[2rem] font-semibold mb-5'>
          My Products
        </h1>
        <div className='relative overflow-x-auto'>
          <table className='w-full text-sm text-left rtl:text-right text-gray-500 '>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
              <tr>
                <th scope='col' className='px-6 py-3'>
                  Image
                </th>
                <th scope='col' className='px-6 py-3'>
                  Name
                </th>
                <th scope='col' className='px-6 py-3'>
                  Category
                </th>
                <th scope='col' className='px-6 py-3'>
                  Date
                </th>
                <th scope='col' className='px-6 py-3'></th>
                <th scope='col' className='px-6 py-3'></th>
              </tr>
            </thead>
            <tbody>
              {myProducts?.map((item, index) => (
                <tr className='bg-white border-b ' key={index}>
                  <th
                    scope='row'
                    className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'
                  >
                    <img
                      src={item.productImages[0]}
                      alt='item image'
                      className='rounded-md w-20 h-20 object-cover'
                    />
                  </th>
                  <td className='px-6 py-4'>{item.productName}</td>
                  <td className='px-6 py-4'>{item.productCategory}</td>
                  <td className='px-6 py-4'>{formatDate(item.createdAt)}</td>
                  <td>
                    <button
                      className='btn bg-primary text-white'
                      onClick={() => handleUpdateProduct(item._id)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className='btn text-red-600'
                      onClick={() => handleDeleteProduct(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ToastContainer />
      </div>
    </>
  )
}

export default SuperMyProductsPage
