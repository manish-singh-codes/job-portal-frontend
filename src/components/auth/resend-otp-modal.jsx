"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Loader2, X } from "lucide-react"
import { toast } from "react-toastify"
import axiosInstance from "../../utils/axios/axiosInstance"
import { useDispatch, useSelector } from "react-redux"
import { setLoading } from "../../redux/authSlice"

export const ResendOTPModal = ({ isOpen, onClose, onSuccess }) => {
  const { loading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [email, setEmail] = useState("")
  const [step, setStep] = useState(1) // 1: Email form, 2: OTP form
  const [otp, setOtp] = useState(["", "", "", "", "", ""])

  if (!isOpen) return null

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value

    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`resend-otp-input-${index + 1}`)
      if (nextInput) nextInput.focus()
    }
  }

  // Handle key down for backspace
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`resend-otp-input-${index - 1}`)
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
      document.getElementById(`resend-otp-input-${nextEmptyIndex}`).focus()
    } else if (digits.length < 6) {
      document.getElementById(`resend-otp-input-${digits.length}`).focus()
    } else {
      document.getElementById(`resend-otp-input-5`).focus()
    }
  }

  // Request new OTP
  const requestOtp = async (e) => {
    e.preventDefault()

    if (!email) {
      toast.warning("Please enter your email address")
      return
    }

    try {
      dispatch(setLoading(true))
      // Replace with your actual API endpoint
      const res = await axiosInstance.post("api/user/resend-otp", {
        email,
      })

      if (res.status === 200) {
        toast.success("OTP has been sent to your email")
        setStep(2)
      }
    } catch (error) {
      if (error.response?.status === 404) {
        toast.error("Email not found. Please check your email address.")
      } else {
        toast.error("Something went wrong. Please try again.")
      }
    } finally {
      dispatch(setLoading(false))
    }
  }

  // Verify OTP
  const verifyOtp = async (e) => {
    e.preventDefault()

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
        toast.success("OTP verified successfully")
        onSuccess()
        // Reset state for next time
        setEmail("")
        setOtp(["", "", "", "", "", ""])
        setStep(1)
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-slate-800">
            {step === 1 ? "Resend Verification Code" : "Verify OTP"}
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5 text-slate-500" />
          </button>
        </div>

        <div className="p-6">
          {step === 1 ? (
            <form onSubmit={requestOtp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700 font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="border-slate-200 focus-visible:ring-violet-500"
                  required
                />
                <p className="text-sm text-slate-500">We'll send a verification code to this email address</p>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-violet-600 hover:bg-violet-700 text-white font-medium py-5 rounded-lg text-base"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Sending...</span>
                  </div>
                ) : (
                  "Send Verification Code"
                )}
              </Button>
            </form>
          ) : (
            <form onSubmit={verifyOtp} className="space-y-4">
              <div>
                <Label htmlFor="resend-otp-input-0" className="text-slate-700 font-medium block mb-3">
                  Enter verification code
                </Label>
                <div className="flex gap-2 justify-between">
                  {otp.map((digit, index) => (
                    <Input
                      key={index}
                      id={`resend-otp-input-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={index === 0 ? handlePaste : undefined}
                      className="w-10 h-10 text-center text-lg font-semibold border-slate-200 focus-visible:ring-violet-500"
                    />
                  ))}
                </div>
                <p className="text-sm text-slate-500 mt-2">
                  We've sent a 6-digit code to <span className="font-medium">{email}</span>
                </p>
              </div>

              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="border-slate-200 hover:bg-slate-50 text-slate-700"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={otp.some((digit) => digit === "") || loading}
                  className="bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-lg"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Verifying...</span>
                    </div>
                  ) : (
                    "Verify"
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
