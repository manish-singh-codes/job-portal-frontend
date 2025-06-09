"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Loader2, Upload, User, CheckCircle2, Code2, Briefcase, LucideCode } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import axiosInstance from "../../utils/axios/axiosInstance.js"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useDispatch, useSelector } from "react-redux"
import { setLoading } from "../../redux/authSlice.js"
import OTPVerificationForm from "./otp-verification-form.jsx"
import GoogleRegister from "./GoogleRegister.jsx"

const SignUp = () => {
  const { loading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [role, setRole] = useState("student")
  const [profilePic, setProfilePic] = useState(null)
  const navigate = useNavigate()
  const [go, setGo] = useState(false)
  const [showOtpVerification, setShowOtpVerification] = useState(false)
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "student",
    file: "",
  })

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfilePic(e.target?.result)
      }
      reader.readAsDataURL(e.target.files[0])
    }
    setInput({
      ...input,
      file: e.target.files?.[0],
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!input.fullname && !input.email && !input.password && !input.phoneNumber && !input.file) {
      toast.warning("Please fill all the details")
      return
    }
    if (!input.fullname) {
      toast.warning("Please provide Username")
      return
    }
    if (!input.email) {
      toast.warning("Please provide Email")
      return
    }
    if (!input.password) {
      toast.warning("Please provide Password")
      return
    }
    if (input.password.length < 6) {
      toast.warning("Password should be at least 6 characters")
      return
    }
    if (!input.phoneNumber) {
      toast.warning("Please provide Phone Number")
      return
    }
    if (input.phoneNumber.length !== 10) {
      toast.warning("Phone Number should be 10 digits")
      return
    }
    if (!input.file) {
      toast.warning("Please provide Profile Picture")
      return
    }

    const formData = new FormData()
    formData.append("fullname", input.fullname)
    formData.append("email", input.email)
    formData.append("password", input.password)
    formData.append("phoneNumber", input.phoneNumber)
    formData.append("role", input.role)
    formData.append("file", input.file)

    try {
      dispatch(setLoading(true))
      // Modified to request OTP instead of directly creating account
      const res = await axiosInstance.post("api/user/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      if (res.status === 200) {
        toast.success("OTP sent to your email")
        setShowOtpVerification(true)
        setGo(false)
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("User already exists with the same email")
      } else {
        toast.error("Something went wrong. Please try again.")
      }
    } finally {
      dispatch(setLoading(false))
    }
  }

  const handleOtpSuccess = () => {
    // Navigate to login page after successful verification
    setTimeout(() => {
      navigate("/login")
    }, 1500)
  }

  if (showOtpVerification) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4 sm:px-6 lg:py-12">
        <ToastContainer position="bottom-right" autoClose={2000} />
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          <OTPVerificationForm
            email={input.email}
            onBack={() => setShowOtpVerification(false)}
            onSuccess={handleOtpSuccess}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4 sm:px-6 lg:py-12">
      <ToastContainer position="bottom-right" autoClose={2000} />

      <div className="w-full max-w-7xl flex flex-col lg:flex-row overflow-hidden rounded-2xl shadow-2xl">
        {/* Left panel - Tech-focused branding */}
        <div className="hidden lg:block lg:w-2/5 bg-gradient-to-br from-violet-600 to-indigo-700 p-8 lg:p-12 text-white relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-40 h-40 rounded-full border border-indigo-300"></div>
            <div className="absolute bottom-40 right-10 w-60 h-60 rounded-full border border-indigo-300"></div>
            <div className="absolute top-1/2 left-1/3 w-20 h-20 rounded-full border border-indigo-300"></div>
            <div className="absolute -bottom-10 -left-10 w-80 h-80 rounded-full border border-indigo-300"></div>
            <div className="absolute top-1/4 right-1/4 w-10 h-10 rounded-full border border-indigo-300"></div>
          </div>

          <div className="relative z-10 h-full flex flex-col">
            <div>
              <div className="flex items-center gap-3 mb-12">
                <div className="relative w-10 h-10">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-cyan-400 opacity-90 z-30"></div>
                  <div className="absolute bottom-0 left-0 w-5 h-5 rounded-full bg-violet-400 opacity-90 z-20"></div>
                  <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-indigo-300 opacity-90 z-10"></div>
                </div>
                <h1 className="text-3xl font-bold">JobNest</h1>
              </div>

              <h2 className="text-3xl font-bold mb-6">Launch Your Tech Career</h2>
              <p className="text-indigo-100 mb-10 text-lg">
                Join thousands of tech professionals finding their dream roles in software development, data science,
                cybersecurity, and more.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="h-6 w-6 text-cyan-300 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg">Access Top Tech Companies</h3>
                    <p className="text-indigo-200">Connect with industry leaders and innovative startups</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle2 className="h-6 w-6 text-cyan-300 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg">Skill-Based Matching</h3>
                    <p className="text-indigo-200">Our AI matches your skills to the perfect tech role</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle2 className="h-6 w-6 text-cyan-300 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg">Career Growth Resources</h3>
                    <p className="text-indigo-200">Access tech interview prep and skill development tools</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-8 border-t border-indigo-500/30">
              <p className="text-indigo-200 text-lg italic">
                {"JobNest helped me land my dream role at a leading tech company within weeks of signing up."}
              </p>
              <p className="font-medium mt-3">— Sarah Chen, Senior Developer</p>
            </div>
          </div>
        </div>

        {/* Mobile branding header - only visible on small screens */}
        <div className="lg:hidden bg-gradient-to-r from-violet-600 to-indigo-700 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-cyan-400 opacity-90 z-30"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 rounded-full bg-violet-400 opacity-90 z-20"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-indigo-300 opacity-90 z-10"></div>
              </div>
              <h1 className="text-2xl font-bold">JobNest</h1>
            </div>
            <LucideCode className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-bold mt-4">Launch Your Tech Career</h2>
          <p className="text-indigo-100 text-sm mt-1">Join thousands of tech professionals finding their dream roles</p>
        </div>

        {/* Right panel - Sign up form */}
        <div className="w-full lg:w-3/5 bg-white">
          <div className="h-full flex flex-col p-6 sm:p-8 lg:p-12">
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">Create your account</h2>
              <p className="text-slate-500 mt-2">Join JobNest to discover opportunities in the tech industry</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 flex-grow">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullname" className="text-slate-700 font-medium">
                    Full Name
                  </Label>
                  <Input
                    id="fullname"
                    onChange={handleChange}
                    type="text"
                    name="fullname"
                    placeholder="John Doe"
                    className="border-slate-200 focus-visible:ring-violet-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-700 font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    onChange={handleChange}
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    className="border-slate-200 focus-visible:ring-violet-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className="text-slate-700 font-medium">
                    Phone Number
                  </Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                      <img src="https://flagcdn.com/w20/in.png" alt="Indian flag" className="w-5 h-auto" />
                      <span className="text-slate-500">+91</span>
                      <Separator orientation="vertical" className="h-5" />
                    </div>
                    <Input
                      id="phoneNumber"
                      onChange={handleChange}
                      type="tel"
                      name="phoneNumber"
                      placeholder="9876543210"
                      className="pl-24 border-slate-200 focus-visible:ring-violet-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-slate-700 font-medium">
                    Password <span className="text-xs text-slate-500">(min. 6 characters)</span>
                  </Label>
                  <Input
                    id="password"
                    onChange={handleChange}
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className="border-slate-200 focus-visible:ring-violet-500"
                  />
                </div>
              </div>

              <Separator className="my-2" />

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-slate-700 font-medium">Profile Picture</Label>
                  <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16 border-2 border-slate-100 shadow-sm">
                      <AvatarImage src={profilePic || ""} alt="Profile picture" />
                      <AvatarFallback className="bg-violet-100 text-violet-700">
                        <User className="w-8 h-8" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <input
                        onChange={handleFileChange}
                        id="profilePic"
                        type="file"
                        name="file"
                        accept="image/*"
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById("profilePic")?.click()}
                        className="border-slate-200 hover:bg-slate-50 text-slate-700"
                      >
                        <Upload className="mr-2 h-4 w-4" /> Upload Photo
                      </Button>
                      <p className="text-xs text-slate-500 mt-1">JPG, PNG or GIF, max 2MB</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-slate-700 font-medium">I am a:</Label>
                  <RadioGroup
                    value={role}
                    name="role"
                    onChange={handleChange}
                    onValueChange={setRole}
                    className="grid grid-cols-1 gap-3"
                  >
                    <div
                      className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${role === "student" ? "border-violet-500 bg-violet-50" : "border-slate-200"}`}
                    >
                      <RadioGroupItem value="student" id="student" className="text-violet-600" />
                      <Label htmlFor="student" className="flex items-center gap-2 cursor-pointer font-medium">
                        <Code2 className="h-5 w-5 text-violet-600" />
                        <span>Job Seeker</span>
                      </Label>
                    </div>

                    <div
                      className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${role === "recruiter" ? "border-violet-500 bg-violet-50" : "border-slate-200"}`}
                    >
                      <RadioGroupItem value="recruiter" id="recruiter" className="text-violet-600" />
                      <Label htmlFor="recruiter" className="flex items-center gap-2 cursor-pointer font-medium">
                        <Briefcase className="h-5 w-5 text-violet-600" />
                        <span>Recruiter</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <Checkbox
                  id="terms"
                  onCheckedChange={() => setGo(!go)}
                  className="text-violet-600 border-slate-300 data-[state=checked]:bg-violet-600"
                />
                <Label htmlFor="terms" className="text-sm text-slate-600">
                  {" I agree to JobNest's "}
                  <Link to="/terms" className="text-violet-600 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-violet-600 hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <div className="mt-auto pt-4">
                <Button
                  disabled={!go || loading}
                  type="submit"
                  className="w-full bg-violet-600 hover:bg-violet-700 text-white font-medium py-6 rounded-lg text-base"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Creating account...</span>
                    </div>
                  ) : (
                    "Create Account"
                  )}
                </Button>

                <div className="flex items-center gap-4 my-6">
                  <Separator className="flex-1" />
                  <span className="text-slate-500 text-sm">or</span>
                  <Separator className="flex-1" />
                </div>
                <GoogleRegister/>
                <p className="text-center text-slate-600 mt-6">
                  Already have an account?{" "}
                  <Link to="/login" className="text-violet-600 hover:underline font-medium">
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
