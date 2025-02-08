import React from "react";

const HeroSection = () => {
  return (
    <div className=" text-center">
      <div className=" flex flex-col gap-5 my-5">
        <span className=" mx-auto font-medium bg-gray-100 text-md text-[#22C55E] px-4 py-2 rounded-full ">
          #1 Job Portal
        </span>
        <div>
          <h1 className=" font-bold text-2xl md:text-5xl">
            Search, Apply & <br /> Get Your{" "}
            <span className=" text-[#3b82f6]">Dream Job</span>
          </h1>
          <p className="mt-5 text-gray-500">
          Discover your next career move with confidence and ease. <br />Connect with top recruiters, and take the next step toward your professional success.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
