import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"; // assumes you're using shadcn toast
import { Loader2 } from "lucide-react";
import axiosInstance from "../../utils/axios/axiosInstance";
import { use } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [step,setStep] = useState(1); // Step 1: Enter email

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
      const res = await axiosInstance.post('/api/user/forgot-password', {email});
      console.log("res", res);

      if (res.status === 200) {
        toast.success("A reset link has been sent to your email.");
        setStep(2); // Move to step 2: Email sent confirmation
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to send reset link.")
    } finally {
      setLoading(false);
    }
  };

  return (
    step === 1 ? (
        <div className="min-h-screen w-full flex items-start pt-[5%] justify-center bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4 sm:px-6 lg:py-12">
      <div className="w-full h-[50%] max-w-7xl flex flex-col lg:flex-row overflow-hidden rounded-2xl shadow-2xl">
        {/* Left Panel */}
        <div className="hidden lg:block lg:w-2/5 bg-gradient-to-br from-violet-600 to-indigo-700 p-8 lg:p-12 text-white">
          <div className="flex flex-col h-full justify-center">
            <h1 className="text-3xl font-bold mb-4">JobNest</h1>
            <h2 className="text-2xl font-semibold mb-2">Forgot your password?</h2>
            <p className="text-indigo-100 text-lg">
              Enter your registered email to receive a reset link.
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
    </div>) : (
        <div className="flex items-start pt-[5%] justify-center h-screen">
  <div className="p-4 rounded shadow-lg ring ring-indigo-600/50">
    <div className="flex flex-col items-center space-y-2">
      <svg xmlns="http://www.w3.org/2000/svg" className="text-green-600 w-28 h-28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h1 className="text-4xl font-bold">Thank You !</h1>
      <p>Thank you for your interest! A reset link has been sent to your email.</p>
      <Link
        className="inline-flex items-center px-4 py-2 text-white bg-indigo-600 border border-indigo-600 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring"
        to={"/"}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
        </svg>
        <span className="text-sm font-medium">
          Home
        </span>
      </Link>
    </div>
  </div>
</div>

    )
  );
};

export default ForgotPassword;
