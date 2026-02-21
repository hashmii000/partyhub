import React from "react";

const CTASection = () => {
  return (
    <section className="relative h-[420px] flex items-center justify-center">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1513151233558-d860c5398176"
        alt="Party Celebration"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Ready to Celebrate Something Special?
        </h2>

        <p className="text-lg text-white/90 mb-8">
          Let Party Hub turn your ideas into unforgettable celebrations.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-transform shadow-xl">
            Book Your Celebration
          </button>

          <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-black transition-all">
            Get a Free Quote
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
