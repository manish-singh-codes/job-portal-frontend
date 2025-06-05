import { useGoogleLogin } from "@react-oauth/google";
import axiosInstance from "../../utils/axios/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/authSlice";



const GoogleLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleSuccess = async (credentialResponse) => {
    const code = credentialResponse.code;
    try {
        const response = await axiosInstance.post(
          "/api/user/google/login",
            { code },
            {
                headers: {
                "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );
        if (response.status === 200) {
            dispatch(setUser(response.data.user));
            toast.success("Login successful");
            navigate("/");
        }
    } catch (error) {
      console.error("Google Login Error:", error);
      toast.error("Failed to login with Google");
      return;
        
    }
    
  }

  const handleError = (error) => {
    console.error("Google Login Error:", error)
  }

    const handleGoogleLogin = useGoogleLogin({
    onSuccess: handleSuccess,
    onError: handleError,
    flow: "auth-code",
  })

  return (
    <div>
        <Button
          type="button"
          variant="outline"
          className="w-full border-slate-200 hover:bg-slate-50 text-slate-700 font-medium py-6 rounded-lg text-base"
          onClick={handleGoogleLogin}
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="h-5 w-5 mr-2 inline-block"
          />
          <span className=" tracking-wide ">Login to JobNest with Google</span>

        </Button>
    </div>
  );
}

export default GoogleLogin