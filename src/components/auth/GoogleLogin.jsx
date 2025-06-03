import { GoogleLogin } from "@react-oauth/google";
import axiosInstance from "../../utils/axios/axiosInstance";
import {  useState } from "react";
import { Users, Briefcase, X } from "lucide-react"
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";



const Google = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false)
  const [selectedRole, setSelectedRole] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState({
    role: "",
    id_token: ""
  })

  const handleSuccess = async (credentialResponse) => {
    const id_token = credentialResponse.credential
    console.log("ID Token:", id_token)
    setSuccess(true)
    setFormData({
      ...formData,
      id_token: id_token
    })
  }

  const handleError = (error) => {
    console.error("Google Login Error:", error)
  }

  const handleRoleSelection = (role) => {
    setSelectedRole(role)
    setFormData({
      ...formData,
      role: role
    })
  }

  const handleCreateAccount = async () => {
    if (!selectedRole) {
      alert("Please select your account type")
      return
    }

    setIsCreating(true)

    // Simulate API call

    try {
      const response = await axiosInstance.post('/api/user/google/register', formData);

      if(response.status == 200) {
          toast.success("Account created successfully")
          navigate("/login")
      }

      // Reset states after successful creation
      setSuccess(false)
      setSelectedRole("")
      setIsCreating(false)
    } catch (error) {
      console.error("Error creating account:", error)
      setIsCreating(false)
    }
  }

  const closeModal = () => {
    setSuccess(false)
    setSelectedRole("")
  }

    // const handleGoogleLogin = useGoogleLogin({
    //     onSuccess: async credentialResponse => {
    //         const {id_token} = credentialResponse.access_token;
    //         console.log("ID Token:", id_token);
    //         // try {
    //         //     const response = await axiosInstance.post('/api/user/google/register', {
    //         //         id_token
    //         //     });
    //         //     console.log("response", response);
    //         // } catch (error) {
    //         //     console.error("Error during Google login:", error);
    //         // }
    //     },
    //     onError: (error) => {
    //         console.error("Google Login Error:", error);
    //     },
    //     flow: "implicit"
    // });

  return (
    <div>
           {/* <Button
                  type="button"
                  variant="outline"
                  className="w-full border-slate-200 hover:bg-slate-50 text-slate-700 font-medium py-6 rounded-lg text-base"
                  onClick={handleGoogleLogin}
                >
                  <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google"
                    className="h-5 w-5 mr-2 inline-block"/>
                  Continue with Google
                </Button>  */}
        {success ? (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl transform transition-all">
            {/* Header */}
            <div className="relative p-6 border-b border-gray-100">
              <button
                onClick={closeModal}
                className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Path</h2>
                <p className="text-gray-600 text-sm">Select how you would like to use our platform</p>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="space-y-4 mb-6">
                {/* Recruiter Option */}
                <label
                  className={`relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all hover:bg-gray-50 ${
                    selectedRole === "recruiter" ? "border-blue-500 bg-blue-50" : "border-gray-200"
                  }`}
                  onClick={() => handleRoleSelection("recruiter")}
                >
                  <input
                    type="radio"
                    name="accountType"
                    value="recruiter"
                    checked={selectedRole === "recruiter"}
                    onChange={() => handleRoleSelection("recruiter")}
                    className="sr-only"
                  />
                  <div className="flex items-center w-full">
                    <div
                      className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
                        selectedRole === "recruiter" ? "border-blue-500 bg-blue-500" : "border-gray-300"
                      }`}
                    >
                      {selectedRole === "recruiter" && <div className="w-2 h-2 bg-white rounded-full"></div>}
                    </div>
                    <div className="flex items-center flex-1">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
                          selectedRole === "recruiter" ? "bg-blue-100" : "bg-gray-100"
                        }`}
                      >
                        <Briefcase
                          className={`h-5 w-5 ${selectedRole === "recruiter" ? "text-blue-600" : "text-gray-600"}`}
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Recruiter</div>
                        <div className="text-sm text-gray-500">Post jobs and find talent</div>
                      </div>
                    </div>
                  </div>
                </label>

                {/* Job Seeker Option */}
                <label
                  className={`relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all hover:bg-gray-50 ${
                    selectedRole === "student" ? "border-blue-500 bg-blue-50" : "border-gray-200"
                  }`}
                  onClick={() => handleRoleSelection("student")}
                >
                  <input
                    type="radio"
                    name="accountType"
                    value="student"
                    checked={selectedRole === "student"}
                    onChange={() => handleRoleSelection("student")}
                    className="sr-only"
                  />
                  <div className="flex items-center w-full">
                    <div
                      className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
                        selectedRole === "student" ? "border-blue-500 bg-blue-500" : "border-gray-300"
                      }`}
                    >
                      {selectedRole === "student" && <div className="w-2 h-2 bg-white rounded-full"></div>}
                    </div>
                    <div className="flex items-center flex-1">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
                          selectedRole === "student" ? "bg-blue-100" : "bg-gray-100"
                        }`}
                      >
                        <Users
                          className={`h-5 w-5 ${selectedRole === "student" ? "text-blue-600" : "text-gray-600"}`}
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Job Seeker</div>
                        <div className="text-sm text-gray-500">Find your dream job</div>
                      </div>
                    </div>
                  </div>
                </label>
              </div>

              {/* Create Account Button */}
              <button
                onClick={handleCreateAccount}
                disabled={!selectedRole || isCreating}
                className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all ${
                  selectedRole && !isCreating
                    ? "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                {isCreating ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Creating Account...
                  </div>
                ) : (
                  "Create Account"
                )}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                By creating an account, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
) : (
  <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
)}    
    </div>

  )
}

export default Google