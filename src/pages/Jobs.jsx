import React from "react";
import FilterCard from "../components/FilterCard";
import Job from "../components/Job";

const Jobs = () => {
  const jobarray = [1, 1, 1, 1, 1, 1];
  return (
    <div>
      <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className=" flex gap-5">
          <div className=" w-[20%]">
            <FilterCard />
          </div>
        {jobarray.length <= 0 ? (
          <span>Job not found</span>
        ) : (
          <div className=" flex-1 h-[88vh] overflow-y-auto pb-5 ">
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {jobarray.map((job, index) => (
                <div key={index} className=" bg-white rounded-lg shadow-md">
                  {" "}
                  <Job />{" "}
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Filter page */}

        {/* Job Card */}
        </div>gi
      </div>
    </div>
  );
};

export default Jobs;
