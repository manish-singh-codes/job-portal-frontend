import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { ArrowDownUp, Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import PropTypes from 'prop-types';

const jobs = [
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

const locations = [
  { value: "remote", label: "Remote" },
  { value: "jaipur", label: "Jaipur" },
  { value: "minneapolis", label: "Minneapolis" },
  // Add more locations as needed
]

const industries = [
  { value: "technology", label: "Technology" },
  { value: "finance", label: "Finance" },
  { value: "retail", label: "Retail" },
  // Add more industries as needed
]

const salaryRanges = [
  { value: "0-50k", label: "0LPA - 5LPA" },
  { value: "50k-100k", label: "5LPA - 10LPA" },
  { value: "100k+", label: "10+LPA" },
]

const Combobox = ({ options, placeholder }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
          {value ? options.find((option) => option.value === value)?.label : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={`Search ${placeholder.toLowerCase()}...`} />
          <CommandList>
            <CommandEmpty>No {placeholder.toLowerCase()} found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === option.value ? "opacity-100" : "opacity-0")} />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

Combobox.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  placeholder: PropTypes.string.isRequired,
};



const Jobs = () => {
  const [selectedJob, setSelectedJob] = useState(jobs[0]);
  const smallScreen = useMediaQuery({ query: "(max-width: 768px)" });
  const navigate = useNavigate()

  const handleJobClick = (job) =>{
    setSelectedJob(job)
    if(smallScreen){
      setTimeout(() => {
        navigate(`/jobs/${job.id}`)
      }, 200);
    }
  }

  return (
    <div className=" bg-gray-50 min-w-7xl mx-auto h-screen flex flex-col">
      {/* Header */}
      <header className=" border-b w-full overflow-x-scroll md:overflow-x-visible text-xs md:text-sm ">
        <div className="container mx-auto py-4">
          <div className="flex items-center gap-4">
            <Button className=" bg-[#22C55E] hover:bg-green-600 text-white flex justify-between" options={locations} placeholder="none" >
              <span>Salary High to Low</span>
              <ArrowDownUp />
            </Button>

            <Combobox options={locations} placeholder="Location" />
            <Combobox options={industries} placeholder="Industry" />
            <Combobox options={salaryRanges} placeholder="Salary Range" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className=" container mx-auto px-4 py-6 flex-1 overflow-y-auto">
        <div className=" grid grid-cols-[1fr] md:grid-cols-[1fr_2fr] h-full gap-6">
          <div className="h-[50%]  ">
            {/* Search bar */}
            <div className="container mx-auto py-6">
              <div className="flex items-center justify-between">
                <input
                  type="text"
                  placeholder="Search for jobs"
                  className="flex-1 border border-gray-200 rounded-l-full px-4 py-2 focus:outline-none"
                  />
                <button className="bg-blue-500 text-white px-4 py-2 rounded-r-full">
                  Search
                </button>
              </div>
            </div>
            {/* Job List */}
            <div className="h-4/5 space-y-4 overflow-y-scroll overscroll-contain ">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  onClick={() => handleJobClick(job)}
                  className={`cursor-pointer rounded-lg border p-4 transition-all hover:border-blue-500 ${
                    selectedJob.id === job.id
                      ? "border-blue-500 bg-white shadow-sm"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <div className="flex gap-4">
                    <div className="h-12 w-12 flex-shrink-0 rounded-lg border">
                      <img
                        src={job.logo || "/placeholder.svg"}
                        alt={job.company}
                        className="h-full w-full object-contain p-2"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-gray-500">Job</div>
                      <h3 className="font-medium text-gray-900">{job.title}</h3>
                      <p className="text-sm text-gray-600">{job.company}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-sm text-gray-500">
                          {job.daysLeft} days left
                        </span>
                        <span className="inline-block rounded-full border px-3 py-1 text-xs">
                          {job.experienceLevel}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Job Details */}
          <div className=" h-[50%] overflow-y-scroll overscroll-contain hidden md:block rounded-lg border border-gray-200 bg-white p-6">
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
              <button className="w-full rounded-md bg-blue-500 py-3 text-white hover:bg-blue-600">
                Apply
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
                    {selectedJob.requirements.map((requirement, index) => (
                    <li key={index}>{requirement}</li>
                  ))}
                    {selectedJob.requirements.map((requirement, index) => (
                    <li key={index}>{requirement}</li>
                  ))}
                    {selectedJob.requirements.map((requirement, index) => (
                    <li key={index}>{requirement}</li>
                  ))}
                    {selectedJob.requirements.map((requirement, index) => (
                    <li key={index}>{requirement}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
