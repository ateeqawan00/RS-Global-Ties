import React from "react"
import { Helmet } from "react-helmet"
const ServicesPage = () => {
  return (
    <>
      <Helmet>
        <title>{`Services - RSGlobalTies`}</title>
        <meta
          name='description'
          content='here you can find services we offer. Get insights, ratings, and user reviews for various products.'
        />
      </Helmet>
      <div className='max-w-3xl mx-auto py-8 px-4'>
        <h1 className='text-3xl font-bold mb-6'>Our Services</h1>
        <section className='mb-8'>
          <h2 className='text-xl font-semibold mb-4'>Introduction</h2>
          <p className='mb-4'>
            At GlobalTies, we offer a range of comprehensive B2B solutions
            tailored to meet your business needs. Our services include:
          </p>
          <ul className='list-disc pl-4 mb-4'>
            <li>Supply Chain Management</li>
            <li>Business Consultancy</li>
            <li>Digital Marketing Strategies</li>
            <li>Custom Software Development</li>
            <li>Vendor Management</li>
          </ul>
          <p className='mb-4'>
            Whether you're looking to optimize your supply chain operations,
            enhance your digital presence, or streamline your business
            processes, GlobalTies has the expertise and resources to help you
            achieve your goals.
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-xl font-semibold mb-4'>Information We Provide</h2>
          <p className='mb-4'>
            We provide valuable information and insights to help you make
            informed business decisions. Our information includes:
          </p>
          <ul className='list-disc pl-4 mb-4'>
            <li>Market Trends and Analysis</li>
            <li>Competitor Analysis</li>
            <li>Industry Reports</li>
            <li>Business Strategies and Best Practices</li>
          </ul>
          <p className='mb-4'>
            Our goal is to empower businesses with the knowledge they need to
            succeed in today's competitive market.
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-xl font-semibold mb-4'>Data Security</h2>
          <p className='mb-4'>
            We take data security seriously and employ industry-standard
            measures to protect your information. However, no system can
            guarantee 100% security, and we recommend taking precautions to
            safeguard your data.
          </p>
        </section>
      </div>
    </>
  )
}

export default ServicesPage
