import { useState } from "react"
import axiosInstance from "../../services/axiosInstance"

import { useSelector } from "react-redux"

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Helmet } from "react-helmet"

const BusinessVerification = () => {
  const user = useSelector((state) => state.user.user)

  const [pdfs, setPdfs] = useState([])

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    setPdfs(files)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    pdfs.forEach((file) => {
      formData.append(`pdfUrls`, file)
    })

    try {
      await axiosInstance.post("/business/uploadBusinessDocuments", formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      toast.success("PDFs Uploaded")
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.error || "Error uploading PDFs")
    }
  }

  return (
    <>
      <Helmet>
        <title>{`Business Verification - RSGlobalTies`}</title>
        <meta
          name='description'
          content='Get insights, ratings, and user reviews for various products.'
        />
      </Helmet>
      <div className='flex items-center justify-center m-auto'>
        <div className='p-4 md:p-20 bg-white shadow-md rounded-md flex flex-col gap-4 w-full'>
          <h1 className='self-start text-2xl font-bold'>
            Upload Business Document
          </h1>
          <label
            className='block mb-2 text-sm font-medium text-gray-900 '
            htmlFor='file_input'
          >
            Upload file - Only PDF&apos;s Allowed
          </label>
          <input
            className='relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none '
            type='file'
            accept='.pdf'
            id='formFile'
            onChange={handleFileChange}
            multiple
          />

          <div className=''>
            <form>
              <div className='grid grid-cols-2 gap-6'>
                <div className='col-span-2 sm:col-span-1'></div>
              </div>
              <div className='mt-8'>
                <button
                  type='submit'
                  className='w-full bg-btnprimary hover:bg-btnhover text-white font-medium py-3 rounded-lg focus:outline-none'
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  )
}

export default BusinessVerification
