import React, { useState } from "react";
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
import { Link, Links } from "react-router-dom";

const Footer = () => {
  const [openProduct, setOpenProduct] = useState(false);
  const [openGallery, setOpenGallery] = useState(false);

  return (
    <footer className="bg-primary text-white relative">
      {/* Semicircle Logo Container - Centered at Top */}
      <div className="absolute left-1/2 transform -translate-x-1/2 -top-12 z-10">
        <div className="bg-primary rounded-t-full px-8 pt-6 pb-4">
          <Link to="/">
            <img
              src={logo}
              alt="Colgo Foods"
              className="h-24 w-auto cursor-pointer"
            />
          </Link>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="w-full md:w-[85%] 2xl:w-[75%] mx-auto px-4 sm:px-6 pt-20 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* About Us Section */}
          <div className="space-y-4">
            <Link to="/about" className="block">
              <h3 className="text-xl font-semibold mb-4 hover:text-red-200 transition-colors">
                About Us
              </h3>
              <p className="text-sm leading-relaxed text-white/90 text-justify hover:text-red-200 transition-colors">
                Party Hub is your ultimate destination for organizing flawless events. From intimate birthday parties to extravagant corporate functions, we bring creativity, precision, and fun together. 
              </p>
            </Link>
            {/* Social Media Icons */}
            <div className="flex gap-3 pt-4">
              <a
                href="https://www.facebook.com"
                className="group bg-white text-red-700 hover:bg-red-700 hover:text-white
               p-2 rounded transition-all duration-300
               hover:shadow-[0_0_12px_rgba(255,255,255,0.9)]"
              >
                <Facebook size={20} />
              </a>

              <a
                href="https://www.instagram.com"
                className="group bg-white text-red-700 hover:bg-red-700 hover:text-white
               p-2 rounded transition-all duration-300
               hover:shadow-[0_0_12px_rgba(255,255,255,0.9)]"
              >
                <Instagram size={20} />
              </a>

              <a
                href="https://www.linkedin.com"
                className="group bg-white text-red-700 hover:bg-red-700 hover:text-white
               p-2 rounded transition-all duration-300
               hover:shadow-[0_0_12px_rgba(255,255,255,0.9)]"
              >
                <Linkedin size={20} />
              </a>

              <a
                href="https://www.youtube.com/"
                className="group bg-white text-red-700 hover:bg-red-700 hover:text-white
               p-2 rounded transition-all duration-300
               hover:shadow-[0_0_12px_rgba(255,255,255,0.9)]"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-red-200 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="hover:text-red-200 transition-colors"
                >
                  About Us
                </a>
              </li>
              <li className="relative">
                <div className="flex items-center gap-1">
                  <a
                    href="/products"
                    className="hover:text-red-200 transition-colors"
                  >
                    Products
                  </a>

                  {/* Chevron → dropdown toggle */}
                  <button
                    type="button"
                    onClick={() => {
                      setOpenProduct(!openProduct);
                      setOpenGallery(false);
                    }}
                    className="p-1 hover:text-red-200 transition-colors"
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${openProduct ? "rotate-180" : ""
                        }`}
                    />
                  </button>
                </div>

                {/* Dropdown */}
                {openProduct && (
                  <ul className="mt-2 ml-3 space-y-2 text-sm text-white/90">
                    <li>
                      <a href="/products" className="hover:text-red-200">
                        Grounded Spices
                      </a>
                    </li>
                    <li>
                      <a href="/ProductBlended" className="hover:text-red-200">
                        Blended Spices
                      </a>
                    </li>
                  </ul>
                )}
              </li>

              <li className="relative">
                <div className="flex items-center gap-1">
                  <a
                    href="/Gallery"
                    className="hover:text-red-200 transition-colors"
                  >
                    Gallery
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setOpenGallery(!openGallery);
                      setOpenProduct(false);
                    }}
                    className="flex items-center gap-1 hover:text-red-200 transition-colors"
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${openGallery ? "rotate-180" : ""
                        }`}
                    />
                  </button>
                </div>
                {openGallery && (
                  <ul className="mt-2 ml-2 space-y-2 text-sm text-white/90">
                    <li>
                      <a href="/News" className="hover:text-red-200">
                        News
                      </a>
                    </li>
                    <li>
                      <a href="/Event" className="hover:text-red-200">
                        Events
                      </a>
                    </li>
                    <li>
                      <a href="/Media" className="hover:text-red-200">
                        Media
                      </a>
                    </li>
                    <li>
                      <a href="/WeCare" className="hover:text-red-200">
                        We Care
                      </a>
                    </li>
                  </ul>
                )}
              </li>

              <li>
                <a
                  href="/infrastructure"
                  className="hover:text-red-200 transition-colors"
                >
                  Infrastructure
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  className="hover:text-red-200 transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="/packing"
                  className="hover:text-red-200 transition-colors"
                >
                  Packing
                </a>
              </li>

              <li>
                <a
                  href="/contact"
                  className="hover:text-red-200 transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Products Section */}
          <div>
            <Link to="/products">
              <h3 className="text-xl font-semibold mb-4 hover:text-red-200 transition-colors cursor-pointer">
                Our Products
              </h3>
            </Link>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/products"
                  className="hover:text-red-200 transition-colors"
                >
                  Whole Spices
                </a>
              </li>
              <li>
                <a
                  href="/products"
                  className="hover:text-red-200 transition-colors"
                >
                  Ground Masalas
                </a>
              </li>
              <li>
                <a
                  href="/ProductBlended"
                  className="hover:text-red-200 transition-colors"
                >
                  Blended Masalas
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-200 transition-colors">
                  Kitchen King Masala
                </a>
              </li>
              <li>
                <a
                  href="/ProductBlended"
                  className="hover:text-red-200 transition-colors"
                >
                  Garam Masala
                </a>
              </li>
              <li>
                <a
                  href="/ProductBlended"
                  className="hover:text-red-200 transition-colors"
                >
                  Chaat Masala
                </a>
              </li>
              <li>
                <a
                  href="/products"
                  className="hover:text-red-200 transition-colors"
                >
                  Turmeric Powder
                </a>
              </li>
              <li>
                <a
                  href="/products"
                  className="hover:text-red-200 transition-colors"
                >
                  Red Chilli Powder
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <Link to="/contact">
              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            </Link>
            <div className="space-y-3 text-sm">
              {/* Phone */}
              <p className="flex items-center gap-2 pt-2">
                <Phone className="w-5 h-5 text-white-700" />
                <a
                  href="tel:+1 (416) 802-3794"
                  className="hover:text-red-200 transition-colors"
                >
                  +1 (416) 802-3794
                </a>
              </p>

              {/* Email */}
              <p className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-white-700" />
                <a
                  href="mailto:info@ktpuremasale.com"
                  className="hover:text-red-200 transition-colors"
                >
                 partyhuboffice@gmail.com
                </a>
              </p>
              {/* Address */}
              <p className="flex items-start gap-2 leading-relaxed">
                <MapPin className="w-5 h-5 text-white-700 mt-1" />
                <a href="https://maps.app.goo.gl/5g1q3iPWu9usZR756" target="_blank">
                  <span>
                    1090, gomti nagar
                    <br />
                    Uttar Pradesh-271502 India
                  </span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-red-800">
        <div className="w-full md:w-[85%] 2xl:w-[75%] mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-sm text-white/90">
            <p className="text-center md:text-left">
              Party Hub © 2025. All Rights Reserved.
            </p>
            <p className="text-center md:text-right">
              Designed & Developed by{" "}
              <a
                href="http://auctech.in" target="_blank"
                className="hover:text-red-200 transition-colors font-medium"
              >
                Auctech Marcom Pvt. Ltd.
              </a>

            </p>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
