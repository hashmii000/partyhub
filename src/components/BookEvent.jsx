import React from "react";

const BookEvent = () => {
  return (
    <section className="relative py-10 md:py-20 ">
        {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1513151233558-d860c5398176"
        alt="Party Celebration"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="w-full md:w-[85%] 2xl:w-[75%] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT IMAGE */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1521337581100-8ca9a73a5f79"
              alt="Party Event"
              className="rounded-3xl shadow-2xl w-full h-[520px] object-cover"
            />
            {/* <div className="absolute inset-0 bg-black/30 rounded-3xl"></div> */}
          </div>

          {/* RIGHT FORM */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-10">
            <h2 className="text-4xl font-bold text-gray-800 mb-3">
              Let’s Make Your Event Extraordinary
            </h2>
            <p className="text-gray-600 mb-8">
              Contact us today and start planning your perfect party.
            </p>

            <form className="grid gap-5">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <select
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select Event Type</option>
                <option>Birthday Party</option>
                <option>Corporate Event</option>
                <option>Wedding / Function</option>
                <option>Private Party</option>
              </select>

              <input
                type="date"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <textarea
                rows="4"
                placeholder="Tell us about your event..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              ></textarea>

              <button
                type="submit"
                className="mt-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold py-3 rounded-xl hover:scale-105 transition-transform duration-300 shadow-lg"
              >
                Get Started
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BookEvent;
