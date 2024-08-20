import React from "react"
import { Link } from "react-router-dom"
import { FaCheckCircle } from "react-icons/fa"
import { Helmet } from "react-helmet"

const PaymentSuccessful = () => {
  return (
    <>
      <Helmet>
        <title>{`stripe payment successful - RSGlobalTies`}</title>
        <meta
          name='description'
          content='Get insights, ratings, and user reviews for various products.'
        />
      </Helmet>
      <div className='flex items-center justify-center h-screen'>
        <div className='max-w-lg bg-white rounded-lg shadow-md p-6 text-center'>
          <FaCheckCircle className='text-green-500 mx-auto mb-4' size={64} />
          <h2 className='text-2xl font-semibold mb-4'>Payment Successful</h2>
          <p className='text-lg mb-6'>Thank you for your payment!</p>
          <Link
            to={"/"}
            className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded block w-max mx-auto'
          >
            Go Back to Dashboard
          </Link>
        </div>
      </div>
    </>
  )
}

export default PaymentSuccessful
