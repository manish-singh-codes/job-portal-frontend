import  { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Upload } from "lucide-react";
import { User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import axiosInstance from "../../utils/axios/axiosInstance";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const SignUp = () => {
  const [role, setRole] = useState("student");
  const [profilePic, setProfilePic] = useState(null);
  const navigate  = useNavigate();
  const [go,setGo] = useState(false);
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "student",
    file: "",
  });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePic(e.target?.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
    setInput({
      ...input,
      file: e.target.files?.[0],
    });
  };
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("input",input)
    if(!input.fullname&& !input.email && !input.password && !input.phoneNumber && !input.file){
      toast.warning("Please fill all the details")
      return;
    }
    if(!input.fullname){
      toast.warning("Please provide Username")
      return;
    }
    if(!input.email){
      toast.warning("Please provide Email")
      return;
    }
    if(!input.password){
      toast.warning("Please provide Password")
      return;
    }
    if(input.password.length<6){
      toast.warning("Password should be atleast 6 characters")
      return;
    }
    if(!input.phoneNumber){
      toast.warning("Please provide Phone Number")
      return;
    }
    if(input.phoneNumber.length !== 10){
      toast.warning("Phone Number should be 10 digits")
      return;
    }
    if(!input.file){
      toast.warning("Please provide Profile Picture")
      return;
    }
    const formData = new FormData();
    formData.append("fullname",input.fullname);
    formData.append("email",input.email);
    formData.append("password",input.password);
    formData.append("phoneNumber",input.phoneNumber);
    formData.append("role",input.role);
    formData.append("file",input.file);

    try {
      const res = await axiosInstance.post("api/user/register", formData,{
        headers: {
          "Content-Type": "multipart/form-data",
        }
        
      })
     console.log("res",res)
      if(res.status ===200){
        toast.success("User Created Successfully");
        navigate("/")
      }
    } catch (error) {
      console.log("error",error)
       if(error.response.status === 401){
         toast.error("User already exist with the same email")
       }
    }

  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-red-200 to-green-200 flex justify-center items-start p-4">
    <ToastContainer
      position="bottom-right"
      autoClose={2000}
    />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-xl"
      >
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="relative w-7 h-6">
            {/* Blue circle on top */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-[#0000FF] opacity-80 z-30"></div>

            {/* Red circle on bottom left */}
            <div className="absolute bottom-0 left-0 w-4 h-4 rounded-full bg-[#FF0000] opacity-80 z-20"></div>

            {/* Green circle on bottom right */}
            <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-[#00FF00] opacity-80 z-10"></div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">
            Get started with <span className="text-[#FF0000]">JobNest</span>
          </h1>
        </div>

        <div className="grid gap-4">
          <div>
            <Label className="text-gray-700">Full Name</Label>
            <Input
              onChange={handleChange}
              type="text"
              name="fullname"
              onInvalid={(e) =>
                e.target.setCustomValidity("Please enter your full name")
              }
              placeholder="eg: john_doe"
              className="mt-1 border-gray-200 focus:ring-2 focus:ring-green-100 focus:border-green-400 focus:ring-opacity-50 "
            />
          </div>

          <div>
            <Label className="text-gray-700">Email</Label>
            <Input
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="eg: john@gmail.com"
              className="mt-1 border-gray-200 focus:ring-2 focus:ring-green-100 focus:border-green-400"
            />
          </div>

          <div>
            <Label className="text-gray-700">Phone Number</Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <img 
                  src="https://flagcdn.com/w20/in.png" 
                  alt="Indian flag"
                  className="w-5 h-auto"
                />
                <span className="text-gray-500">+91</span>
              </div>
              <Input
                onChange={handleChange}
                type="tel"
                name="phoneNumber"
                placeholder="123-456-7890"
                className="pl-24 mt-1 border-gray-200 focus:ring-2 focus:ring-green-100 focus:border-green-400"
              />
            </div>
          </div>

          <div>
            <Label className="text-gray-700">Password</Label>
            <Input
              onChange={handleChange}
              name="password"
              type="password"
              placeholder="Enter your password"
              className="mt-1 border-gray-200 focus:ring-2 focus:ring-green-100 focus:border-green-400"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mt-6">
          <div className="flex-1">
            <Label className="text-gray-700">Profile Picture</Label>
            <div className="flex items-center space-x-4 mt-2">
              <Avatar className="w-16 h-16 border-2 border-gray-200">
                <AvatarImage src={profilePic || ""} alt="Profile picture" />
                <AvatarFallback>
                  <User className="w-8 h-8 text-gray-400" />
                </AvatarFallback>
              </Avatar>
              <div className="relative">
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
                  className="border-gray-200 hover:bg-gray-50"
                >
                  <Upload className="mr-2 h-4 w-4" /> Upload
                </Button>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <Label className="text-gray-700">Create account as:</Label>
            <RadioGroup
              value={role}
              name="role"
              onChange={handleChange}
              onValueChange={setRole}
              className="flex space-x-4 mt-5"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="student" id="student" />
                <Label htmlFor="student" className="text-gray-600">
                  Job Seeker
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="recruiter" id="recruiter" />
                <Label htmlFor="recruiter" className="text-gray-600">
                  Recruiter
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <div className="flex items-center justify-center space-x-2 mt-6 bg-blue- text-center">
          <Checkbox onCheckedChange={() => setGo(!go)} id="terms" />
          <Label htmlFor="terms">Accept terms and conditions</Label>
        </div>

        <Button
        disabled={!go}
          type="submit"
          className="w-full mt-6 bg-[#00CC00] hover:bg-[#35b435] text-white font-medium py-2.5"
        >
          Sign Up
        </Button>

        <div className="mt-6 text-center">
          <span className="text-gray-600">
            Already part of JobNest?{" "}
            <Link
              to="/login"
              className="text-[#0000FF] hover:underline font-medium"
            >
              Login
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default SignUp;