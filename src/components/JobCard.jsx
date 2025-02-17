'use client';

const JobCard = () => {
  const skills = ["Node", "C++", "Java"];
  return (
    // <div>JobCard</div>
    //     <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-sm mx-auto my-4 transition-transform duration-300 hover:scale-105">
    //     <div className="p-6">
    //       <div className="flex justify-between items-start mb-4">
    //         <div>
    //           <h2 className="text-xl font-bold text-gray-800">Google</h2>
    //           <h3 className="text-lg font-semibold text-gray-700 mt-1">SDE-1</h3>
    //         </div>
    //         <span
    //           className="px-2 py-1 text-sm font-semibold rounded-full"
    //           style={{ backgroundColor: GREEN_COLOR , color: "white" }}
    //         >
    //           Full Time
    //         </span>
    //       </div>
    //       <p className="text-gray-600 mb-4 line-clamp-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit laborum assumenda quas aperiam minus atque possimus, ad voluptates natus earum debitis magni aliquid eum explicabo nulla dolor id dolores fuga.</p>
    //       <div className="flex justify-between items-center mb-4">
    //         <div className="flex items-center">
    //           <svg className="w-5 h-5 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
    //             <path
    //               fillRule="evenodd"
    //               d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.616a1 1 0 01.894-1.79l1.599.8L9 4.323V3a1 1 0 011-1zm-5 8.274l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L5 10.274zm10 0l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L15 10.274z"
    //               clipRule="evenodd"
    //             />
    //           </svg>
    //           <span className="font-semibold text-gray-700">8-12 LPA</span>
    //         </div>
    //         <div
    //           className="px-3 py-1 text-sm font-semibold rounded-full"
    //           style={{ backgroundColor: RED_COLOR, color: "white" }}
    //         >
    //           12 Positions
    //         </div>
    //       </div>
    //       <button
    //         className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out"
    //         style={{ backgroundColor: BLUE_COLOR }}
    //       >
    //         Apply Now
    //       </button>
    //     </div>
    //   </div>
    <div className="bg-blue-50 hover:bg-white rounded-lg border border-gray-100 p-6 hover:shadow-lg transition-shadow">
      {/* Header Section */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex gap-3">
          <img
            src={
              "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png"
            }
            alt={` logo`}
            className="w-12 h-12 rounded-lg"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Google</h3>
            <div className="flex items-center text-gray-500 text-sm">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Gurugram | India
            </div>
          </div>
        </div>
        <svg
          className="w-5 h-5 text-green-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {/* Job Title */}
      <h2 className="text-xl font-bold text-gray-900 mb-3">SDE - 2</h2>

      {/* Job Meta Info */}
      <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
        <div className="flex items-center">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          Full time
        </div>
        <div className="flex items-center">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          1d ago
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 mb-4 line-clamp-2">
        {" "}
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt
        obcaecati quasi ipsa laudantium, cumque impedit id cupiditate nostrum at
        eligendi error. Laboriosam ipsum tempora eligendi dicta dolore, fuga
        minima sequi?{" "}
      </p>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-50 text-gray-600 rounded-md text-sm"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-6">
        <div className="text-blue-600 font-bold">
          ₹8-12 <span className="text-gray-500 font-normal">LPA</span>
        </div>
        <button className="px-6 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors border-2">
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobCard;
