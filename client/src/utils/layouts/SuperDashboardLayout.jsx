import { Link, Outlet, useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { IconContext } from "react-icons";
// import { superadminSidebarData } from "../../data/superDashboardSidebarData.js";
import { IoChevronDown } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { logout } from "../../context/userSlice";
import logo from "../../assets/images/logo.png"
import { superadminSidebarData } from "../../data/superDashboardSidebarData.js";


const SuperDashboardLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout());
    navigate('/')
  };

  return (
    <div className="w-full">
      <div className="drawer lg:drawer-open relative ">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col p-8">
          <Outlet />
          <label
            htmlFor="my-drawer-2"
            className="fixed  top-1 left-3 lg:hidden p-2 rounded-md bg-btnprimary"
          >
            <IconContext.Provider value={{ color: "white" }}>
              <RxHamburgerMenu size={20} />
            </IconContext.Provider>
          </label>
        </div>
        <div className="drawer-side scrollbar-hide z-[999]">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-primary text-white">
            <div className="flex items-center justify-center gap-1 mb-4">
              <Link to={'/admin'} className="flex items-center gap-2">
                <img
                  src={logo}
                  alt="logo"
                  className="h-16 object-cover"
                />
                <p className="text-xl font-semibold">RS Global Ties</p>
              </Link>
            </div>
            {superadminSidebarData.map((item, index) =>
              item.type ? (
                <div className="collapse bg-primary text-white " key={index}>
                  <input type="checkbox" />
                  <div className="collapse-title text-sm font-medium flex items-center gap-4 ">
                    {item.title} <IoChevronDown />
                  </div>
                  <div className="collapse-content">
                    {item.subItems.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          onClick={() =>
                            document.getElementById("my-drawer-2").click()
                          }
                          to={subItem.path}
                          className="block p-3 "
                        >
                          {subItem.title}
                        </Link>
                      </li>
                    ))}
                  </div>
                </div>
              ) : (
                <li key={index}>
                  {item.title === "Logout" ? (
                    <button
                      className="h-[50px] flex items-center font-[500] bg-transparent border-none outline-none cursor-pointer"
                      onClick={handleLogout}
                    >
                      {item.title}
                    </button>
                  ) : (
                    <Link
                      className="h-[50px] flex items-center font-[500]"
                      to={item.path}
                      onClick={() =>
                        document.getElementById("my-drawer-2").click()
                      }
                    >
                      {item.title}
                    </Link>
                  )}
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SuperDashboardLayout;