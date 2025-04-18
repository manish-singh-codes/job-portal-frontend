import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const JobDescription = () => {
  const Job = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Mobzway Technology",
      location: "Jaipur",
      logo: "https://d8it4huxumps7.cloudfront.net/uploads/images/150x150/67b4d5ac9d3d9_organisation_image-hHSfpEjbjx1835853755AZHph7wtQ9.png?d=200x200",
      daysLeft: 11,
      experienceLevel: "Experienced Professionals",
      updatedDate: "Feb 19, 2025",
      description:
        "Mobzway Technology is hiring for the role of Frontend Developer!",
      responsibilities: [
        "Implementing visual elements and their behaviors with user interactions",
        "Work with both front-end and back-end web developers to build all client-side logic",
        "Bridging the gap between the visual elements and the server-side infrastructure, taking an active role on both sides, and defining how the application looks and functions",
      ],
      requirements: [
        "Strong understanding of JavaScript, its quirks, and workarounds",
        "Practical HTML5, CSS, Node JavaScript experience",
      ],
    },
    {
      id: 2,
      title: "Software Engineer",
      company: "FNZ Group",
      location: "Remote",
      logo: "https://d8it4huxumps7.cloudfront.net/uploads/images/150x150/uploadedManual-67b4596335b91_download__17_.png?d=200x200",
      daysLeft: 12,
      experienceLevel: "Experienced Professionals",
      updatedDate: "Feb 19, 2025",
      description:
        "FNZ Group is looking for a Software Engineer to join our team!",
      responsibilities: [
        "Develop and maintain software applications",
        "Collaborate with cross-functional teams",
        "Write clean, maintainable code",
      ],
      requirements: [
        "3+ years of software development experience",
        "Strong problem-solving skills",
        "Experience with modern development practices",
      ],
    },
    {
      id: 3,
      title: "iOS Engineer",
      company: "Target",
      location: "Minneapolis",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-19%20014353-zaG5RwQO4GYC3sr6KQe8wIl5W3tHcy.png",
      daysLeft: 16,
      experienceLevel: "Experienced Professionals",
      updatedDate: "Feb 19, 2025",
      description:
        "Join Target as an iOS Engineer and help build our next-generation mobile applications!",
      responsibilities: [
        "Build and maintain iOS applications",
        "Implement new features and functionality",
        "Optimize application performance",
      ],
      requirements: [
        "Experience with Swift and iOS development",
        "Understanding of iOS design principles",
        "Knowledge of mobile app architecture",
      ],
    },
    {
      id: 4,
      title: "Frontend Developer",
      company: "Mobzway Technology",
      location: "Jaipur",
      logo: "https://d8it4huxumps7.cloudfront.net/uploads/images/150x150/67b4d5ac9d3d9_organisation_image-hHSfpEjbjx1835853755AZHph7wtQ9.png?d=200x200",
      daysLeft: 11,
      experienceLevel: "Experienced Professionals",
      updatedDate: "Feb 19, 2025",
      description:
        "Mobzway Technology is hiring for the role of Frontend Developer!",
      responsibilities: [
        "Implementing visual elements and their behaviors with user interactions",
        "Work with both front-end and back-end web developers to build all client-side logic",
        "Bridging the gap between the visual elements and the server-side infrastructure, taking an active role on both sides, and defining how the application looks and functions",
      ],
      requirements: [
        "Strong understanding of JavaScript, its quirks, and workarounds",
        "Practical HTML5, CSS, Node JavaScript experience",
      ],
    },
    {
      id: 5,
      title: "Software Engineer",
      company: "FNZ Group",
      location: "Remote",
      logo: "https://d8it4huxumps7.cloudfront.net/uploads/images/150x150/uploadedManual-67b4596335b91_download__17_.png?d=200x200",
      daysLeft: 12,
      experienceLevel: "Experienced Professionals",
      updatedDate: "Feb 19, 2025",
      description:
        "FNZ Group is looking for a Software Engineer to join our team!",
      responsibilities: [
        "Develop and maintain software applications",
        "Collaborate with cross-functional teams",
        "Write clean, maintainable code",
      ],
      requirements: [
        "3+ years of software development experience",
        "Strong problem-solving skills",
        "Experience with modern development practices",
      ],
    },
    {
      id: 6,
      title: "iOS Engineer",
      company: "Target",
      location: "Minneapolis",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-19%20014353-zaG5RwQO4GYC3sr6KQe8wIl5W3tHcy.png",
      daysLeft: 16,
      experienceLevel: "Experienced Professionals",
      updatedDate: "Feb 19, 2025",
      description:
        "Join Target as an iOS Engineer and help build our next-generation mobile applications!",
      responsibilities: [
        "Build and maintain iOS applications",
        "Implement new features and functionality",
        "Optimize application performance",
      ],
      requirements: [
        "Experience with Swift and iOS development",
        "Understanding of iOS design principles",
        "Knowledge of mobile app architecture",
      ],
    },
    {
      id: 7,
      title: "Frontend Developer",
      company: "Mobzway Technology",
      location: "Jaipur",
      logo: "https://d8it4huxumps7.cloudfront.net/uploads/images/150x150/67b4d5ac9d3d9_organisation_image-hHSfpEjbjx1835853755AZHph7wtQ9.png?d=200x200",
      daysLeft: 11,
      experienceLevel: "Experienced Professionals",
      updatedDate: "Feb 19, 2025",
      description:
        "Mobzway Technology is hiring for the role of Frontend Developer!",
      responsibilities: [
        "Implementing visual elements and their behaviors with user interactions",
        "Work with both front-end and back-end web developers to build all client-side logic",
        "Bridging the gap between the visual elements and the server-side infrastructure, taking an active role on both sides, and defining how the application looks and functions",
      ],
      requirements: [
        "Strong understanding of JavaScript, its quirks, and workarounds",
        "Practical HTML5, CSS, Node JavaScript experience",
      ],
    },
    {
      id: 8,
      title: "Software Engineer",
      company: "FNZ Group",
      location: "Remote",
      logo: "https://d8it4huxumps7.cloudfront.net/uploads/images/150x150/uploadedManual-67b4596335b91_download__17_.png?d=200x200",
      daysLeft: 12,
      experienceLevel: "Experienced Professionals",
      updatedDate: "Feb 19, 2025",
      description:
        "FNZ Group is looking for a Software Engineer to join our team!",
      responsibilities: [
        "Develop and maintain software applications",
        "Collaborate with cross-functional teams",
        "Write clean, maintainable code",
      ],
      requirements: [
        "3+ years of software development experience",
        "Strong problem-solving skills",
        "Experience with modern development practices",
      ],
    },
    {
      id: 9,
      title: "iOS Engineer",
      company: "Target",
      location: "Minneapolis",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-19%20014353-zaG5RwQO4GYC3sr6KQe8wIl5W3tHcy.png",
      daysLeft: 16,
      experienceLevel: "Experienced Professionals",
      updatedDate: "Feb 19, 2025",
      description:
        "Join Target as an iOS Engineer and help build our next-generation mobile applications!",
      responsibilities: [
        "Build and maintain iOS applications",
        "Implement new features and functionality",
        "Optimize application performance",
      ],
      requirements: [
        "Experience with Swift and iOS development",
        "Understanding of iOS design principles",
        "Knowledge of mobile app architecture",
      ],
    },
  ];
    
    const [selectedJob, setSelectedJob] = useState(null);
    const params = useParams();
    const [isApplied,setIsApplied] = useState(false)

    useEffect(()=>{
      const job = Job.find((job)=>  job.id === Number(params.id));
        if (job) {
            setSelectedJob(job);
        } else {
            console.error("Job not found");
        }
    },[params.id])
    if (!selectedJob) {
        return <div>Loading...</div>;
    }

    return (
        <div>
        <div className=" max-w-7xl mx-auto rounded-lg border border-gray-200 bg-white p-6 px-3 md:px-20 ">
            <div className="flex items-start gap-4">
              <div className="h-16 w-16 flex-shrink-0 rounded-lg border">
                <img
                  src={selectedJob.logo || "/placeholder.svg"}
                  alt={selectedJob.company}
                  className="h-full w-full object-contain p-2"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedJob.title}
                </h2>
                <p className="text-lg text-gray-600">{selectedJob.company}</p>
                <div className="mt-4 flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-5 w-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="text-gray-600">
                      {selectedJob.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-5 w-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-gray-600">
                      Updated On: {selectedJob.updatedDate}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="rounded-md border border-gray-200 p-2">
                  <svg
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="mt-8">
              <button disabled={isApplied} onClick={()=>setIsApplied(!isApplied)} className="w-full rounded-md bg-blue-500 py-3 text-white hover:bg-blue-600">
                {isApplied ? "Already applied" : "Apply Now"}
              </button>
            </div>

            <div className="mt-8 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Eligibility
                </h3>
                <p className="mt-2 text-gray-600">
                  {selectedJob.experienceLevel}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Job Description
                </h3>
                <p className="mt-2 text-gray-600">{selectedJob.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Responsibilities of the Candidate:
                </h3>
                <ul className="mt-2 list-inside list-disc space-y-2 text-gray-600">
                  {selectedJob.responsibilities.map((responsibility, index) => (
                    <li key={index}>{responsibility}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Requirements:
                </h3>
                <ul className="mt-2 list-inside list-disc space-y-2 text-gray-600">
                  {selectedJob.requirements.map((requirement, index) => (
                    <li key={index}>{requirement}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
    </div>
  )
}

export default JobDescription