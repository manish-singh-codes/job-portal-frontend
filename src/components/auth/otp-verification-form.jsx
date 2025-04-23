"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, CheckCircle2 } from "lucide-react";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axios/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";

const OTPVerificationForm = ({ email, onBack, onSuccess }) => {
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(300);
  const [isVerified, setIsVerified] = useState(false);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const verifyOtp = async () => {
    try {
      dispatch(setLoading(true));
      const res = await axiosInstance.post("api/user/verify", {
        email,
        otp,
      });

      if (res.status === 200) {
        setIsVerified(true);
        toast.success("OTP verified successfully");
        setTimeout(() => {
          onSuccess();
        }, 1500);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error(error.response.data.message);
      } else {
        toast.error("OTP Expired");
      }
    } finally {
      dispatch(setLoading(false));
    }
  };



  const handleResendSuccess = async() => {
    setTimeLeft(300);
    const res = await axiosInstance.post('/api/user/resend', {email});

    if(res.status === 200){
      toast.success('OTP Sent Successfully');
    toast.success("OTP has been resent to your email.");
    }
  };

  const REGEXP_ONLY_DIGITS = /^[0-9]+$/;

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-white shadow-lg rounded-xl">
      {isVerified ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 className="h-10 w-10 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">You're Verified!</h2>
          <p className="text-gray-600">Welcome to <span className="font-bold text-violet-600">JobNest</span> — your tech career starts here.</p>
        </div>
      ) : (
        <>
          <div className="mb-6 flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 rounded-full hover:bg-gray-100 transition"
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Email Verification
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Enter the 6-digit code sent to <span className="font-medium">{email}</span>
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <Label
                htmlFor="otp-input-0"
                className="text-gray-700 font-medium block mb-2"
              >
                Verification Code
              </Label>
              <div className="flex gap-2 justify-center">
                <InputOTP
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS}
                  value={otp}
                  onChange={(value) => setOtp(value)}
                  className="gap-2"
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600">
              <div>
                Time Remaining: <span className="font-semibold">{formatTime(timeLeft)}</span>
              </div>
              <Button
                variant="link"
                disabled={timeLeft > 0}
                onClick={handleResendSuccess}
                className="text-violet-600 hover:text-violet-700 p-0 h-auto font-semibold"
              >
                Resend OTP
              </Button>
            </div>

            <Button
              onClick={verifyOtp}
              disabled={otp.length < 6 || loading}
              className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-4 rounded-lg text-lg transition"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Verifying...
                </div>
              ) : (
                "Verify"
              )}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default OTPVerificationForm;
