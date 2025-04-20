"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Loader2, ArrowLeft, CheckCircle2 } from "lucide-react"
import { toast } from "react-toastify"
import axiosInstance from "../../utils/axios/axiosInstance"
import { useDispatch, useSelector } from "react-redux"
import { setLoading } from "../../redux/authSlice"
import { ResendOTPModal } from "./resend-otp-modal"

const OTPVerificationForm = ({ email, onBack, onSuccess }) => {
  const { loading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds
  const [isResendModalOpen, setIsResendModalOpen] = useState(false)
  const [isVerified, setIsVerified] = useState(false)

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Handle countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value

    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`)
      if (nextInput) nextInput.focus()
    }
  }

  // Handle key down for backspace
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`)
      if (prevInput) prevInput.focus()
    }
  }

  // Handle paste functionality
  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text")
    if (!/^\d+$/.test(pastedData)) return

    const digits = pastedData.slice(0, 6).split("")
    const newOtp = [...otp]

    digits.forEach((digit, index) => {
      if (index < 6) newOtp[index] = digit
    })

    setOtp(newOtp)

    // Focus the next empty input or the last input
    const nextEmptyIndex = newOtp.findIndex((val) => val === "")
    if (nextEmptyIndex !== -1 && nextEmptyIndex < 6) {
      document.getElementById(`otp-input-${nextEmptyIndex}`).focus()
    } else if (digits.length < 6) {
      document.getElementById(`otp-input-${digits.length}`).focus()
    } else {
      document.getElementById(`otp-input-5`).focus()
    }
  }

  // Verify OTP
  const verifyOtp = async () => {
    const otpValue = otp.join("")

    if (otpValue.length !== 6) {
      toast.warning("Please enter the complete 6-digit OTP")
      return
    }

    try {
      dispatch(setLoading(true))
      // Replace with your actual API endpoint
      const res = await axiosInstance.post("api/user/verify-otp", {
        email,
        otp: otpValue,
      })

      if (res.status === 200) {
        setIsVerified(true)
        toast.success("OTP verified successfully")
        // Wait for animation to complete before redirecting
        setTimeout(() => {
          onSuccess()
        }, 1500)
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Invalid OTP. Please try again.")
      } else {
        toast.error("Something went wrong. Please try again.")
      }
    } finally {
      dispatch(setLoading(false))
    }
  }

  // Reset timer and close modal
  const handleResendSuccess = () => {
    setTimeLeft(300) // Reset to 5 minutes
    setIsResendModalOpen(false)
    toast.success("OTP has been resent to your email")
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {isVerified ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Verification Successful</h2>
          <p className="text-slate-600">Your account has been verified successfully.</p>
        </div>
      ) : (
        <>
          <div className="mb-6 flex items-center">
            <button
              onClick={onBack}
              className="p-2 rounded-full hover:bg-slate-100 transition-colors mr-2"
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5 text-slate-600" />
            </button>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Verify your email</h2>
              <p className="text-slate-500 mt-1">
                We have sent a 6-digit code to <span className="font-medium">{email}</span>
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <Label htmlFor="otp-input-0" className="text-slate-700 font-medium block mb-3">
                Enter verification code
              </Label>
              <div className="flex gap-2 justify-between">
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    id={`otp-input-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    className="w-12 h-12 text-center text-lg font-semibold border-slate-200 focus-visible:ring-violet-500"
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-600">
                Time remaining: <span className="font-semibold">{formatTime(timeLeft)}</span>
              </div>
              <Button
                type="button"
                variant="link"
                disabled={timeLeft > 0}
                onClick={() => setIsResendModalOpen(true)}
                className="text-violet-600 hover:text-violet-700 p-0 h-auto font-medium"
              >
                Resend OTP
              </Button>
            </div>

            <Button
              onClick={verifyOtp}
              disabled={otp.some((digit) => digit === "") || loading}
              className="w-full bg-violet-600 hover:bg-violet-700 text-white font-medium py-6 rounded-lg text-base"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Verifying...</span>
                </div>
              ) : (
                "Verify OTP"
              )}
            </Button>
          </div>
        </>
      )}

      <ResendOTPModal
        isOpen={isResendModalOpen}
        onClose={() => setIsResendModalOpen(false)}
        onSuccess={handleResendSuccess}
      />
    </div>
  )
}

export default OTPVerificationForm
