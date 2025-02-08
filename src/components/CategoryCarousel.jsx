import React, { useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from "lucide-react";

const categories = [
    "Software Engineer",
    "Web Developer",
    "Python Developer",
    "Java Developer",
    "Data Scientist",
    "UI/UX Designer",
    "DevOps Engineer",
    "Full Stack Developer",
  ];

const CategoryCarousel = () => {

    const carouselRef = useRef(null);

    const scrollLeft = () => {
      if (carouselRef.current) {
        carouselRef.current.scrollBy({ left: -200, behavior: "smooth" });
      }
    };
  
    const scrollRight = () => {
      if (carouselRef.current) {
        carouselRef.current.scrollBy({ left: 200, behavior: "smooth" });
      }
    };
  
    return (
      <div className="relative max-w-7xl mx-auto overflow-hidden">
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md"
        >
          <ChevronLeft />
        </button>
        <div
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide p-4"
        >
          {categories.map((category, index) => (
            <div
              key={index}
              className="min-w-[150px] p-4 bg-blue-500 text-white text-center rounded-lg shadow-md cursor-pointer"
            >
              {category}
            </div>
          ))}
        </div>
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md"
        >
          <ChevronRight />
        </button>
      </div>
  )
}

export default CategoryCarousel