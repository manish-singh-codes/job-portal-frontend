// import React from "react";
// import { Button } from "./ui/button";
// import { Search } from "lucide-react";

// const HeroSection = () => {
//   return (
//     <div className=" text-center">text

//       <div className=" flex flex-col gap-5 my-5">
//         <span className=" mx-auto font-medium bg-gray-100 text-md text-[#22C55E] px-4 py-2 rounded-full ">
//           #1 Job Portal
//         </span>
//         <div>
//           <h1 className=" font-bold text-2xl md:text-5xl">
//             Search, Apply & <br /> Get Your{" "}
//             <span className=" text-[#3b82f6]">Dream Job</span>
//           </h1>
//           <p className="mt-5 text-gray-500">
//           Discover your next career move with confidence and ease. <br />Connect with top recruiters, and take the next step toward your professional success.
//           </p>
//         </div>
//         <div className=" flex md:w-[60%] lg:w-[40%] shadow-lg border border-gray-200 py-2 rounded-full px-5 items-center md:mx-auto mt-10">
//           <input type="text"
//           placeholder="Find your dream job"
//           className=" outline-none border-none w-full h-5 rounded-full" />
//           <Button className=" bg-[#3b82f6] hover:bg-[#3b82f9] rounded-full">
//             <Search  className=" w-5 h-5 text-white font-bold "/>
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroSection;
import React from "react"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-b from-blue-100 to-white py-12 md:py-20 lg:pt-24">
      <div className="container mx-auto px-4 text-center max-w-4xl">
        <span className="inline-block font-medium bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm md:text-base mb-6">
          #1 Job Portal
        </span>

        <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl leading-tight mb-6">
          Search, Apply & <br className="md:hidden" /> Get Your <span className="text-blue-500">Dream Job</span>
        </h1>

        <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Discover your next career move with confidence and ease. Connect with top recruiters, and take the next step
          toward your professional success.
        </p>

        <div className="flex items-center max-w-xl mx-auto bg-white shadow-lg border border-gray-200 rounded-full overflow-hidden">
          <input
            type="text"
            placeholder="Find your dream job"
            className="flex-grow pl-5 text-gray-700 focus:outline-none"
          />
          <Button className="bg-blue-500 hover:bg-blue-600 rounded-r-full">
            <Search className="w-5 h-5 text-white" />
            <span className=" hidden md:inline">Search</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HeroSection

