import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Loader2, Eye, EyeOff, Briefcase, Code2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../../redux/authSlice";
import axiosInstance from "../../utils/axios/axiosInstance";
import { Separator } from "@/components/ui/separator";
import GoogleLogin from "./GoogleLogin";

const Login = () => {
  const { loading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("student");
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "student",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      if (!input.email || !input.password) {
        toast.warning("Please fill all the details");
        dispatch(setLoading(false));
        return;
      }
      if (input.password.length < 6) {
        toast.warning("Password should be at least 6 characters");
        dispatch(setLoading(false));
        return;
      }

      const res = await axiosInstance.post("/api/user/login", input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.status === 200) {
        toast.success(`${res.data.message}`);
        dispatch(setUser(res.data.user));
        navigate("/");
      } else {
        toast.error(`${res.data.message}`);
      }
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error("Sorry, account does not exist");
      } else if (error.response?.status === 401) {
        toast.error("Invalid Password");
      } else if (error.response?.status === 402) {
        toast.error("User Account does not exist with this role");
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4 sm:px-6 lg:py-12">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row overflow-hidden rounded-2xl shadow-2xl">
        {/* Left panel - Branding */}
        <div className="hidden lg:block lg:w-2/5 bg-gradient-to-br from-violet-600 to-indigo-700 p-8 lg:p-12 text-white relative overflow-hidden">
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

              <h2 className="text-3xl font-bold mb-6">Welcome Back!</h2>
              <p className="text-indigo-100 mb-10 text-lg">
                Login to access your account and explore opportunities tailored
                for you.
              </p>
            </div>
          </div>
        </div>

        {/* Right panel - Login form */}
        <div className="w-full lg:w-3/5 bg-white">
          <div className="h-full flex flex-col p-6 sm:p-8 lg:p-12">
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
                Login to your account
              </h2>
              <p className="text-slate-500 mt-2">
                Enter your credentials to continue
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 flex-grow">
              <div className="space-y-4">
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
                  <Label
                    htmlFor="password"
                    className="text-slate-700 font-medium"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      onChange={handleChange}
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="••••••••"
                      className="border-slate-200 focus-visible:ring-violet-500"
                    />
                    <button
                      type="button"
                      onClick={togglePassword}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-slate-700 font-medium">Login as:</Label>
                <RadioGroup
                  value={role}
                  name="role"
                  onChange={handleChange}
                  onValueChange={setRole}
                  className="grid grid-cols-1 gap-3"
                >
                  <div
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                      role === "student"
                        ? "border-violet-500 bg-violet-50"
                        : "border-slate-200"
                    }`}
                  >
                    <RadioGroupItem value="student" id="student" />
                    <Label
                      htmlFor="student"
                      className="flex items-center gap-2 cursor-pointer font-medium"
                    >
                      <Code2 className="h-5 w-5 text-violet-600" />
                      <span>Job Seeker</span>
                    </Label>
                  </div>

                  <div
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                      role === "recruiter"
                        ? "border-violet-500 bg-violet-50"
                        : "border-slate-200"
                    }`}
                  >
                    <RadioGroupItem value="recruiter" id="recruiter" />
                    <Label
                      htmlFor="recruiter"
                      className="flex items-center gap-2 cursor-pointer font-medium"
                    >
                      <Briefcase className="h-5 w-5 text-violet-600" />
                      <span>Recruiter</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="mt-auto pt-4">
                <Button
                  disabled={loading}
                  type="submit"
                  className="w-full bg-violet-600 hover:bg-violet-700 text-white font-medium py-6 rounded-lg text-base"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Logging in...</span>
                    </div>
                  ) : (
                    "Login"
                  )}
                </Button>
                 <div className="flex items-center gap-4 my-6">
                  <Separator className="flex-1" />
                  <span className="text-slate-500 text-sm">or</span>
                  <Separator className="flex-1" />
                </div>
                <GoogleLogin/>

                <p className="text-center text-slate-600 mt-6">
                  New here?{" "}
                  <Link
                    to="/signup"
                    className="text-violet-600 hover:underline font-medium"
                  >
                    Create an account
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
