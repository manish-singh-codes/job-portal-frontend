import React from "react";
import JobCard from "./JobCard";

const LatestJobs = () => {
  const jobs = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

  return (
    <div className=" w-full">

    <div className=" container mx-auto mt-20 ">
      <h1 className=" text-2xl md:text-4xl font-bold ">
        {" "}
        <span className=" text-[#ef4444] ">Top and Latest</span> Job Openings
      </h1>
      <div className=" mt-5 grid grid-cols-1 md:grid-cols-3  gap-4 px-10 ">
        {jobs.slice(0, 6).map((key, index) => (
          <JobCard />
        ))}
      </div>
    </div>
    </div>
  );
};

export default LatestJobs;
