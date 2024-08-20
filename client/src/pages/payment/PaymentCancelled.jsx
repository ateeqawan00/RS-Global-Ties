import React from "react";
import { Link } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";
import { Helmet } from "react-helmet";

const PaymentCancelled = () => {
  return (
    <>
      <Helmet>
        <title>{`Stripe Payment Cancelled - RSGlobalTies`}</title>
        <meta
          name='description'
          content='Your payment has been cancelled.'
        />
      </Helmet>
      <div className='flex items-center justify-center h-screen'>
        <div className='max-w-lg bg-white rounded-lg shadow-md p-6 text-center'>
          <FaTimesCircle className='text-red-500 mx-auto mb-4' size={64} />
          <h2 className='text-2xl font-semibold mb-4'>Payment Cancelled</h2>
          <p className='text-lg mb-6'>Your payment has been cancelled.</p>
          <Link
            to={"/"}
            className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded block w-max mx-auto'
          >
            Go Back to Dashboard
          </Link>
        </div>
      </div>
    </>
  );
};

export default PaymentCancelled;