import { Link } from "react-router-dom"
import {
  FaThreads,
  FaInstagram,
  FaFacebook,
  FaXTwitter,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa6"

const Footer = () => {
  return (
    <div className="w-full flex items-center justify-center bg-primary p-8">
      <div className="flex flex-col items-center gap-6">
        <div className="flex text-nowrap flex-wrap 300px:flex-nowrap items-center gap-6 text-white font-medium text-[1rem]">
          <Link to={"/"}>Home</Link>
          <Link to={"/contact"}>Contact</Link>
          <Link to={"/privacy-policy"}>Privacy Policy</Link>
          <Link to={"/services"}>Services</Link>
        </div>
        <div className="flex flex-wrap gap-3">
          <FaThreads size={25} fill="#fff" />
          <FaInstagram size={25} fill="#fff" />
          <FaFacebook size={25} fill="#fff" />
          <FaXTwitter size={25} fill="#fff" />
          <FaLinkedin size={25} fill="#fff" />
          <FaYoutube size={25} fill="#fff" />
        </div>
      </div>
    </div>
  )
}

export default Footer

{
  /*
<div className="w-full flex items-center justify-center bg-primary p-8">
      <div className="flex flex-col items-center gap-6">
        <div className="flex text-nowrap flex-wrap 300px:flex-nowrap items-center gap-6 text-white font-medium text-[1rem]">
          <Link to={"/"}>Home</Link>
          <Link to={"/contact"}>Contact</Link>
          <Link to={"/privacy-policy"}>Privacy Policy</Link>
          <Link to={"/services"}>Services</Link>
        </div>
        <div className="flex flex-wrap gap-3">
          <FaThreads size={25} fill="#fff" />
          <FaInstagram size={25} fill="#fff" />
          <FaFacebook size={25} fill="#fff" />
          <FaXTwitter size={25} fill="#fff" />
          <FaLinkedin size={25} fill="#fff" />
          <FaYoutube size={25} fill="#fff" />
        </div>
      </div>
    </div>
*/
}
