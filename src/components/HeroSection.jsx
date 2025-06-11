'use client'

import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-b from-indigo-300 to-white py-12 md:py-20 lg:pt-24">
      <div className="container mx-auto px-4 text-center max-w-7xl">
        <span className="inline-block font-medium bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm md:text-base mb-6">
          #1 Job Portal
        </span>

        <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl leading-tight mb-6">
          Search, Apply & <br className="md:hidden" /> Get Your <span className="text-indigo-500">Dream Job</span>
        </h1>

        <p className="text-gray-600 text-lg md:text-lg max-w-2xl mx-auto mb-10">
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

