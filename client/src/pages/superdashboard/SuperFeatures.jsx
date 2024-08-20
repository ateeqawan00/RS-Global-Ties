import { Helmet } from "react-helmet"
import FeatureSection from "../../components/superdashboard/FeatureSection"
import UserSubscriptionList from "../../components/superdashboard/UserSubscriptionList"
const Pricing = () => {
  return (
    <>
      <Helmet>
        <title>{`Super Features - RSGlobalTies`}</title>
        <meta
          name='description'
          content='Add Products and services to list on the RSGlobalTies. Get insights, ratings, and user reviews for various products.'
        />
      </Helmet>
      <section className='text-gray-700 body-font overflow-hidden p-8 '>
        <FeatureSection />
        <UserSubscriptionList />
      </section>
    </>
  )
}

export default Pricing
