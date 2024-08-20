import { Link } from "react-router-dom";
import logoImg from "../../assets/images/logo.png";
import { CircleFlag } from "react-circle-flags";
import { useSelector } from "react-redux";

const AnnouncementBar = () => {
  const user = useSelector((state) => state.user.user);
  console.log("user in announcement tab: ", user);

  return (
    <div className="bg-[#ecf0fe] hidden font-inter 900px:flex items-center justify-center p-2">
      <div className="flex w-[90%] items-center justify-between ">
        <Link to={"/"}>
          <img src={logoImg} alt="RS-Global Logo Img" className="w-[4rem]" />
        </Link>
        <p className="bg-gradient-to-r from-blue-500 to-red-500 ml-4 text-transparent bg-clip-text font-bold text-[1.2rem]">
          Welcome to the fastest growing B2B Network
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link to={user ? `/dashboard/pricing` : `/pricing`}>
            Subscription Plan
          </Link>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="m-1 flex items-center justify-center gap-2"
            >
              <CircleFlag countryCode="uk" className="h-4" />
              <p>English</p>
            </div>
            {/* <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <div className="flex items-center justify-center gap-2 w-full">
                  <CircleFlag countryCode="sa" className="h-4" />
                  <a>Arabic</a>
                </div>
              </li>
              <li>
                <div className="flex items-center justify-center gap-2 w-full">
                  <CircleFlag countryCode="pk" className="h-4" />
                  <a>Urdu</a>
                </div>
              </li>
            </ul> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
