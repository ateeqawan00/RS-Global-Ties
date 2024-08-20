import AnnouncementBar from "../../components/home/AnnouncementBar";
import Navbar from "../../components/home/Navbar";
import Footer from "../../components/home/Footer";

const HomepageLayout = () => {

  

  return (
    <div className="w-full">
      <AnnouncementBar />
      <Navbar />
      <Footer />
    </div>
  );
};

export default HomepageLayout;
