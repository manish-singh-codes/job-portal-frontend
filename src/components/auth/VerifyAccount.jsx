import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"; // assumes you're using shadcn toast
import { Loader2 } from "lucide-react";
import axiosInstance from "../../utils/axios/axiosInstance";
import { use } from "react";
import { Link, useNavigate } from "react-router-dom";
import OTPVerificationForm from "./otp-verification-form";

const VerifyAccount = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [step,setStep] = useState(1); // Step 1: Enter email
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
        toast.warning("Please enter your email address.");
        return;
    }

    setLoading(true);
    try {
      const res = await axiosInstance.post('/api/user/verify-account', {email});
      console.log("res", res);

      if (res.status === 200) {
        toast.success("A reset link has been sent to your email.");
        setStep(2); // Move to step 2: Email sent confirmation
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send verification link.");
    } finally {
      setLoading(false);
    }
  };
const handleOtpSuccess = () => {
    // Navigate to login page after successful verification
    setTimeout(() => {
      navigate("/login")
    }, 1500)
  }


  return step === 1 ? (
    <div className="min-h-screen w-full flex items-start pt-[5%] justify-center bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4 sm:px-6 lg:py-12">
      <div className="w-full h-[50%] max-w-4xl flex flex-col lg:flex-row overflow-hidden rounded-2xl shadow-2xl">
        {/* Left Panel */}
        <div className="hidden lg:block lg:w-2/5 bg-gradient-to-br from-violet-600 to-indigo-700 p-8 lg:p-12 text-white">
          <div className="flex flex-col h-full justify-center gap-5">
             <div className="flex items-center gap-3 mb-12">
                <div className="relative w-10 h-10">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-cyan-400 opacity-90 z-30"></div>
                  <div className="absolute bottom-0 left-0 w-5 h-5 rounded-full bg-violet-400 opacity-90 z-20"></div>
                  <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-indigo-300 opacity-90 z-10"></div>
                </div>
                <h1 className="text-3xl font-bold">JobNest</h1>
              </div>
            <h2 className="text-2xl font-semibold mb-2">
              Verify your account ?
            </h2>
            <p className="text-indigo-100 text-lg">
              Enter your registered email to verify your account.
            </p>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full lg:w-3/5 bg-white flex flex-col justify-center p-6 sm:p-8 lg:p-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-6">
            Reset Password
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700 font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={email}
                onChange={handleChange}
                className="border-slate-200 focus-visible:ring-violet-500"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-violet-600 hover:bg-violet-700 text-white py-6 rounded-lg"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Sending link...</span>
                </div>
              ) : (
                "Send Reset Link"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-screen w-full flex items-start justify-center bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4 sm:px-6 lg:py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <OTPVerificationForm
          email={email}
          onBack={() => setStep(1)}
          onSuccess={handleOtpSuccess}
        />
      </div>
    </div>
  );
};

export default VerifyAccount;
