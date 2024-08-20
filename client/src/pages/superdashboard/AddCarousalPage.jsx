import { useEffect, useState } from "react"
import axiosInstance from "../../services/axiosInstance"
import { FiPlus, FiTrash } from "react-icons/fi"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Helmet } from "react-helmet"

const AddCarousalPage = () => {
  const [carousel, setCarousel] = useState(null)
  const [carousels, setCarousels] = useState([])
  // const [rerender, setRerender] = useState(false)
  const [disabled, setDisabled] = useState(true)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setCarousel(file)
    setDisabled(false)
  }

  const handleSubmit = async () => {
    if (!carousel) {
      toast.warn("Select an image")
      return
    }

    try {
      const formData = new FormData()
      formData.append("Avatar", carousel)

      const res = await axiosInstance.post("/Caurasoul/AddCaurasol", formData)
      setCarousel(null)
      setCarousels((prevCarousels) => [...prevCarousels, res.data])
      toast.success("Carousal uploaded")
      // setRerender(!rerender)
    } catch (error) {
      console.log("Error from carousel", error.response.data)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/Caurasoul/deleteCarasoul/${id}`)
      toast.success("Carousal deleted")
      setCarousels((prevCarousels) => prevCarousels.filter((item) => item._id !== id))
      // setRerender(!rerender)
    } catch (error) {
      console.log("Error deleting carousel", error.response.data)
    }
  }

  useEffect(() => {
    const fetchCarousels = async () => {
      try {
        const { data } = await axiosInstance.get(
          "/Caurasoul/getAllCarouselItems"
        )
        setCarousels(data)
      } catch (error) {
        console.log(error.response.data)
      }
    }

    fetchCarousels()
  }, [])

  // console.log(carousels)

  return (
    <>
      <Helmet>
        <title>{`Add carousel- RSGlobalTies`}</title>
        <meta
          name='description'
          content='Add exiciting carousels. Get insights, ratings, and user reviews for various products.'
        />
      </Helmet>
      <div className='p-2 flex flex-col gap-4'>
        <h1 className='self-start text-[2rem] font-bold mb-5'>Add Carousals</h1>
        <div className='flex items-center justify-start gap-4 flex-wrap'>
          {carousels &&
            carousels.map((item) => (
              <div
                className='flex items-center rounded-md shadow-sm overflow-hidden relative'
                key={item._id}
              >
                <img
                  src={item.imageUrl}
                  alt='carousel img'
                  className='w-[250px] h-[125px] object-cover'
                />
                <button
                  className='absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition duration-300'
                  onClick={() => handleDelete(item._id)} // Pass item._id to handleDelete
                >
                  <FiTrash />
                </button>
              </div>
            ))}
          {carousel && (
            <div className='flex items-center rounded-md shadow-sm overflow-hidden relative'>
              <img
                id="selected-carousel"
                src={carousel ? URL.createObjectURL(carousel) : ""}
                alt='carousel img'
                className='w-[250px] h-[125px] object-cover'
              />
              <button
                className='absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition duration-300'
                onClick={() => setCarousel(null)}
              >
                <FiTrash />
              </button>
            </div>
          )}
          <div className='flex items-center justify-center rounded-md shadow-sm overflow-hidden w-[250px] h-[125px] border-dashed border-2 border-sky-500'>
            <label
              htmlFor='fileInput'
              className='flex flex-col gap-4 items-center justify-center'
            >
              <input
                type='file'
                id='fileInput'
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <FiPlus size={50} />
              <h3>Add New Carousal</h3>
            </label>
          </div>
        </div>
        <h3>Press save to upload the carousel image.</h3>
        <button
          disabled={disabled}
          className='btn btn-primary px-10 bg-primary text-white w-32'
          onClick={handleSubmit}
        >
          Save
        </button>
        <ToastContainer />
      </div>
    </>
  )
}

export default AddCarousalPage
