import React from 'react';
import { Helmet } from 'react-helmet';

const PrivacyPolicy = () => {
  return (
    <>
    <Helmet>
        <title>{`Privacy Policy - RSGlobalTies`}</title>
        <meta
          name='description'
          content='RSGlobalTies Policies. Get insights, ratings, and user reviews for various products.'
        />
      </Helmet><div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy for RSGLOBALTIES</h1>
      <p className="mb-4">Effective Date: [Date]</p>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Introduction</h2>
        <p className="mb-4">
          RSGLOBALTIES (“Company”, “we”, “us”, or “our”) respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and store your information when you use our website and associated services (collectively, the “Services”).
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Information We Collect</h2>
        <p className="mb-4">
          We collect different types of information from and about you, including:
        </p>
        <ul className="list-disc pl-4 mb-4">
          <li>Personal Information: This includes information that can be used to identify you, such as your name, email address, postal address, phone number, and IP address.</li>
          <li>Business Information: This includes information about your business, such as your company name, website, and industry.</li>
          <li>Payment Information: If you make a purchase through our Services, we may collect your payment information, such as your credit card number, debit card number, or bank account information.</li>
          <li>Usage Data: We may collect information about how you use our Services, such as the pages you visit, the links you click, and the searches you make.</li>
        </ul>
        <p className="mb-4">
          We use your information for a variety of purposes, including:
        </p>
        <ul className="list-disc pl-4">
          <li>To provide and improve our Services.</li>
          <li>To personalize your experience.</li>
          <li>To send you important information about our Services and changes to our terms and conditions.</li>
          <li>To respond to your inquiries and requests.</li>
          <li>To fulfill orders and requests for products or services.</li>
          <li>To send you marketing and promotional materials, with your consent.</li>
          <li>To analyze how our Services are used and improve our marketing efforts.</li>
          <li>To protect our rights and interests and the rights and interests of third parties.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Sharing Your Information</h2>
        <p className="mb-4">
          We may share your information with third-party service providers who help us with our business operations, such as website hosting, payment processing, and marketing. We will only share your information with these third-party service providers in accordance with this Privacy Policy and applicable laws.
        </p>
        <p className="mb-4">
          We may also disclose your information if required by law or if we believe in good faith that disclosure is reasonably necessary to protect the rights, property, or safety of the Company, our users, or third parties.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Your Choices</h2>
        <p className="mb-4">
          You have the right to access, update, or delete your personal information. You can also opt out of receiving marketing and promotional materials from us. To exercise these rights, please contact us at <a href="mailto:email@example.com" className="text-blue-500">email@example.com</a>.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Data Security</h2>
        <p className="mb-4">
          We take reasonable measures to protect your information from unauthorized access, disclosure, alteration, or destruction. However, no website or internet transmission is completely secure, and we cannot guarantee the security of your information.
        </p>
      </section>
    </div>
    </>
    
  );
}

export default PrivacyPolicy;
