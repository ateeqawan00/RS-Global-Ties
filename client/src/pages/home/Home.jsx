import GoldenCards from "../../components/home/GoldenCards";
import HeroCarousel from "../../components/home/HeroCarousel";
import PremiumCards from "../../components/home/PremiumCards";
import HomeTabs from "../../components/home/HomeTabs";
import PremiumSuppliers from "../../components/home/PremiumSuppliers";
import SuccessStories from "../../components/home/SuccessStories";
import OurTeam from "../../components/home/OurTeam";
import { Helmet } from "react-helmet";


const Home = () => {

  return (
    <>
    <Helmet>
        <title>{`Home Page - RSGlobalTies`}</title>
        <meta
          name='description'
          content='Get insights, ratings, and user reviews for various products.'
        />
      </Helmet>
      <HeroCarousel />
      <PremiumCards />
      <GoldenCards />
      <HomeTabs />
      <PremiumSuppliers />
      <SuccessStories />
      {/* <OurTeam /> */}
    </>
  );
};

export default Home;
