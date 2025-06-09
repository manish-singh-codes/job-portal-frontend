import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import axiosInstance from "@/utils/axios/axiosInstance";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
    const params = useParams();
  const { resetToken } = params // assuming token is in URL
  
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.newPassword || !formData.confirmPassword) {
      toast.warning("Please fill in both fields");
      return;
    }

    if (formData.newPassword.length < 6) {
      toast.warning("Password must be at least 6 characters");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await axiosInstance.post(
        `/api/user/reset-password/${resetToken}`,
          formData
        ,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        toast.success("Password reset successful!");
        navigate("/login");
      } else {
        toast.error("Failed to reset password");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start pt-[5%] bg-slate-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-slate-800">
          Reset Your Password
        </h2>

        <div className="mb-4">
          <Label htmlFor="newPassword" className="text-slate-700">
            New Password
          </Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              name="newPassword"
              id="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
              className="pr-10"
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-slate-500"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </span>
          </div>
        </div>

        <div className="mb-6">
          <Label htmlFor="confirmPassword" className="text-slate-700">
            Confirm Password
          </Label>
          <Input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm new password"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-violet-600 hover:bg-violet-700 text-white font-medium"
        >
          Reset Password
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;
