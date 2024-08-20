import { useEffect, useState } from "react"

import axiosInstance from "../../services/axiosInstance"
import { useSelector } from "react-redux"

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Helmet } from "react-helmet"

const MyProducts = () => {
  const user = useSelector((state) => state.user.user)

  const [myProducts, setMyProducts] = useState(null)

  useEffect(() => {
    const fetchMyProducts = async () => {
      try {
        const response = await axiosInstance.get("/product/getUserProduct", {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        })

        setMyProducts(response.data.products)
        console.log(response.data)
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

  return (
    <>
      <Helmet>
        <title>{`My Products - RSGlobalTies`}</title>
        <meta
          name='description'
          content='Get insights, ratings, and user reviews for various products.'
        />
      </Helmet>
      <div className='p-6  '>
        <h1 className='self-start text-[2rem] font-semibold mb-5'>
          My Products
        </h1>
        <div className='relative overflow-x-auto'>
          <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 '>
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
                      src={item.productAvatar || item.productImages[0]}
                      alt='item image'
                      className='rounded-md w-20 h-20 object-cover'
                    />
                  </th>
                  <td className='px-6 py-4'>{item.productName}</td>
                  <td className='px-6 py-4'>{item.productCategory}</td>
                  <td className='px-6 py-4'>{formatDate(item.createdAt)}</td>
                  <td>
                    <button className='btn bg-primary text-white'>Edit</button>
                  </td>
                  <td>
                    <button className='btn text-red-600'>Delete</button>
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

export default MyProducts
