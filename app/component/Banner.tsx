"use client";

import Link from "next/link";
import {
  FaArrowRight,
  FaRoute,
  FaCompass,
} from "react-icons/fa";

const Banner = () => {
  return (
    <section className="bg-[#fcfdfa] py-16 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* LEFT SIDE: HERO TEXT & CONTENT (lg:col-span-5) */}
        <div className="lg:col-span-5 flex flex-col items-start text-left">
          {/* Badge */}
          <span className="inline-flex items-center gap-1.5 bg-[#e2edd7] text-[#2c541d] px-4 py-1.5 rounded-full text-xs font-bold mb-6">
            🍃 100% Verified Itineraries
          </span>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.15] text-[#133b11] tracking-tight">
            Nature’s Beauty, <br />
            <span className="text-[#519437]">Planned Perfectly.</span>
          </h1>

          {/* Description */}
          <p className="text-gray-600 mt-6 text-base lg:text-lg leading-relaxed max-w-xl">
            Dive into a collection of unique adventure itineraries, budget-friendly road trips, and hidden spots like Sajek Valley shared by real travelers.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-8 w-full sm:w-auto">
            <Link href="/explore">
              <span className="inline-flex items-center gap-2 bg-[#133b11] hover:bg-[#1f4e1c] text-white font-bold px-8 py-3.5 rounded-xl shadow-sm transition-all cursor-pointer text-sm">
                Explore Now
              </span>
            </Link>

            <Link href="/add-item">
              <span className="inline-flex items-center bg-white border border-[#133b11] hover:bg-gray-50 text-[#133b11] font-bold px-8 py-3.5 rounded-xl shadow-sm transition-all cursor-pointer text-sm">
                Question for AI
              </span>
            </Link>
          </div>

          {/* Social Proof / Avatars */}
          <div className="flex items-center gap-3 mt-12 pt-2 border-t border-gray-100 w-full">
            <div className="flex -space-x-3 overflow-hidden">
              <img
                className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
                alt="User"
              />
              <img
                className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
                alt="User"
              />
              <img
                className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
                alt="User"
              />
            </div>
            <p className="text-xs lg:text-sm text-gray-500 font-medium">
              <span className="font-bold text-gray-900">2,500+</span> happy families traveled this week
            </p>
          </div>
        </div>

        {/* RIGHT SIDE: BENTO GRID LAYOUT (lg:col-span-7) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          
          {/* Left Column of Bento */}
          <div className="flex flex-col gap-4">
            {/* Card 1: Top Left (White Bg with Card Content) */}
            <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col justify-between h-[240px]">
              <div className="bg-[#f0f7e7] rounded-2xl h-[140px] w-full overflow-hidden flex items-center justify-center p-4">
                <img 
                  src="https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg" 
                  alt="Sajek Valley" 
                  className="h-full object-contain rounded-xl hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="mt-3">
                <h3 className="font-extrabold text-gray-900 text-sm">Week's Top Route</h3>
                <p className="text-xs text-gray-500 mt-0.5">Sajek Valley Cloud Escape</p>
              </div>
            </div>

            {/* Card 2: Bottom Left (Solid Soft Green Card) */}
            <div className="bg-[#c3e2b1] rounded-3xl p-6 h-[180px] flex flex-col justify-between">
              <div className="bg-[#a6d391] w-10 h-10 rounded-xl flex items-center justify-center text-[#133b11]">
                <FaRoute className="text-xl" />
              </div>
              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-[#133b11] leading-tight">
                  150+ Eco-Friendly Destinations
                </h3>
              </div>
            </div>
          </div>

          {/* Right Column of Bento */}
          <div className="flex flex-col gap-4">
            {/* Card 3: Top Right (Landscape Image Card) */}
            <div className="bg-white rounded-3xl p-3 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] h-[200px] overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg" 
                alt="Camping" 
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>

            {/* Card 4: Bottom Right (Tall Portrait Image Card) */}
            <div className="bg-white rounded-3xl p-3 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] h-[220px] overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg" 
                alt="Backpacker" 
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Banner;