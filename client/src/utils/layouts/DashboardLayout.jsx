import AnnouncementBar from "../../components/home/AnnouncementBar";
import DashboardNavbar from "../../components/dashboard/DashboardNavbar";

const DashboardLayout = () => {
  return (
    <div className="w-full">
      <AnnouncementBar />
      <DashboardNavbar />
      {/* OUTLET INSIDE NAVBAR  */}
    </div>
  );
};

export default DashboardLayout;
