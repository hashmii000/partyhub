import React, { useState } from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Phone,
  Mail,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import logo from "../assets/party-hub-logo.png";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  return (
    <header className="w-full shadow-md sticky top-0 left-0 z-50 bg-white">

      {/* Main Navbar */}
      <nav className=" bg-white shadow-md">
        <div className="w-full  md:w-[85%] 2xl:w-[75%] mx-auto px-2 md:px-4 flex items-center justify-center py-2">

          {/* Logo */}
          <div className=" flex items-center">
            <div className="w-18 h-18  flex items-center justify-center">
              <Link to="/">
                <img src={logo} alt="" srcSet="" />
              </Link>
            </div>
          </div>

       

       
        </div>

   

       
      </nav>
    </header>
  );
};
export default Navbar;
