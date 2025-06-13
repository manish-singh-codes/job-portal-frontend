"use client"

import { useState } from "react"
import {
  Briefcase,
  Calendar,
  ChevronRight,
  Download,
  Edit,
  FileText,
  GraduationCap,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Plus,
  User,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UpdateProfile from "../components/UpdateProfile"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "sonner"
import axiosInstance from "../utils/axios/axiosInstance"
import { setUser } from "../redux/authSlice"

// Color constants from the requirements
const GREEN_COLOR = "#22C55E"
const RED_COLOR = "#ef4444"
const BLUE_COLOR = "#3b82f6"

const Profile = () => {
  const [activeTab, setActiveTab] = useState("overview")
  const [open, setOpen] = useState(false)
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  // State for editing the about section
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    bio: user?.profile?.bio || "",
    workExperience: user?.workExperience || [],
    education: user?.overView?.education || [],
    technicalSkills: user?.overView?.technicalSkills || [],
    softSkills: user?.overView?.softSkills || [],
    certifications: user?.overView?.certifications || [],
    resume: user?.profile?.resume || "",
    resumeOriginalName: user?.profile?.resumeOriginalName || "",
  })
  console.log("formData", formData);
  const [workModalOpen, setWorkModalOpen] = useState(false)
  const [educationModalOpen, setEducationModalOpen] = useState(false)
  const [resumeUploadOpen, setResumeUploadOpen] = useState(false)
  const [skillsModalOpen, setSkillsModalOpen] = useState(false)
  const [certificatesModalOpen, setCertificatesModalOpen] = useState(false)
  const [selectedSkillCategory, setSelectedSkillCategory] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      // If the field is workExperience or education, we need to handle it differently
      workExperience: {
        ...prevData.workExperience,
        [name]: value,
      }
    }))
  }

  const handleSubmit = async() =>{
    // Handle form submission logic here
    // For example, you can send the updated data to the server
    console.log("Form submitted:", formData)

    try {
      const res = await axiosInstance.post("/api/user/profile/update", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        }}
      )
      if(res.status === 200) {
        toast.success("Profile updated successfully")
        // Optionally, you can update the user state in Redux or context
         dispatch(setUser(res.data.user))
      }

    } catch (error) {
      console.error("Error updating profile:", error)
      toast.error(error.response?.data?.message || "Failed to update profile")
    }
    setIsEditing(false)
  }

  return (
    <div className="container mx-auto py-6 px-4 md:px-6 max-w-7xl">
      {/* Profile Header */}
      <div className="grid gap-6 md:grid-cols-[1fr_2fr] lg:grid-cols-[300px_1fr]">
        <Card className="border-none shadow-md">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <Avatar
              className="h-24 w-24 border-4"
              style={{ borderColor: BLUE_COLOR }}
            >
              <AvatarImage
                src={user.profile.profilePhoto || "/placeholder.svg"}
                alt="User profile"
              />
              <AvatarFallback className="text-2xl">JD</AvatarFallback>
            </Avatar>
            <h2 className="mt-4 text-2xl font-bold">{user.fullname}</h2>
            <div className="mt-6 w-full">
              <Button
                className="w-full"
                onClick={() => setOpen(true)}
                style={{ backgroundColor: "#9933ff" }}
              >
                <Edit className="mr-2 h-4 w-4" /> Edit Your Profile
              </Button>
            </div>

            <div className="mt-6 w-full grid gap-3">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">john.doe@example.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">San Francisco, CA</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-none shadow-md">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Profile Completion</CardTitle>
                <span className="text-sm font-medium">85%</span>
              </div>
            </CardHeader>
            <CardContent>
              <Progress
                value={85}
                className="h-2"
                style={{ backgroundColor: "rgba(59, 130, 246, 0.2)" }}
              >
                <div
                  className="h-full"
                  style={{ backgroundColor: BLUE_COLOR }}
                ></div>
              </Progress>
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <div
                    className="h-2 w-2 rounded-full mr-2"
                    style={{ backgroundColor: GREEN_COLOR }}
                  ></div>
                  <span>Completed</span>
                </div>
                <div className="flex items-center">
                  <div
                    className="h-2 w-2 rounded-full mr-2"
                    style={{ backgroundColor: RED_COLOR }}
                  ></div>
                  <span>Missing Information</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="outline" className="w-full">
                Complete Your Profile
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader className="pb-3">
              <CardTitle>Job Search Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="text-center p-3 rounded-lg bg-muted">
                  <p
                    className="text-3xl font-bold"
                    style={{ color: BLUE_COLOR }}
                  >
                    12
                  </p>
                  <p className="text-sm text-muted-foreground">Applications</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted">
                  <p
                    className="text-3xl font-bold"
                    style={{ color: GREEN_COLOR }}
                  >
                    4
                  </p>
                  <p className="text-sm text-muted-foreground">Interviews</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted">
                  <p
                    className="text-3xl font-bold"
                    style={{ color: RED_COLOR }}
                  >
                    2
                  </p>
                  <p className="text-sm text-muted-foreground">Rejections</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs
        defaultValue="overview"
        className="mt-8"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="grid grid-cols-4 w-full max-w-3xl">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="resume">Resume</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="mt-6 space-y-6">
          <Card className="border-none shadow-md">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center">
                  <User
                    className="mr-2 h-5 w-5"
                    style={{ color: BLUE_COLOR }}
                  />
                  About Me
                </CardTitle>
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant="ghost"
                  size="sm"
                >
                  {isEditing ? (
                    <Button onClick={handleSubmit} variant="ghost">
                      Save
                    </Button>
                  ) : (
                    <>
                      <Edit className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <textarea
                className="w-full border rounded p-2 text-sm text-muted-foreground resize-none focus:outline-violet-500"
                rows={5}
                value={formData.bio}
                name="bio"
                onChange={handleChange}
                readOnly={!isEditing}
                style={{ backgroundColor: isEditing ? "white" : "transparent" }}
              />
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center">
                  <Briefcase
                    className="mr-2 h-5 w-5"
                    style={{ color: BLUE_COLOR }}
                  />
                  Work Experience
                </CardTitle>
                <Button
                  onClick={() => setWorkModalOpen(true)}
                  variant="ghost"
                  size="sm"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            {formData?.workExperience?.map((work, index) => (
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{work?.designation}</h3>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {" "}
                        {new Date(work?.from).toLocaleDateString("en-US", {
                          month: "long",
                          year: "numeric",
                        })}{" "}
                        -  {" "}
                        {work?.to
                          ? new Date(work.to).toLocaleDateString("en-US", {
                              month: "long",
                              year: "numeric",
                            })
                          : "Present"}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm font-medium">{work.companyName}</p>
                  <p className="text-sm text-muted-foreground">
                    {work?.description}
                  </p>
                </div>

                <Separator />
              </CardContent>
            ))}
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Experience
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center">
                  <GraduationCap
                    className="mr-2 h-5 w-5"
                    style={{ color: BLUE_COLOR }}
                  />
                  Education
                </CardTitle>
                <Button
                  onClick={() => setEducationModalOpen(true)}
                  variant="ghost"
                  size="sm"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <h3 className="font-semibold">Master of Computer Science</h3>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      2015 - 2017
                    </span>
                  </div>
                </div>
                <p className="text-sm font-medium">Stanford University</p>
                <p className="text-sm text-muted-foreground">
                  Specialized in Artificial Intelligence and Machine Learning.
                  GPA: 3.8/4.0
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <h3 className="font-semibold">
                    Bachelor of Science in Computer Engineering
                  </h3>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      2011 - 2015
                    </span>
                  </div>
                </div>
                <p className="text-sm font-medium">MIT</p>
                <p className="text-sm text-muted-foreground">
                  Your List for all semesters. Participated in hackathons and
                  coding competitions. GPA: 3.9/4.0
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Skills Tab */}
        <TabsContent value="skills" className="mt-6">
          <Card className="border-none shadow-md">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Technical Skills</CardTitle>
                <Button variant="ghost" size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>
                Add or update your technical skills to match with relevant job
                opportunities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-2">
                    Programming Languages
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      className="px-3 py-1"
                      style={{ backgroundColor: BLUE_COLOR }}
                    >
                      JavaScript
                    </Badge>
                    <Badge
                      className="px-3 py-1"
                      style={{ backgroundColor: BLUE_COLOR }}
                    >
                      TypeScript
                    </Badge>
                    <Badge
                      className="px-3 py-1"
                      style={{ backgroundColor: BLUE_COLOR }}
                    >
                      Python
                    </Badge>
                    <Badge
                      className="px-3 py-1"
                      style={{ backgroundColor: BLUE_COLOR }}
                    >
                      Java
                    </Badge>
                    <Badge
                      className="px-3 py-1"
                      style={{ backgroundColor: BLUE_COLOR }}
                    >
                      C++
                    </Badge>
                    <Badge
                      variant="outline"
                      className="px-3 py-1 cursor-pointer"
                      onClick={() => {
                        setSelectedSkillCategory("Programming Languages");
                        setSkillsModalOpen(true);
                      }}
                    >
                      + Add
                    </Badge>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">
                    Frameworks & Libraries
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      className="px-3 py-1"
                      style={{ backgroundColor: GREEN_COLOR }}
                    >
                      React
                    </Badge>
                    <Badge
                      className="px-3 py-1"
                      style={{ backgroundColor: GREEN_COLOR }}
                    >
                      Node.js
                    </Badge>
                    <Badge
                      className="px-3 py-1"
                      style={{ backgroundColor: GREEN_COLOR }}
                    >
                      Express
                    </Badge>
                    <Badge
                      className="px-3 py-1"
                      style={{ backgroundColor: GREEN_COLOR }}
                    >
                      Next.js
                    </Badge>
                    <Badge
                      className="px-3 py-1"
                      style={{ backgroundColor: GREEN_COLOR }}
                    >
                      Django
                    </Badge>
                    <Badge
                      variant="outline"
                      className="px-3 py-1 cursor-pointer"
                      onClick={() => {
                        setSelectedSkillCategory("Frameworks & Libraries");
                        setSkillsModalOpen(true);
                      }}
                    >
                      + Add
                    </Badge>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">
                    Tools & Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      className="px-3 py-1"
                      style={{ backgroundColor: BLUE_COLOR }}
                    >
                      Git
                    </Badge>
                    <Badge
                      className="px-3 py-1"
                      style={{ backgroundColor: BLUE_COLOR }}
                    >
                      Docker
                    </Badge>
                    <Badge
                      className="px-3 py-1"
                      style={{ backgroundColor: BLUE_COLOR }}
                    >
                      AWS
                    </Badge>
                    <Badge
                      className="px-3 py-1"
                      style={{ backgroundColor: BLUE_COLOR }}
                    >
                      CI/CD
                    </Badge>
                    <Badge
                      className="px-3 py-1"
                      style={{ backgroundColor: BLUE_COLOR }}
                    >
                      MongoDB
                    </Badge>
                    <Badge
                      variant="outline"
                      className="px-3 py-1 cursor-pointer"
                      onClick={() => {
                        setSelectedSkillCategory("Tools & Technologies");
                        setSkillsModalOpen(true);
                      }}
                    >
                      + Add
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* <Card className="border-none shadow-md mt-6">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Soft Skills</CardTitle>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Team Leadership</span>
                    <span className="text-sm">Expert</span>
                  </div>
                  <Progress value={90} className="h-2" style={{ backgroundColor: "rgba(34, 197, 94, 0.2)" }}>
                    <div className="h-full" style={{ backgroundColor: GREEN_COLOR }}></div>
                  </Progress>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Problem Solving</span>
                    <span className="text-sm">Expert</span>
                  </div>
                  <Progress value={95} className="h-2" style={{ backgroundColor: "rgba(34, 197, 94, 0.2)" }}>
                    <div className="h-full" style={{ backgroundColor: GREEN_COLOR }}></div>
                  </Progress>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Communication</span>
                    <span className="text-sm">Advanced</span>
                  </div>
                  <Progress value={85} className="h-2" style={{ backgroundColor: "rgba(34, 197, 94, 0.2)" }}>
                    <div className="h-full" style={{ backgroundColor: GREEN_COLOR }}></div>
                  </Progress>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Time Management</span>
                    <span className="text-sm">Advanced</span>
                  </div>
                  <Progress value={80} className="h-2" style={{ backgroundColor: "rgba(34, 197, 94, 0.2)" }}>
                    <div className="h-full" style={{ backgroundColor: GREEN_COLOR }}></div>
                  </Progress>
                </div>
              </div>
            </CardContent>
          </Card> */}

          <Card className="border-none shadow-md mt-6">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Certifications</CardTitle>
                <Button variant="ghost" size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-lg border">
                  <div>
                    <h3 className="font-medium">
                      AWS Certified Solutions Architect
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Amazon Web Services
                    </p>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Expires: Dec 2024</span>
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 rounded-lg border">
                  <div>
                    <h3 className="font-medium">
                      Google Cloud Professional Developer
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Google Cloud
                    </p>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Expires: Aug 2023</span>
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 rounded-lg border">
                  <div>
                    <h3 className="font-medium">Certified Scrum Master</h3>
                    <p className="text-sm text-muted-foreground">
                      Scrum Alliance
                    </p>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Expires: Mar 2025</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setCertificatesModalOpen(true)}
              >
                Add New Certification
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Applications Tab */}
        <TabsContent value="applications" className="mt-6">
          <Card className="border-none shadow-md">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Job Applications</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    Sort
                  </Button>
                </div>
              </div>
              <CardDescription>
                Track the status of your job applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg border hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">
                        Senior Frontend Developer
                      </h3>
                      <p className="text-sm">
                        TechGiant Inc. • San Francisco, CA
                      </p>
                    </div>
                    <Badge style={{ backgroundColor: GREEN_COLOR }}>
                      Interview
                    </Badge>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-muted-foreground mb-2">
                      <span>Application Progress</span>
                      <span>3/5 steps</span>
                    </div>
                    <Progress
                      value={60}
                      className="h-2"
                      style={{ backgroundColor: "rgba(34, 197, 94, 0.2)" }}
                    >
                      <div
                        className="h-full"
                        style={{ backgroundColor: GREEN_COLOR }}
                      ></div>
                    </Progress>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Applied: May 15, 2023</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      View Details <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="p-4 rounded-lg border hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">Full Stack Engineer</h3>
                      <p className="text-sm">StartupXYZ • Remote</p>
                    </div>
                    <Badge style={{ backgroundColor: BLUE_COLOR }}>
                      Applied
                    </Badge>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-muted-foreground mb-2">
                      <span>Application Progress</span>
                      <span>1/5 steps</span>
                    </div>
                    <Progress
                      value={20}
                      className="h-2"
                      style={{ backgroundColor: "rgba(59, 130, 246, 0.2)" }}
                    >
                      <div
                        className="h-full"
                        style={{ backgroundColor: BLUE_COLOR }}
                      ></div>
                    </Progress>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Applied: May 20, 2023</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      View Details <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="p-4 rounded-lg border hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">DevOps Engineer</h3>
                      <p className="text-sm">
                        CloudSolutions Ltd. • New York, NY
                      </p>
                    </div>
                    <Badge style={{ backgroundColor: RED_COLOR }}>
                      Rejected
                    </Badge>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-muted-foreground mb-2">
                      <span>Application Progress</span>
                      <span>2/5 steps</span>
                    </div>
                    <Progress
                      value={40}
                      className="h-2"
                      style={{ backgroundColor: "rgba(239, 68, 68, 0.2)" }}
                    >
                      <div
                        className="h-full"
                        style={{ backgroundColor: RED_COLOR }}
                      ></div>
                    </Progress>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Applied: May 5, 2023</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      View Details <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="p-4 rounded-lg border hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">Software Engineer II</h3>
                      <p className="text-sm">InnoTech • Austin, TX</p>
                    </div>
                    <Badge style={{ backgroundColor: GREEN_COLOR }}>
                      Final Interview
                    </Badge>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-muted-foreground mb-2">
                      <span>Application Progress</span>
                      <span>4/5 steps</span>
                    </div>
                    <Progress
                      value={80}
                      className="h-2"
                      style={{ backgroundColor: "rgba(34, 197, 94, 0.2)" }}
                    >
                      <div
                        className="h-full"
                        style={{ backgroundColor: GREEN_COLOR }}
                      ></div>
                    </Progress>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Applied: April 28, 2023</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      View Details <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Applications
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-none shadow-md mt-6">
            <CardHeader>
              <CardTitle>Application Insights</CardTitle>
              <CardDescription>
                Statistics and insights about your job applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 rounded-lg bg-muted">
                  <p
                    className="text-3xl font-bold"
                    style={{ color: BLUE_COLOR }}
                  >
                    12
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Total Applications
                  </p>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted">
                  <p
                    className="text-3xl font-bold"
                    style={{ color: GREEN_COLOR }}
                  >
                    4
                  </p>
                  <p className="text-sm text-muted-foreground">Interviews</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted">
                  <p
                    className="text-3xl font-bold"
                    style={{ color: RED_COLOR }}
                  >
                    2
                  </p>
                  <p className="text-sm text-muted-foreground">Rejections</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted">
                  <p
                    className="text-3xl font-bold"
                    style={{ color: BLUE_COLOR }}
                  >
                    6
                  </p>
                  <p className="text-sm text-muted-foreground">Pending</p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-medium mb-2">
                  Application Timeline
                </h3>
                <div className="relative pt-6">
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-muted ml-2.5"></div>

                  <div className="relative pl-8 pb-6">
                    <div
                      className="absolute left-0 rounded-full w-5 h-5 flex items-center justify-center"
                      style={{ backgroundColor: GREEN_COLOR }}
                    >
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">
                        Interview Scheduled: TechGiant Inc.
                      </p>
                      <p className="text-muted-foreground">
                        May 25, 2023 at 2:00 PM
                      </p>
                    </div>
                  </div>

                  <div className="relative pl-8 pb-6">
                    <div
                      className="absolute left-0 rounded-full w-5 h-5 flex items-center justify-center"
                      style={{ backgroundColor: BLUE_COLOR }}
                    >
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">
                        Application Submitted: StartupXYZ
                      </p>
                      <p className="text-muted-foreground">May 20, 2023</p>
                    </div>
                  </div>

                  <div className="relative pl-8 pb-6">
                    <div
                      className="absolute left-0 rounded-full w-5 h-5 flex items-center justify-center"
                      style={{ backgroundColor: GREEN_COLOR }}
                    >
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">Final Interview: InnoTech</p>
                      <p className="text-muted-foreground">
                        May 18, 2023 at 10:00 AM
                      </p>
                    </div>
                  </div>

                  <div className="relative pl-8">
                    <div
                      className="absolute left-0 rounded-full w-5 h-5 flex items-center justify-center"
                      style={{ backgroundColor: RED_COLOR }}
                    >
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">
                        Application Rejected: CloudSolutions Ltd.
                      </p>
                      <p className="text-muted-foreground">May 12, 2023</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Resume Tab */}
        <TabsContent value="resume" className="mt-6">
          <Card className="border-none shadow-md">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Uploaded Resumes</CardTitle>
                <Button
                  onClick={() => setResumeUploadOpen(true)}
                  style={{ backgroundColor: BLUE_COLOR }}
                >
                  <Plus className="mr-2 h-4 w-4" /> Upload New Resume
                </Button>
              </div>
              <CardDescription>
                Manage your uploaded resumes and cover letters
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 rounded-lg border hover:shadow-md transition-shadow">
                  <div className="flex items-center">
                    <div className="p-2 rounded-lg bg-muted mr-4">
                      <FileText
                        className="h-8 w-8"
                        style={{ color: BLUE_COLOR }}
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">
                        Software_Engineer_Resume.pdf
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Uploaded on May 1, 2023 • 2.4 MB
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex justify-between items-center p-4 rounded-lg border hover:shadow-md transition-shadow">
                  <div className="flex items-center">
                    <div className="p-2 rounded-lg bg-muted mr-4">
                      <FileText
                        className="h-8 w-8"
                        style={{ color: BLUE_COLOR }}
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">
                        Frontend_Developer_Resume.pdf
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Uploaded on April 15, 2023 • 1.8 MB
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex justify-between items-center p-4 rounded-lg border hover:shadow-md transition-shadow">
                  <div className="flex items-center">
                    <div className="p-2 rounded-lg bg-muted mr-4">
                      <FileText
                        className="h-8 w-8"
                        style={{ color: BLUE_COLOR }}
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">
                        Cover_Letter_Template.docx
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Uploaded on March 20, 2023 • 0.9 MB
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md mt-6">
            <CardHeader>
              <CardTitle>Resume Builder</CardTitle>
              <CardDescription>
                Create a professional resume tailored to your target job
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="p-6 rounded-lg bg-muted flex flex-col items-center text-center">
                  <FileText
                    className="h-12 w-12 mb-4"
                    style={{ color: BLUE_COLOR }}
                  />
                  <h3 className="text-lg font-medium mb-2">
                    Create a New Resume
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our AI-powered resume builder will help you create a
                    professional resume tailored to your target job.
                  </p>
                  <Button style={{ backgroundColor: BLUE_COLOR }}>
                    Start Building
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg border">
                    <h3 className="font-medium mb-2">Resume Templates</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Choose from our collection of professional resume
                      templates.
                    </p>
                    <Button variant="outline" className="w-full">
                      Browse Templates
                    </Button>
                  </div>

                  <div className="p-4 rounded-lg border">
                    <h3 className="font-medium mb-2">Resume Review</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Get expert feedback on your resume to improve your
                      chances.
                    </p>
                    <Button variant="outline" className="w-full">
                      Request Review
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md mt-6">
            <CardHeader>
              <CardTitle>Resume Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-muted">
                  <h3 className="font-medium mb-2">Tailor Your Resume</h3>
                  <p className="text-sm text-muted-foreground">
                    Customize your resume for each job application by
                    highlighting relevant skills and experiences.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-muted">
                  <h3 className="font-medium mb-2">Use Keywords</h3>
                  <p className="text-sm text-muted-foreground">
                    Include industry-specific keywords to pass through Applicant
                    Tracking Systems (ATS).
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-muted">
                  <h3 className="font-medium mb-2">Quantify Achievements</h3>
                  <p className="text-sm text-muted-foreground">
                    Use numbers and percentages to demonstrate the impact of
                    your work.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <UpdateProfile open={open} setOpen={setOpen} />
      {/* Work Experience Modal */}
      {workModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Add Work Experience</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Job Title</label>
                <input
                  onChange={handleChange}
                  name="designation"
                  type="text"
                  className="w-full border rounded p-2 text-sm"
                  placeholder="e.g. Software Engineer"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Company</label>
                <input
                  onChange={handleChange}
                  name="companyName"
                  type="text"
                  className="w-full border rounded p-2 text-sm"
                  placeholder="e.g. Tech Company Inc."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Start Date</label>
                  <input
                    onChange={handleChange}
                    name="from"
                    type="date"
                    className="w-full border rounded p-2 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">End Date</label>
                  <input
                    onChange={handleChange}
                    name="to"
                    type="date"
                    className="w-full border rounded p-2 text-sm"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <textarea
                  onChange={handleChange}
                  name="description"
                  type="text"
                  className="w-full border rounded p-2 text-sm resize-none"
                  rows={4}
                  placeholder="Describe your responsibilities and achievements..."
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setWorkModalOpen(false)}>
                Cancel
              </Button>
              <Button
                style={{ backgroundColor: BLUE_COLOR }}
                onClick={() => {
                  handleSubmit();
                  setWorkModalOpen(false);
                }}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Education Modal */}
      {educationModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Add Education</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Degree</label>
                <input
                  type="text"
                  className="w-full border rounded p-2 text-sm"
                  placeholder="e.g. Bachelor of Science"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Institution</label>
                <input
                  type="text"
                  className="w-full border rounded p-2 text-sm"
                  placeholder="e.g. University Name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Start Year</label>
                  <input
                    type="text"
                    className="w-full border rounded p-2 text-sm"
                    placeholder="e.g. 2018"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">End Year</label>
                  <input
                    type="text"
                    className="w-full border rounded p-2 text-sm"
                    placeholder="e.g. 2022"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <textarea
                  className="w-full border rounded p-2 text-sm resize-none"
                  rows={4}
                  placeholder="Additional details about your education..."
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button
                variant="outline"
                onClick={() => setEducationModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                style={{ backgroundColor: BLUE_COLOR }}
                onClick={() => setEducationModalOpen(false)}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Resume Upload Modal */}
      {resumeUploadOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Upload Resume</h3>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <FileText
                  className="h-12 w-12 mx-auto mb-4"
                  style={{ color: BLUE_COLOR }}
                />
                <p className="text-sm font-medium mb-2">
                  Drag and drop your resume here
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  Supported formats: PDF, DOCX, RTF
                </p>
                <Button variant="outline" size="sm">
                  Browse Files
                </Button>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Resume Name</label>
                <input
                  type="text"
                  className="w-full border rounded p-2 text-sm"
                  placeholder="e.g. Software_Engineer_Resume_2023"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button
                variant="outline"
                onClick={() => setResumeUploadOpen(false)}
              >
                Cancel
              </Button>
              <Button
                style={{ backgroundColor: BLUE_COLOR }}
                onClick={() => setResumeUploadOpen(false)}
              >
                Upload
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Skills Modal */}
      {skillsModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">
              Add Skill - {selectedSkillCategory}
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Skill Name</label>
                <input
                  type="text"
                  className="w-full border rounded p-2 text-sm"
                  placeholder="e.g. React, Python, Docker..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Proficiency Level</label>
                <select className="w-full border rounded p-2 text-sm">
                  <option value="">Select Level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Years of Experience
                </label>
                <input
                  type="number"
                  className="w-full border rounded p-2 text-sm"
                  placeholder="e.g. 3"
                  min="0"
                  max="20"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button
                variant="outline"
                onClick={() => setSkillsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                style={{ backgroundColor: BLUE_COLOR }}
                onClick={() => setSkillsModalOpen(false)}
              >
                Add Skill
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Certificates Modal */}
      {certificatesModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Add New Certification</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Certification Name
                </label>
                <input
                  type="text"
                  className="w-full border rounded p-2 text-sm"
                  placeholder="e.g. AWS Certified Solutions Architect"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Issuing Organization
                </label>
                <input
                  type="text"
                  className="w-full border rounded p-2 text-sm"
                  placeholder="e.g. Amazon Web Services"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Issue Date</label>
                  <input
                    type="date"
                    className="w-full border rounded p-2 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Expiry Date</label>
                  <input
                    type="date"
                    className="w-full border rounded p-2 text-sm"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Credential ID (Optional)
                </label>
                <input
                  type="text"
                  className="w-full border rounded p-2 text-sm"
                  placeholder="e.g. ABC123XYZ"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Credential URL (Optional)
                </label>
                <input
                  type="url"
                  className="w-full border rounded p-2 text-sm"
                  placeholder="https://..."
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button
                variant="outline"
                onClick={() => setCertificatesModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                style={{ backgroundColor: BLUE_COLOR }}
                onClick={() => setCertificatesModalOpen(false)}
              >
                Add Certification
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile
