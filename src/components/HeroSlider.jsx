import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PreLaunchModal from "./PreLaunchForm/PreLaunchModal";


const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);


  const slides = [
    {
      id: 1,
      img: "https://i.pinimg.com/736x/84/ef/5e/84ef5e54563547c146e58989385c1778.jpg",
      subtitle: "Early Bird Vendor Launch – Limited Spots",
      title: "Become a Founding Vendor on PartyHub Connect",
      text: "Get 3 Months FREE Pro access, priority search ranking, reduced commission, and exclusive Founding Vendor badge before categories fill.",
    },
    {
      id: 2,
      img: "https://i.pinimg.com/1200x/0d/14/6c/0d146c954d83ccebac7fd97780ae8c98.jpg",
      subtitle: "Grow Faster With Our Marketplace",
      title: "Uber + SaaS Hybrid Model for Event Vendors",
      text: "Earn from confirmed bookings only. Optional subscription unlocks higher visibility, lower commission, and powerful analytics.",
    },
    {
      id: 3,
      img: "https://i.pinimg.com/736x/61/27/de/6127de3f2f0f107e6c07c30d1a4d6fe3.jpg",
      subtitle: "Performance-Based. Transparent. Scalable.",
      title: "No Contracts. Cancel Anytime.",
      text: "Free Basic listing available. Upgrade to Pro or Premium for maximum exposure and commission benefits.",
    }
  ];


  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);

  return (
    <section className="relative w-full h-[500px] md:h-[650px] lg:h-[650px] overflow-hidden bg-gray-900">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === current ? "opacity-100 scale-100" : "opacity-0 scale-110"
            }`}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${slide.img})`,
            }}
          ></div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>

          {/* Content */}
          <div className="relative h-full flex items-center">
            <div className="container w-full md:w-[85%] 2xl:w-[75%] mx-auto px-4 ">
              <div className="max-w-3xl">
                <div
                  className={`transition-all duration-1000 delay-200 ${index === current
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-12"
                    }`}
                >
                  {/* Hindi Subtitle */}
                  <div className="flex">
                    <h5 className="flex items-center text-white text-lg md:text-xl lg:!text-base mb-4 tracking-wide rounded-[4px] bg-white/10 px-[10px] py-[8px] relative overflow-hidden">
                      <img
                        className="mr-2 filter brightness-0 invert w-[22px] shrink-0"
                        src="sub-logo1.svg"
                        alt="icon"
                      />
                      <span>{slide.subtitle}</span>
                    </h5>
                  </div>

                  {/* Main Title */}
                  <h1 className="text-white text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-[600] mb-6 leading-tight">
                    {slide.title.split(" ").map((word, i) => (
                      <span key={i}>
                        {word === "Indian" ||
                          word === "Masalas" ||
                          word === "Trust" ||
                          word === "Perfection" ? (
                          <span className="text-primary">{word} </span>
                        ) : (
                          word + " "
                        )}
                      </span>
                    ))}
                  </h1>

                  {/* Description */}
                  <p className="text-gray-200 text-base md:text-lg lg:text-xl leading-relaxed mb-8 max-w-2xl tracking-wide">
                    {slide.text}
                  </p>

                  {/* CTA Button */}
                  <button
                    className="group bg-primary hover:bg-primary text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl inline-flex items-center gap-3 tracking-wide cursor-pointer"
                    onClick={() => setOpenModal(true)}

                  >
                    <span className="text-base md:text-lg">
                     Apply as Founding Vendor
                    </span>
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform cursor-pointer" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <div className="absolute bottom-8 right-8 flex items-center gap-3 z-20">
        {/* Previous Button */}
        <button
          onClick={prevSlide}
          className="group bg-white/20 backdrop-blur-md hover:bg-primary w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-lg"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6 md:w-7 md:h-7 transform group-hover:-translate-x-0.5 transition-transform" />
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="group bg-white/20 backdrop-blur-md hover:bg-primary w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-lg"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-6 h-6 md:w-7 md:h-7 transform group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`transition-all duration-300 rounded-full ${index === current
              ? "bg-red-600 w-8 h-2"
              : "bg-white/50 hover:bg-white/80 w-2 h-2"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
      {openModal && <PreLaunchModal onClose={() => setOpenModal(false)} />}

    </section>
  );
};

export default HeroSlider;
