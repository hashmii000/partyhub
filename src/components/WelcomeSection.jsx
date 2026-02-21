import React from "react";
import { Users, Award, Leaf, Shield, ChefHat, Star } from "lucide-react";
//import spicesImg from "../assets/spicesImg.jpg";

const WelcomeSection = () => {
  return (
    <section className="relative bg-white py-10 md:py-20 overflow-hidden">
      <div className="container mx-auto w-full md:w-[85%] 2xl:w-[75%] px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-24 items-center">
          {/* Left - Images Section */}
          <div className="relative">
            {/* Main large image - top right */}
            <div className="relative ml-auto w-4/5 lg:w-3/4 rounded-3xl backdrop-blur overflow-hidden shadow-2xl z-20 group cursor-pointer">
              <img
                src="https://i.pinimg.com/1200x/47/0b/88/470b880b12036ab6fa0fb2ed5fc976c7.jpg"
                alt="Premium Spices"
                className="w-full h-[400px] object-cover transform transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-transparent group-hover:from-red-600/20 transition-all duration-500"></div>

              {/* Hover overlay */}
              <div className="absolute inset-0  opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500"></div>
              </div>
            </div>

            {/* Floating badge on main image */}
            {/* <div className="absolute top-8 right-8 bg-white rounded-2xl shadow-xl px-3 py-1 z-30 hover:scale-90 transition-transform duration-300 cursor-pointer">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-primary fill-red-600" />
                <div>
                  <p className="text-xs text-gray-500 ">
                    <span className="text-xs text-gray-500"> Premium </span>
                    <span className="text-xs font-bold text-primary">
                      Quality
                    </span>
                  </p>
                </div>
              </div>
            </div> */}

            {/* Small image - bottom left */}
            <div className="absolute bottom-8 left-0 w-3/5 lg:w-1/2 rounded-3xl overflow-hidden shadow-2xl z-30 border-4 border-white group cursor-pointer">
              <img
                src="https://i.pinimg.com/736x/a7/03/7a/a7037a0a92716b528dcd812ea9f34b38.jpg"
                alt="Spice Collection"
                className="w-full h-[250px] object-cover transform transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-transparent group-hover:from-red-600/20 transition-all duration-500"></div>

              {/* Hover overlay */}
              <div className="absolute inset-0  opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500"></div>
              </div>
            </div>

            {/* Decorative circular element */}
            <div className="absolute -bottom-8 -left-8 w-40 h-40 border-4 border-red-600 rounded-full z-10 hover:border-red-700 hover:scale-105 transition-all duration-500 cursor-pointer"></div>
          </div>

          {/* Right - Content Section */}
          {/* Right - Content Section */}
          <div className="relative z-10">
            {/* Label */}
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-0.5 bg-primary"></div>
              <p className="text-primary font-bold text-lg uppercase tracking-wider">
                Early Bird Vendor Launch
              </p>
            </div>

            {/* Main Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-5xl font-[600] text-gray-900 mb-4 leading-tight">
              Grow Your Event Business With
              <br />
              <span className="text-primary">PartyHub Connect</span>
            </h2>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed text-base md:text-lg mb-3 text-justify">
              We are building the go-to event marketplace in this region and onboarding a limited number of high-quality vendors to grow with us.
              Our hybrid Uber + SaaS model helps you increase bookings while reducing marketing uncertainty.
            </p>

            <p className="text-gray-600 leading-relaxed text-base md:text-lg mb-3 text-justify">
              Join now and get 3 Months FREE Pro access, priority exposure, reduced commission, and exclusive Founding Vendor benefits before categories fill.
            </p>

            {/* Feature Points */}
            <div className="space-y-2">
              <FeaturePoint text="Performance-based commission on confirmed bookings only" />
              <FeaturePoint text="Optional Pro ($24.99) & Premium ($49.99) plans for higher visibility" />
              <FeaturePoint text="Cancel anytime. No long-term contracts." />
              <FeaturePoint text="Lock Early Bird pricing before potential increase" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const FeaturePoint = ({ text }) => (
  <div className="flex items-center gap-3">
    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
      <svg
        className="w-4 h-4 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3}
          d="M5 13l4 4L19 7"
        />
      </svg>
    </div>
    <p className="text-gray-700 font-medium">{text}</p>
  </div>
);

export default WelcomeSection;
