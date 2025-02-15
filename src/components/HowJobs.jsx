import React from 'react'
import { Search, Clock, UserCheck } from "lucide-react"

const HowJobs = () => {
  return (
    <div>
         <div className="bg-[url(./assets/applybg.png)] py-16 px-4 mt-5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#ff3366] font-medium mb-4">APPLY PROCESS</p>
          <h2 className="text-white text-4xl md:text-5xl font-bold">How it works</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          {/* Search a job */}
          <div className="space-y-4 bg-[#193281] px-5 py-5 ">
            <div className="w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-white text-xl font-semibold">1. Search a job</h3>
            <p className="text-gray-400">
              Sorem spsum dolor sit amsectetur adipisclit, seddo eiusmod tempor incididunt ut laborea.
            </p>
          </div>

          {/* Apply for job */}
          <div className="space-y-4 bg-[#193281] px-5 py-5 ">
            <div className="w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-white text-xl font-semibold">2. Apply for job</h3>
            <p className="text-gray-400">
              Sorem spsum dolor sit amsectetur adipisclit, seddo eiusmod tempor incididunt ut laborea.
            </p>
          </div>

          {/* Get your job */}
          <div className="space-y-4 bg-[#193281] px-5 py-5">
            <div className="w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center">
              <UserCheck className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-white text-xl font-semibold">3. Get your job</h3>
            <p className="text-gray-400">
              Sorem spsum dolor sit amsectetur adipisclit, seddo eiusmod tempor incididunt ut laborea.
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default HowJobs