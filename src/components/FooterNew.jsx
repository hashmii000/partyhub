import React from "react";
import {
  ChevronDown,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from "lucide-react";
import logo from "../assets/party-hub-logo.png";
import { Link } from "react-router-dom";

const FooterNew = () => {
  return (
    <footer className="relative bg-gray-900 text-white pt-20">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
        alt="Party Background"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content */}
      <div className="relative z-10 w-full md:w-[85%] 2xl:w-[75%] mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-10 flex justify-between">

          {/* BRAND */}
          <div>
            <div className=" mb-4">
              <img
                src={logo}
                alt="Colgo Foods"
                className="h-24 w-auto cursor-pointer"
              />
            </div>
            <p className="text-gray-300 leading-relaxed">
              We specialize in creating unforgettable celebrations. From
              birthdays to corporate events, we handle everything with style
              and perfection.
            </p>
          </div>
        

          {/* CONTACT */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
            <ul className=" space-y-3 text-gray-300">
              <a href="https://maps.app.goo.gl/62Tb9PheypJ42DKx9" target="_blank" rel="noopener noreferrer"><li className="flex items-center gap-2"> <MapPin className="w-5 h-5 text-white-700 mt-1" />  City, Canada</li></a>
              <a href="tel:+1 (416) 802-3794"><li className="flex items-center gap-2"> <Phone className="w-5 h-5 text-white-700" />+1 (416) 802-3794</li></a>
              <a href="mailto:partyhuboffice@gmail.com"> <li className="flex items-center gap-2"><Mail className="w-5 h-5 text-white-700" /> partyhuboffice@gmail.com</li></a>
            </ul>

            {/* Social Icons */}
            <div className="flex gap-3 pt-4">
              <a
                href="#"
                className="group bg-white text-red-700 hover:bg-red-700 hover:text-white
                          p-2 rounded transition-all duration-300
                          hover:shadow-[0_0_12px_rgba(255,255,255,0.9)]"
              >
                <Facebook size={20} />
              </a>

              <a
                href="#"
                className="group bg-white text-red-700 hover:bg-red-700 hover:text-white
                          p-2 rounded transition-all duration-300
                          hover:shadow-[0_0_12px_rgba(255,255,255,0.9)]"
              >
                <Instagram size={20} />
              </a>

              <a
                href="#"
                className="group bg-white text-red-700 hover:bg-red-700 hover:text-white
                          p-2 rounded transition-all duration-300
                          hover:shadow-[0_0_12px_rgba(255,255,255,0.9)]"
              >
                <Linkedin size={20} />
              </a>

              <a
                href="#"
                className="group bg-white text-red-700 hover:bg-red-700 hover:text-white
                          p-2 rounded transition-all duration-300
                          hover:shadow-[0_0_12px_rgba(255,255,255,0.9)]"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/20 mt-16 py-6 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} Party Hub. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default FooterNew;
