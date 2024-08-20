import React from 'react';
import { Helmet } from 'react-helmet';

const ContactUsPage = () => {
  return (
    <>
    <Helmet>
        <title>{`ContactUs - RSGlobalTies`}</title>
        <meta
          name='description'
          content='Contact us for any queries and customer support. Get insights, ratings, and user reviews for various products.'
        />
      </Helmet>
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
        <p className="mb-4">
          We'd love to hear from you! Whether you have questions about our services, need assistance, or want to provide feedback, please feel free to reach out to us using the contact information below:
        </p>
        <ul className="list-disc pl-4 mb-4">
          <li>Email: <a href="mailto:info@globalties.com" className="text-blue-500">info@globalties.com</a></li>
          <li>Phone: +1 (123) 456-7890</li>
          <li>Address: 123 Main Street, City, Country</li>
        </ul>
        <p className="mb-4">
          Our dedicated team is ready to assist you and will respond to your inquiries promptly.
        </p>
      </section>

      {/* <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Send Us a Message</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold mb-1">Your Name</label>
            <input type="text" id="name" name="name" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold mb-1">Your Email</label>
            <input type="email" id="email" name="email" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500" />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-semibold mb-1">Message</label>
            <textarea id="message" name="message" rows="5" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"></textarea>
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">Send Message</button>
        </form>
      </section> */}
    </div>
    </>
    
  );
}

export default ContactUsPage;